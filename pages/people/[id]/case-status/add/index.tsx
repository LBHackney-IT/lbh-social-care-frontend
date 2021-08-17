import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';

import Seo from 'components/Layout/Seo/Seo';

const AddNewCaseStatus = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);

  return (
    <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
      Add a new relationship
    </h1>
  );
};

export default AddNewCaseStatus;
