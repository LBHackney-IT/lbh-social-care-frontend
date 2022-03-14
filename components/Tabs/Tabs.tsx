import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './Tabs.module.scss';
import { ParsedUrlQuery } from 'querystring';

interface Tab {
  url: string;
  text: string;
}

export interface Props {
  title: string;
  tabs: Tab[];
  children: React.ReactChild;
}

export const updateQuery = (
  query: ParsedUrlQuery,
  url: string
): ParsedUrlQuery | undefined => {
  if (query) {
    const updatedQuery: ParsedUrlQuery = { ...query };
    if (url == '/cases') {
      if (query.person_id && !query.mosaic_id) {
        updatedQuery.mosaic_id = query.person_id;
      }
      if (!query.person_id && query.mosaic_id) {
        delete updatedQuery.mosaic_id;
      }
      if (updatedQuery.name) {
        delete updatedQuery.name;
      }
      if (updatedQuery.date_of_birth) {
        delete updatedQuery.date_of_birth;
      }
      if (updatedQuery.postcode) {
        delete updatedQuery.postcode;
      }
    }
    return updatedQuery;
  } else {
    return undefined;
  }
};

const Tabs = ({ title, tabs, children }: Props): React.ReactElement => {
  const { pathname, query } = useRouter();
  return (
    <div className="govuk-tabs lbh-tabs">
      <h2 className="govuk-tabs__title">{title}</h2>
      <ul className={s.tabList}>
        {tabs.map(({ url, text }) => (
          <li
            key={text}
            className={cx('lbh-body', s.tab, {
              [s.active]: pathname === url,
            })}
          >
            <Link
              href={{ pathname: url, query: updateQuery(query, url) }}
              scroll={false}
            >
              <a className={`lbh-link lbh-link--no-visited-state ${s.link}`}>
                {text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default Tabs;
