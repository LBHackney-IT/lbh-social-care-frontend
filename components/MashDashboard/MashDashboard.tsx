import st from 'components/Tabs/Tabs.module.scss';
import { useEffect, useState } from 'react';
import Tab from 'components/SubmissionsTable/Tab';
import MainCard from 'components/MashCards/MainCard';
import { MashReferral } from 'types';
import { useRouter } from 'next/router';

interface Props {
  referrals: MashReferral[];
}

const possibleTabs = new Set([
  'contact',
  'initial-decision',
  'screening-decision',
  'final-decision',
]);

export const MashDashboard = ({ referrals }: Props): React.ReactElement => {
  const [filter, setFilter] = useState('contact');

  const router = useRouter();

  useEffect(() => {
    const tab = (router.query.tab as string).toLowerCase();
    if (possibleTabs.has(tab)) {
      setFilter(tab);
    }
  }, [router.query]);

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

  const onTabClick = (tabClicked: string) => {
    setFilter(tabClicked);
    router.query.tab = tabClicked;
    router.push(router);
  };

  return (
    <div>
      <>
        <h1 className="govuk-!-margin-bottom-8">Team assignments</h1>
        <fieldset className="govuk-tabs lbh-tabs govuk-!-margin-top-8">
          <ul className={st.tabList}>
            <Tab filter={filter} value="contact" setFilter={onTabClick}>
              <>Contact ({contact.length}) </>
            </Tab>
            <Tab
              filter={filter}
              value="initial-decision"
              setFilter={onTabClick}
            >
              <>Initial decision ({initial.length})</>
            </Tab>
            <Tab
              filter={filter}
              value="screening-decision"
              setFilter={onTabClick}
            >
              <>Screening decision ({screening.length}) </>
            </Tab>
            <Tab filter={filter} value="final-decision" setFilter={onTabClick}>
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
