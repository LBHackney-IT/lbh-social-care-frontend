import s from './Skeleton.module.scss';

const Skeleton = () => (
  <div aria-hidden="true" className={s.skeleton}>
    <div></div>
    <div></div>
    <div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

const TripleSkeleton = () => (
  <>
    <p className="govuk-visually-hidden">Loading...</p>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </>
);

export default TripleSkeleton;
