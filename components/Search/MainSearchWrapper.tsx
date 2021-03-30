import Search from 'components/Search/Search';
import Tabs from 'components/Tabs/Tabs';
import { CaseTableColumns } from 'components/Cases/CasesTable';

interface Props {
  type: 'people' | 'records';
  columns?: CaseTableColumns;
}

const SearchCasesPage = ({ type, columns }: Props): React.ReactElement => (
  <>
    <h1 className="lbh-heading-h1">Search</h1>
    <p className="lbh-body govuk-!-margin-bottom-5">
      Search for a person before adding a new person or record. Records must be
      linked to people. You can search by any combination of fields.
    </p>
    <Tabs
      title="Contents"
      tabs={[
        {
          url: '/',
          text: 'Search for a person',
          isSelected: type === 'people',
        },
        {
          url: '/cases',
          text: 'Search for records by person',
          isSelected: type === 'records',
        },
      ]}
    >
      <Search
        type={type}
        resultHeader={`${type.toUpperCase()} SEARCH RESULT`}
        // @ts-expect-error TODO: fixed when search.jsx is migrated */}
        columns={columns}
      />
    </Tabs>
  </>
);

export default SearchCasesPage;
