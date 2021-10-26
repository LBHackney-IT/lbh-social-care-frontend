import st from 'components/Tabs/Tabs.module.scss';
import { useState } from 'react';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import Tab from 'components/SubmissionsTable/Tab';

export const TeamAssignments = (): React.ReactElement => {
  const [filter, setFilter] = useState<string>('contact');

  return (
    <div>
      <DashboardWrapper>
        <>
          <h1 className="govuk-!-margin-bottom-8">Team assignments</h1>
          <fieldset className="govuk-tabs lbh-tabs govuk-!-margin-top-8">
            <ul className={st.tabList}>
              <Tab filter={filter} value="contact" setFilter={setFilter}>
                <>Contact(2) </>
              </Tab>
              <Tab
                filter={filter}
                value="initial-decision"
                setFilter={setFilter}
              >
                <>Initial decision (1)</>
              </Tab>
              <Tab filter={filter} value="screening" setFilter={setFilter}>
                <>Screening decision (2) </>
              </Tab>
              <Tab filter={filter} value="final-decision" setFilter={setFilter}>
                <>Final decision (1)</>
              </Tab>
            </ul>
          </fieldset>
          test
        </>
      </DashboardWrapper>
    </div>
  );
};

export default TeamAssignments;
