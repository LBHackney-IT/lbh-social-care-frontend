import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import AllocatedCases from 'components/AllocatedCases/AllocatedCases';
import BackButton from 'components/Layout/BackButton/BackButton';

const Workers = () => {
  const { query } = useRouter();
  return (
    <div>
      <NextSeo title={`#${query.id} Allocation Workers`} noindex />
      <BackButton />
      <AllocatedCases id={query.id} />
    </div>
  );
};

export default Workers;
