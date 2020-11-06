import LinkButton from 'components/LinkButton/LinkButton';
import { NextSeo } from 'next-seo';

const Confirmation = () => (
  <div>
    <NextSeo title="Conformation" noindex />
    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 className="govuk-fieldset__heading">Confirmation</h1>
    </legend>
    <h3>Your form has been submitted</h3>
    <LinkButton label="Home" route="/" />
  </div>
);

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
export default Confirmation;
