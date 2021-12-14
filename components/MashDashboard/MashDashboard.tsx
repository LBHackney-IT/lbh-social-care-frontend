import st from 'components/Tabs/Tabs.module.scss';
import React, { useEffect, useState } from 'react';
import Tab from 'components/SubmissionsTable/Tab';
import MainCard from 'components/MashCards/MainCard';
import { MashReferral, ReferralStage } from 'types';
import { useRouter } from 'next/router';
import SuccessSummary from 'components/SuccessSummary/SuccessSummary';
import Button from 'components/Button/Button';
import { resetDummyData } from 'utils/api/mashReferrals';

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
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [assignmentFilter, setAssignmentFilter] = useState(false);

  useEffect(() => {
    if (router.query.tab) {
      const tab = (router.query.tab as string).toLowerCase();
      if (possibleTabs.has(tab)) {
        setFilter(tab);
      }
    }
  }, []);

  const confirmation =
    (router.query.confirmation &&
      (JSON.parse(router.query.confirmation as string) as {
        title: string;
        link: string;
        [values: string]: string;
      })) ||
    undefined;

  const { contact, initial, screening, final } = {
    contact: referrals.filter((ref) => ref.stage === ReferralStage.CONTACT),
    initial: referrals.filter((ref) => ref.stage === ReferralStage.INITIAL),
    screening: referrals.filter((ref) => ref.stage === ReferralStage.SCREENING),
    final: referrals.filter((ref) => ref.stage === ReferralStage.FINAL),
  };

  let mashReferrals: MashReferral[] = [];

  if (filter === 'contact') {
    mashReferrals = contact;
  } else if (filter === 'initial-decision') {
    mashReferrals = initial;
  } else if (filter === 'screening-decision') {
    mashReferrals = screening;
  } else {
    mashReferrals = final;
  }

  const onTabClick = (tabClicked: string) => {
    setFilter(tabClicked);
    router.query.tab = tabClicked;
    router.query.confirmation = undefined;
    router.push(router);
  };

  const resetData = async () => {
    setSubmitting(true);
    await resetDummyData();
    setSubmitting(false);
    router.reload();
  };

  if (assignmentFilter === true) {
    mashReferrals = mashReferrals.filter(
      (ref) => ref.requestedSupport === 'Safeguarding'
    );
  }

  return (
    <div>
      <>
        {confirmation && (
          <SuccessSummary
            title={confirmation.title}
            referralLink={confirmation.link}
            body={confirmation}
          />
        )}
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
        <div
          className="govuk-radios lbh-radios govuk-radios--conditional"
          data-module="govuk-radios"
          style={{ display: 'inline-flex' }}
        >
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="all-assignments-filter"
              name="all-assignments"
              type="radio"
              onChange={() => setAssignmentFilter(false)}
              checked={!assignmentFilter}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor="all-assignments-filter"
            >
              All
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="my-assignments-filter"
              name="my-assignments"
              type="radio"
              onChange={() => setAssignmentFilter(true)}
              checked={assignmentFilter}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor="my-assignments-filter"
            >
              My assignments only
            </label>
          </div>
        </div>
        <Button
          label="Reset Dummy Data"
          type="submit"
          onClick={resetData}
          disabled={submitting}
        />
        <div>
          {mashReferrals.length > 0 ? (
            <MainCard filter={filter} mashReferrals={mashReferrals}></MainCard>
          ) : (
            <p>No referrals to show.</p>
          )}
        </div>
      </>
    </div>
  );
};

export default MashDashboard;
