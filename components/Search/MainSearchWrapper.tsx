import Search from 'components/Search/Search';
import Tabs from 'components/Tabs/Tabs';
import { CaseTableColumns } from 'components/Cases/CasesTable';

interface Props {
  type: 'people' | 'records';
  columns?: CaseTableColumns;
}

const MainSearchWrapper = ({ type, columns }: Props): React.ReactElement => (
  <>
    <h1 className="lbh-heading-l">Search</h1>
    <p className="lbh-body govuk-!-margin-bottom-3">
      Use search to find a person before adding a new person or record.
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
          type === 'records' ? (
            <>
              Here you can search for{' '}
              <span className="lbh-!-font-weight-bold">all</span> records that
              have been created for a person. This search will also find records
              that have not been linked to a person’s profile yet.
            </>
          ) : (
            <>Search for a person by any combination of the fields below</>
          )
        }
        resultHeader={`${type.toUpperCase()} SEARCH RESULT`}
        // @ts-expect-error TODO: fixed when search.jsx is migrated */}
        columns={columns}
      />
    </Tabs>
  </>
);

export default MainSearchWrapper;
