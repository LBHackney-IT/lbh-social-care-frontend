import Tip from 'components/Tip/Tip';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './NavLink.module.scss';

interface Props {
  href: string;
  children: React.ReactChild | React.ReactChild[];
  tip?: string;
  secondary?: boolean;
}

const NavLinkInner = ({
  href,
  children,
  secondary,
}: Props): React.ReactElement => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`lbh-link lbh-link--no-visited-state ${
          secondary
            ? s.secondary
            : router.asPath === href
            ? s.navLinkActive
            : s.navLink
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

const NavLink = ({ ...props }: Props): React.ReactElement => {
  if (props.tip)
    return (
      <li className={s.listItem}>
        <Tip content={props.tip}>
          <span data-testid="tip-target">
            <NavLinkInner {...props} />
          </span>
        </Tip>
      </li>
    );

  return (
    <li className={s.listItem}>
      <NavLinkInner {...props} />
    </li>
  );
};

export default NavLink;
