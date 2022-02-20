import Filters from 'components/NextGenSearch/Filters';
import SearchBox from 'components/NextGenSearch/SearchBox';
import { Form, Formik } from 'formik';
import Head from 'next/head';

export enum SortOrder {
  Relevant = '',
  Recent = 'Recent',
}

export enum SearchDomain {
  Residents = 'residents',
  Workflows = 'workflows',
  CaseNotes = 'caseNotes',
}

export interface SearchParams {
  query: string;
  domain: SearchDomain | '';
  sort?: SortOrder;
  socialCareId?: string;
  addedAfter?: string;
  addedBefore?: string;
  addedBy?: string;
}

const SearchPage = (): React.ReactElement => {
  const handleSubmit = async (values: SearchParams) => {
    console.log(values);
    return true;
  };

  return (
    <Formik
      initialValues={
        {
          query: '',
          domain: '',
          sort: SortOrder.Recent,
          socialCareId: '',
          addedAfter: '',
          addedBefore: '',
          addedBy: '',
        } as SearchParams
      }
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <>
          <Head>
            <title>Search | Social care | Hackney Council</title>
          </Head>
          <h1 className="govuk-visually-hidden">Search</h1>

          <Form>
            <SearchBox />

            <div className="govuk-grid-row">
              <aside className="govuk-grid-column-one-quarter">
                <Filters />
              </aside>
              <main className="govuk-grid-column-three-quarters">
                Results here {JSON.stringify(values)}
              </main>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default SearchPage;
