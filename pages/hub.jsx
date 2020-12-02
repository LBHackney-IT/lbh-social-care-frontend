import { NextSeo } from 'next-seo';

import LinkButton from 'components/LinkButton/LinkButton';

const Home = () => {
  return (
    <div>
      <NextSeo title="Home" />
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h1 className="govuk-fieldset__heading">Form Dashboard</h1>
      </legend>
      <LinkButton label="Search for People" route="/people/search" />
      <LinkButton label="Find unlinked case notes" route="/cases/search" />
      <LinkButton
        label="Adult Referral From"
        route="/form/adult-referral/client-details"
      />
      <LinkButton
        label="Child Referral From"
        route="/form/child-referral/client-details"
      />
      <LinkButton
        label="Case Notes Recording"
        route="/form/case-notes-recording"
      />
    </div>
  );
};

export default Home;
