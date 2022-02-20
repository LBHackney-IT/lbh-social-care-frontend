import { useFormikContext } from 'formik';
import s from './SearchBox.module.scss';
import Autosuggest from 'react-autosuggest';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchParams } from 'pages/search';

interface Props {
  query: string;
}

const Suggestion = (suggestion: any, { query }: Props) => {
  const displayTitle = suggestion?.title.replace(
    new RegExp(query, 'gi'),
    `<strong>$&</strong>`
  );

  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: displayTitle }} />
      <span className="lbh-body-xs">{[suggestion?.resultType]}</span>
    </div>
  );
};
const SearchBox = () => {
  const name = 'query';

  const [suggestions, setSuggestions] = useState([
    {
      title: 'Example suggestion',
      resultType: 'Example result type',
    },
  ]);
  const { push } = useRouter();
  const { isSubmitting, values, setFieldValue, submitForm } =
    useFormikContext<SearchParams>();

  const getSuggestions = useCallback(async (e) => {
    // const res = await fetch(`/api/autocomplete?query=${e.value}`);
    // const data = await res.json();
    // setSuggestions(data?.suggestions || []);
  }, []);

  return (
    <div className="govuk-grid-row">
      <div className={`govuk-grid-column-two-thirds `}>
        <div className={s.searchBox}>
          <label className="govuk-visually-hidden" htmlFor={name}>
            Search query
          </label>

          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={getSuggestions}
            theme={s}
            // onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={(suggestion) => suggestion?.title}
            shouldRenderSuggestions={(val) => val?.trim()?.length > 1}
            onSuggestionSelected={(e, { suggestion, method }) => {
              e.preventDefault();
              if (method === 'click') {
                // push(permalink(suggestion));
              } else {
                setFieldValue(name, suggestion.title);
                submitForm();
              }
            }}
            renderSuggestion={Suggestion}
            inputProps={{
              className: 'govuk-input lbh-input',
              name,
              id: name,
              placeholder: 'Search...',
              value: values[name],
              onChange: (_e, { newValue }) => setFieldValue(name, newValue),
            }}
          />

          <svg width="25" height="25" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.70002 10.6C12.0748 10.6 14 8.67482 14 6.3C14 3.92518 12.0748 2 9.70002 2C7.3252 2 5.40002 3.92518 5.40002 6.3C5.40002 8.67482 7.3252 10.6 9.70002 10.6ZM9.70002 12.6C13.1794 12.6 16 9.77939 16 6.3C16 2.82061 13.1794 0 9.70002 0C6.22063 0 3.40002 2.82061 3.40002 6.3C3.40002 9.77939 6.22063 12.6 9.70002 12.6Z"
              fill="#0B0C0C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.70712 10.7072L1.70712 15.7072L0.292908 14.293L5.29291 9.29297L6.70712 10.7072Z"
              fill="#0B0C0C"
            />
          </svg>

          <button
            type="submit"
            className="govuk-button lbh-button"
            disabled={isSubmitting}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
