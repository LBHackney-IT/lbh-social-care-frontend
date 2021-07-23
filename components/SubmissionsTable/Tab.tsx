import s from 'components/Tabs/Tabs.module.scss';
import cx from 'classnames';

interface FilterProps {
  value: 'mine' | 'all';
  children: React.ReactChild;
  filter: string;
  setFilter: (value: 'mine' | 'all') => void;
}

const Filter = ({
  value,
  children,
  filter,
  setFilter,
}: FilterProps): React.ReactElement => (
  <li
    className={cx('lbh-body', s.tab, {
      [s.active]: value === filter,
    })}
  >
    <a
      onClick={() => setFilter(value)}
      // className={s.link}
      href="#"
      className={`lbh-link lbh-link--no-visited-state ${s.link}`}
    >
      {children}
    </a>
  </li>
);

export default Filter;
