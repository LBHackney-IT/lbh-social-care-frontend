import s from './Result.module.scss';

interface Props {
  result: unknown;
}

const Result = ({ result }: Props): React.ReactElement => (
  <li className={s.result}>
    <h3>
      <a className="lbh-link" href="#" target="_blank" rel="noreferrer">
        Example result title here
      </a>
    </h3>

    <p className="lbh-body-xs govuk-!-margin-top-2">
      Result type · Added XXXX by XXXX
    </p>

    <p
      className="lbh-body-s govuk-!-margin-top-2"
      dangerouslySetInnerHTML={{ __html: 'Example snippet here' as string }}
    />
  </li>
);

export default Result;
