import { useEffect, useState } from 'react';
import style from './PageView.module.scss';
import throttle from 'lodash/throttle';
import { HistoricCaseData } from 'types';

const PageView = ({
  title,
  officerEmail,
  formName,
  dateOfEvent,
  content,
}: HistoricCaseData): React.ReactElement => {
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
  }, []);
  return (
    <>
      <h3 className="lbh-heading-h2 section-heading">{title}</h3>
      <dl className="govuk-summary-list lbh-summary-list govuk-!-margin-bottom-2">
        {formName && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Form name'}</dt>
            <dd className="govuk-summary-list__value">{formName}</dd>
          </div>
        )}
        {officerEmail && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Created by'}</dt>
            <dd className="govuk-summary-list__value">{officerEmail}</dd>
          </div>
        )}
        {dateOfEvent && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Date of event'}</dt>
            <dd className="govuk-summary-list__value">
              {new Date(dateOfEvent).toLocaleDateString('en-GB')}
            </dd>
          </div>
        )}
      </dl>
      {content && (
        <div className={style.pageView}>
          {isVisible && (
            <a
              href="#main-content"
              className="lbh-back-to-top lbh-back-to-top--visible"
              onClick={scrollToTop}
            >
              <svg
                className="lbh-back-to-top__icon"
                width="31px"
                height="31px"
                viewBox="0 0 31 31"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Back to top arrow icon</title>
                <g
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                  transform="translate(1.000000, 1.000000)"
                >
                  <circle
                    className="lbh-back-to-top__icon-circle"
                    strokeWidth="1"
                    fillRule="evenodd"
                    cx="14.5"
                    cy="14.5"
                    r="14.5"
                  ></circle>
                  <g
                    className="lbh-back-to-top__icon-arrow"
                    transform="translate(9.000000, 9.000000)"
                    fillRule="nonzero"
                  >
                    <path d="M0.736944572,6.32306662 L0.177622538,5.77803817 C-0.0592075126,5.54726035 -0.0592075126,5.17408771 0.177622538,4.94576498 L5.07295007,0.173083361 C5.30978012,-0.0576944537 5.69273935,-0.0576944537 5.92704993,0.173083361 L10.8223775,4.9433099 C11.0592075,5.17408771 11.0592075,5.54726035 10.8223775,5.77558308 L10.2630554,6.32061154 C10.0237059,6.55384444 9.63318827,6.54893427 9.39887769,6.31079121 L6.50904718,3.35487111 L6.50904718,10.41078 C6.50904718,10.7373061 6.23946404,11 5.90437471,11 L5.09814475,11 C4.76305543,11 4.49347229,10.7373061 4.49347229,10.41078 L4.49347229,3.35487111 L1.60112231,6.31324629 C1.36681173,6.55384444 0.976294091,6.5587546 0.736944572,6.32306662 Z"></path>
                  </g>
                </g>
              </svg>
              <span className="lbh-back-to-top__text">Back to top</span>
            </a>
          )}
          <div
            className={style.content}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      )}
    </>
  );
};
export default PageView;
