import Search from 'components/Search/Search';
import Tabs from 'components/Tabs/Tabs';
import { CaseTableColumns } from 'components/Cases/CasesTable';

interface Props {
  type: 'people' | 'records';
  columns?: CaseTableColumns;
}

const MainSearchWrapper = ({ type, columns }: Props): React.ReactElement => (
  <>
    <h1 className="govuk-heading-l">Search</h1>
    <p className="govuk-body govuk-!-margin-bottom-5">
      Use search to find a person before adding a new person or record. Records
      will need to be linked to person.
    </p>
    <Tabs
      title="Contents"
      tabs={[
        {
          url: '/search',
          text: 'Search for a person',
        },
        {
          url: '/cases',
          text: 'Search for records by person',
        },
      ]}
    >
      <Search
        type={type}
        subHeader={
          type === 'records'
            ? 'Search and filter by any combination of fields'
            : 'Search for a person by any combination of fields below'
        }
        resultHeader={`${type.toUpperCase()} SEARCH RESULT`}
        // @ts-expect-error TODO: fixed when search.jsx is migrated */}
        columns={columns}
      />
    </Tabs>
  </>
);

export default MainSearchWrapper;
