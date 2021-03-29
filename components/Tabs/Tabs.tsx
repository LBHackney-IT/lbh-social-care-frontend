import cx from 'classnames';
import Link from 'next/link';

interface Tab {
  url: string;
  text: string;
  isSelected?: boolean;
}

export interface Props {
  title: string;
  tabs: Tab[];
  children: React.ReactChild;
}

const Tabs = ({ title, tabs, children }: Props): React.ReactElement => (
  <div className="govuk-tabs">
    <h2 className="govuk-tabs__title">{title}</h2>
    <ul className="govuk-tabs__list">
      {tabs.map((tab) => (
        <li
          key={tab.text}
          className={cx('govuk-tabs__list-item', {
            'govuk-tabs__list-item--selected': tab.isSelected,
          })}
        >
          <Link href={tab.url} scroll={false}>
            <a className="govuk-tabs__tab">{tab.text}</a>
          </Link>
        </li>
      ))}
    </ul>
    <div className="govuk-tabs__panel">{children}</div>
  </div>
);

export default Tabs;
