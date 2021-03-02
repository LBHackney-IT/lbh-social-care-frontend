import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AllocatedCases from 'components/AllocatedCases/AllocatedCases';
import BackButton from 'components/Layout/BackButton/BackButton';

const Workers = (): React.ReactElement => {
  const { query } = useRouter();
  const allocationId = query.id as string;
  return (
    <div>
      <Seo title={`#${query.id} Allocation Workers`} />
      <BackButton />
      <AllocatedCases id={allocationId} />
    </div>
  );
};

export default Workers;
