import Link from 'next/link';

import * as form from 'data/forms';
import {
  AllocationCaseFormData,
  CaseFormData,
  DeallocationCaseFormData,
  WarningNoteCaseFormData,
} from 'types';

const getLink = (
  recordId: string,
  { form_name_overall, ...caseFormData }: CaseFormData
) => {
  const fileName = (form as Record<string, unknown>)[form_name_overall]
    ? form_name_overall
    : null;

  switch (form_name_overall) {
    case 'API_Allocation':
    case 'API_Deallocation':
      return `/people/${caseFormData.mosaic_id}/allocations/${
        (caseFormData as AllocationCaseFormData | DeallocationCaseFormData)
          .allocation_id
      }?recordId=${recordId}`;
    case 'ASC_conv3':
    case fileName:
      return `/people/${caseFormData.mosaic_id}/records/${recordId}`;
    case 'Historical_Case_Note':
      return `/people/${caseFormData.mosaic_id}/records/${recordId}?is_historical=${caseFormData.is_historical}`;
    case 'Historical_Visit':
      return `/people/${caseFormData.mosaic_id}/visits/${recordId}?is_historical=${caseFormData.is_historical}`;
    case 'API_WarningNote':
      return `/people/${caseFormData.mosaic_id}/warning-notes/${
        (caseFormData as WarningNoteCaseFormData).warning_note_id
      }/view`;
    default:
      return null;
  }
};

interface Props {
  recordId: string;
  externalUrl?: string;
  caseFormData: CaseFormData;
}

const CaseLink = ({
  recordId,
  externalUrl,
  caseFormData,
}: Props): React.ReactElement | null => {
  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="govuk-link lbh-link"
      >
        View
      </a>
    );
  }
  const internalLink = getLink(recordId, caseFormData);
  return internalLink ? (
    <Link href={internalLink}>
      <a className="govuk-link lbh-link">View</a>
    </Link>
  ) : null;
};

export default CaseLink;
