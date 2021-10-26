import st from 'components/Tabs/Tabs.module.scss';
import { useState } from 'react';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import Tab from 'components/SubmissionsTable/Tab';

interface FilterProps {
  value: 'mine' | 'all';
  setFilter: (value: 'mine' | 'all') => void;
}

export const TeamAssignments = (): React.ReactElement => {
  const [filter, setFilter] = useState<'mine' | 'all'>('mine');

  return (
    <div>
      <DashboardWrapper>
        <>
          <h1 className="govuk-!-margin-bottom-8">Team assignments</h1>
          <fieldset className="govuk-tabs lbh-tabs govuk-!-margin-top-8">
            <ul className={st.tabList}>
              <Tab filter="mine" value="mine" setFilter={setFilter}>
                <>Contact(2) </>
              </Tab>
              <Tab filter="mine" value="all" setFilter={setFilter}>
                <>Initial decision (1)</>
              </Tab>
              <Tab filter="mine" value="all" setFilter={setFilter}>
                <>Screening decision (2) </>
              </Tab>
              <Tab filter="mine" value="all" setFilter={setFilter}>
                <>Final decision (1)</>
              </Tab>
            </ul>
          </fieldset>
        </>
      </DashboardWrapper>
    </div>
  );
};

export default TeamAssignments;
