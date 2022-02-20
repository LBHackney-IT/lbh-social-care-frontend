import Link from 'next/link';
import Result from './Result';
import s from './ResultList.module.scss';

const ResultList = () => (
  <>
    <ol className="lbh-list">
      <Result result={{}} />
      <Result result={{}} />
      <Result result={{}} />
      {/* <TripleSkeleton /> */}
    </ol>

    <Link href="/">
      <a className={`lbh-link lbh-link--no-visited-state ${s.showMore}`}>
        See all 8 results for residents
      </a>
    </Link>
  </>
);

export default ResultList;
