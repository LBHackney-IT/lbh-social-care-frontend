import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import AllocatedCases from 'components/AllocatedCases/AllocatedCases';
import BackButton from 'components/Layout/BackButton/BackButton';

const Workers = (): React.ReactElement => {
  const { query } = useRouter();
  const allocationId = query.id as string;
  return (
    <div>
      <NextSeo title={`#${query.id} Allocation Workers`} noindex />
      <BackButton />
      <AllocatedCases id={allocationId} />
    </div>
  );
};

export default Workers;
