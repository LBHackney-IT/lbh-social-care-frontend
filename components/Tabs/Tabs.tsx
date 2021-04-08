import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Tab {
  url: string;
  text: string;
}

export interface Props {
  title: string;
  tabs: Tab[];
  children: React.ReactChild;
}

const Tabs = ({ title, tabs, children }: Props): React.ReactElement => {
  const { pathname, query } = useRouter();
  return (
    <div className="govuk-tabs">
      <h2 className="govuk-tabs__title">{title}</h2>
      <ul className="govuk-tabs__list">
        {tabs.map(({ url, text }) => (
          <li
            key={text}
            className={cx('govuk-tabs__list-item', {
              'govuk-tabs__list-item--selected': pathname === url,
            })}
          >
            <Link href={{ pathname: url, query: query }} scroll={false}>
              <a className="govuk-tabs__tab">{text}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="govuk-tabs__panel">{children}</div>
    </div>
  );
};

export default Tabs;
