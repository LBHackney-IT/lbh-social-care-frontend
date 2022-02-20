import Filters from 'components/NextGenSearch/Filters';
import ResultList from 'components/NextGenSearch/ResultList';
import SearchBox from 'components/NextGenSearch/SearchBox';
import { Form, Formik } from 'formik';
import Head from 'next/head';

export enum SearchDomain {
  Residents = 'residents',
  Workflows = 'workflows',
  CaseNotes = 'caseNotes',
}

export interface SearchParams {
  query: string;
  domain: SearchDomain | '';
  socialCareId: string;
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
          socialCareId: '',
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
              <aside className="govuk-grid-column-one-third">
                <Filters />
              </aside>
              <main className="govuk-grid-column-two-thirds">
                {/* <pre>
                  <code>{JSON.stringify(values, null, 2)}</code>
                </pre> */}

                <ResultList />
              </main>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default SearchPage;
