import * as oldForms from 'data/forms';
import {
  AllocationCaseFormData,
  Case,
  DeallocationCaseFormData,
  WarningNoteCaseFormData,
} from 'types';

export const getProtocol = (): string =>
  process.env.NODE_ENV === 'production' ? 'https' : 'http';

/** utility to convert a query string object back into a string, to assist in generating links */
export const getQueryString = (obj: Record<string, unknown>): string =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value
        ? acc.length > 0
          ? `${acc}&${key}=${value}`
          : `${key}=${value}`
        : acc,
    ''
  );

/** convert a url query string into an object */
export const parseQueryString = (str: string): Record<string, unknown> =>
  str?.split('&')?.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    return { ...acc, [key]: value };
  }, {}) || {};

const getWarningNoteDetailsPageName = (form_name: string) => {
  switch (form_name) {
    case 'Warning Note Created':
      return 'note-created';
    case 'Warning Note Reviewed':
      return 'note-reviews';
    case 'Warning Note Ended':
      return 'note-end';
    default:
      return null;
  }
};

/** generate the correct link for older form wizard-style records */
export const generateInternalLink = ({
  recordId,
  caseFormData: { form_name_overall, ...caseFormData },
}: Case): string | null => {
  const fileName = (oldForms as Record<string, unknown>)[form_name_overall]
    ? form_name_overall
    : null;

  switch (form_name_overall) {
    case 'API_Allocation':
    case 'API_Deallocation':
      return `/people/${caseFormData.mosaic_id}/allocations/${
        (caseFormData as AllocationCaseFormData | DeallocationCaseFormData)
          .allocation_id
      }?recordId=${recordId}`;
    case fileName:
      return `/people/${caseFormData.mosaic_id}/records/${recordId}`;
    case 'Historical_Case_Note':
      return `/people/${caseFormData.mosaic_id}/records/${recordId}?is_historical=${caseFormData.is_historical}`;
    case 'Historical_Visit':
      return `/people/${caseFormData.mosaic_id}/visits/${recordId}?is_historical=${caseFormData.is_historical}`;
    case 'API_WarningNote':
      return `/people/${caseFormData.mosaic_id}/warning-notes/${
        (caseFormData as WarningNoteCaseFormData).warning_note_id
      }/view/${getWarningNoteDetailsPageName(caseFormData.form_name)}`;
    default:
      return null;
  }
};
