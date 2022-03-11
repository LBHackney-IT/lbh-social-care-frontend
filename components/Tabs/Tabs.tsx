import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './Tabs.module.scss';

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
            <Link href={{ pathname: url }} scroll={false}>
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
