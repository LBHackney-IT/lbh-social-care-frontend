import { mapFormIdToFormDefinition } from 'data/flexibleForms/mapFormIdsToFormDefinition';
import Link from 'next/link';
import { CaseFormData } from 'types';
import { generateInternalLink } from 'utils/urls';
interface Props {
  recordId: string;
  externalUrl?: string;
  caseFormData: CaseFormData;
  formName: string;
  personId: number;
  title?: string;
  formType?: string;
  isImported: boolean;
  deleted: boolean;
}

const CaseLink = ({
  formName,
  externalUrl,
  caseFormData,
  recordId,
  personId,
  title,
  formType,
  isImported,
  deleted,
}: Props): React.ReactElement | null => {
  if (formType === 'flexible-form') {
    const name = mapFormIdToFormDefinition[formName]?.displayName;

    return (
      <Link href={`/people/${personId}/submissions/${recordId}`}>
        <a className="lbh-link">
          {name || 'View'}
          {title ? ` - ${title}` : ''}
        </a>
      </Link>
    );
  }

  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="lbh-link"
      >
        View
      </a>
    );
  }
  const internalLink = generateInternalLink({
    recordId,
    caseFormData,
    personId,
    formName,
    isImported,
    deleted,
  });
  return internalLink ? (
    <Link href={internalLink}>
      <a className="lbh-link">View</a>
    </Link>
  ) : null;
};

export default CaseLink;
