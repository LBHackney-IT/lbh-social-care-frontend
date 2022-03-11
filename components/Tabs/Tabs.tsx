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

const updateQuery = (query: ParsedUrlQuery) => {
  if (query && url == '/search') {
    return query.replace('moasic_id', 'person_id');
  }
  if (query && url == '/cases') {
    return query.replace('person_id', 'moasic_id');
  } else {
    return undefined;
  }
};

const Tabs = ({ title, tabs, children }: Props): React.ReactElement => {
  const { pathname, query } = useRouter();
  console.log(pathname);
  console.log(query);
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
              href={{ pathname: url, query: updateQuery(query) }}
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
