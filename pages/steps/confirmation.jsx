import { useRouter } from 'next/router';
import LinkButton from '../../components/LinkButton';

const Confirmation = () => {
  const router = useRouter();
  const { recordID } = router.query;
  if (!recordID) return false;
  return (
    <div>
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h1 className="govuk-fieldset__heading">Confirmation</h1>
      </legend>
      <h3>Your form has been submitted</h3>
      <p>Record ID: {recordID}</p>
      <LinkButton label="Home" route="/" />
    </div>
  );
};

export default Confirmation;
