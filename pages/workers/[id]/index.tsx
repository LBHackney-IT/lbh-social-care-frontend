import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AllocatedCases from 'components/AllocatedCases/AllocatedCases';

const Workers = (): React.ReactElement => {
  const { query } = useRouter();
  const allocationId = Number(query.id as string);
  return (
    <div>
      <Seo title={`Worker Allocations -  #${query.id}`} />
      <h1>Worker&apos;s allocations</h1>
      <AllocatedCases id={allocationId} />
    </div>
  );
};

Workers.goBackButton = true;

export default Workers;
