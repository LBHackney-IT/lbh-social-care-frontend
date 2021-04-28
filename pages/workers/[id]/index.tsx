import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AllocatedCases from 'components/AllocatedCases/AllocatedCases';
import BackButton from 'components/Layout/BackButton/BackButton';

const Workers = (): React.ReactElement => {
  const { query } = useRouter();
  const allocationId = Number(query.id as string);
  return (
    <div>
      <Seo title={`Worker Allocations -  #${query.id}`} />
      <BackButton />
      <h1>Worker&apos;s allocations</h1>
      <AllocatedCases id={allocationId} />
    </div>
  );
};

export default Workers;
