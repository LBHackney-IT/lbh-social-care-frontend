import PropTypes from 'prop-types';
import Link from 'next/link';

const getLink = (recordId, { form_name_overall, ...caseFormData }) => {
  switch (form_name_overall) {
    case 'API_Allocation':
    case 'API_Deallocation':
      return `/people/${caseFormData.mosaic_id}/allocations/${caseFormData.allocation_id}?recordId=${recordId}`;
    default:
      return null;
  }
};

const CaseLink = ({ recordId, externalUrl, caseFormData }) => {
  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener"
        className="govuk-link"
      >
        View
      </a>
    );
  }
  const internalLink = getLink(recordId, caseFormData);
  return internalLink ? <Link href={internalLink}>View</Link> : null;
};

CaseLink.propTypes = {
  recordId: PropTypes.string.isRequired,
  externalUrl: PropTypes.string,
  caseFormData: PropTypes.shape({
    form_name_overall: PropTypes.string.isRequired,
  }).isRequired,
};

export default CaseLink;
