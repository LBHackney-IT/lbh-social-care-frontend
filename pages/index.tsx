import Seo from 'components/Layout/Seo/Seo';
import Search from 'components/Search/Search';
import Tabs from 'components/Tabs/Tabs';

const tabs = [
  {
    url: '/',
    text: 'Search for a person',
    isSelected: true,
  },
  { url: '/cases', text: 'Search for records by person' },
];

const SearchResidentPage = (): React.ReactElement => (
  <div>
    <Seo title="Search" />
    <h1 className="govuk-heading-l">Search</h1>
    <p className="govuk-body govuk-!-margin-bottom-5">
      Use search to find a person before adding a new person or record. Records
      will need to be linked to person.
    </p>
    <Tabs title="Contents" tabs={tabs}>
      <Search type="people" />
    </Tabs>
  </div>
);

export default SearchResidentPage;
