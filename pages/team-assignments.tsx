import st from 'components/Tabs/Tabs.module.scss';
import { useState } from 'react';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import Tab from 'components/SubmissionsTable/Tab';
import Card from 'components/MashCards/MashCard';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { MashReferral } from 'types';
import { getAllMashReferrals } from 'lib/mashReferral';

interface Props {
  referrals: MashReferral[];
}

export const TeamAssignments = ({ referrals }: Props): React.ReactElement => {
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
      <DashboardWrapper>
        <>
          <h1 className="govuk-!-margin-bottom-8">Team assignments</h1>
          <fieldset className="govuk-tabs lbh-tabs govuk-!-margin-top-8">
            <ul className={st.tabList}>
              <Tab filter={filter} value="contact" setFilter={setFilter}>
                <>Contact ({contact.length}) </>
              </Tab>
              <Tab
                filter={filter}
                value="initial-decision"
                setFilter={setFilter}
              >
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
          {mashReferrals.map((referral) => (
            <div key={referral.id}>
              <Card
                clientname={referral.clients[0]}
                timeleft="4 hours"
                datetime={referral.createdAt}
                info1={referral.referrer}
                info2={referral.requestedSupport}
              ></Card>
            </div>
          ))}
        </>
      </DashboardWrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = isAuthorised(req);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  const mashReferrals = await getAllMashReferrals();

  return {
    props: {
      referrals: mashReferrals,
    },
  };
};

export default TeamAssignments;
