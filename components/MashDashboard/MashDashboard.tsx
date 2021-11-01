import st from 'components/Tabs/Tabs.module.scss';
import { useState } from 'react';
import Tab from 'components/SubmissionsTable/Tab';
import MainCard from 'components/MashCards/MainCard';
import { MashReferral } from 'types';

interface Props {
  referrals: MashReferral[];
}

export const MashDashboard = ({ referrals }: Props): React.ReactElement => {
  const [filter, setFilter] = useState<string>('contact');

  const { contact, initial, screening, final } = {
    contact: referrals.filter((ref) => ref.stage === 'Contact'),
    initial: referrals.filter((ref) => ref.stage === 'Initial decision'),
    screening: referrals.filter((ref) => ref.stage === 'Screening'),
    final: referrals.filter((ref) => ref.stage === 'Final'),
  };

  let mashReferrals: MashReferral[] = [];

  if (filter === 'contact') {
    mashReferrals = contact;
  } else if (filter === 'initial-decision') {
    mashReferrals = initial;
  } else if (filter === 'screening') {
    mashReferrals = screening;
  } else {
    mashReferrals = final;
  }
  return (
    <div>
      <>
        <h1 className="govuk-!-margin-bottom-8">Team assignments</h1>
        <fieldset className="govuk-tabs lbh-tabs govuk-!-margin-top-8">
          <ul className={st.tabList}>
            <Tab filter={filter} value="contact" setFilter={setFilter}>
              <>Contact ({contact.length}) </>
            </Tab>
            <Tab filter={filter} value="initial-decision" setFilter={setFilter}>
              <>Initial decision ({initial.length})</>
            </Tab>
            <Tab filter={filter} value="screening" setFilter={setFilter}>
              <>Screening decision ({screening.length}) </>
            </Tab>
            <Tab filter={filter} value="final-decision" setFilter={setFilter}>
              <>Final decision ({final.length})</>
            </Tab>
          </ul>
        </fieldset>
        <div>
          <MainCard filter={filter} mashReferrals={mashReferrals}></MainCard>
        </div>
      </>
    </div>
  );
};

export default MashDashboard;
