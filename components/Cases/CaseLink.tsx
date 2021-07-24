import Link from 'next/link';
import forms from 'data/flexibleForms';
import { CaseFormData } from 'types';
import { generateInternalLink } from 'utils/urls';
interface Props {
  recordId: string;
  externalUrl?: string;
  caseFormData: CaseFormData;
  formName: string;
  personId: number;
}

const CaseLink = ({
  formName,
  externalUrl,
  caseFormData,
  recordId,
  personId,
}: Props): React.ReactElement | null => {
  const form = formName ? forms?.find((form) => form.id === formName) : false;

  if (form)
    return (
      <Link href={`/people/${personId}/submissions/${recordId}`}>
        <a className="lbh-link">{form?.name || 'View'}</a>
      </Link>
    );

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
  });
  return internalLink ? (
    <Link href={internalLink}>
      <a className="lbh-link">View</a>
    </Link>
  ) : null;
};

export default CaseLink;
