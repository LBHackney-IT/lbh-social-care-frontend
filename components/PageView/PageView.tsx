import { useEffect, useState } from 'react';
import style from './PageView.module.scss';
import Arrow from '../Icons/DownArrow';
import throttle from 'lodash/throttle';

interface Props {
  created: string;
  title: string;
  type: string;
  date: string;
  team: string;
  note: string;
}
const PageView = ({
  created,
  title,
  type,
  date,
  note,
  team,
}: Props): React.ReactElement => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(toggleVisibility, 1000));
  }, [window]);
  return (
    <>
      <h3 className="govuk-heading-m govuk-custom-text-color govuk-!-margin-bottom-0">
        {title.toUpperCase()}
        <hr className="govuk-divider" />
      </h3>
      <dl className="govuk-summary-list govuk-!-margin-bottom-2">
        {created && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Created by'}</dt>
            <dd className="govuk-summary-list__value">{created}</dd>
          </div>
        )}
        {type && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{`${title} Type`}</dt>
            <dd className="govuk-summary-list__value">{type}</dd>
          </div>
        )}
        {date && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Date of event'}</dt>
            <dd className="govuk-summary-list__value">{date}</dd>
          </div>
        )}
        {team && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Team'}</dt>
            <dd className="govuk-summary-list__value">{team}</dd>
          </div>
        )}
      </dl>
      {note && (
        <div className={style.pageView}>
          <span
            className={`gov-weight-lighter ${style.title}`}
          >{`${title} Description`}</span>
          {isVisible && (
            <span onClick={scrollToTop} className={style.return} role="button">
              <Arrow color={'white'} />
            </span>
          )}
          <div
            className={style.content}
            dangerouslySetInnerHTML={{
              __html: note,
            }}
          />
        </div>
      )}
    </>
  );
};
export default PageView;
