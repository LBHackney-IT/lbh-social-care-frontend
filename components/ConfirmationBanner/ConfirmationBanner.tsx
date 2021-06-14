import Icon from 'components/Icons/TickCircle';
import s from './ConfirmationBanner.module.scss';

export interface Props {
  title: string;
  children?: React.ReactChild;
}

const ConfirmationBanner = ({ title, children }: Props): React.ReactElement => (
  <div
    className={`govuk-panel govuk-panel--confirmation lbh-panel govuk-!-margin-bottom-8 ${s.banner}`}
    role="alert"
  >
    <Icon />
    <div>
      <p className={s.title}>{title}</p>
      {children && (
        <div data-testid="confirmation-banner-children" className={s.body}>
          {children}
        </div>
      )}
    </div>
  </div>
);

export default ConfirmationBanner;
