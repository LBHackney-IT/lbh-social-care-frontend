import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AllocatedCases from 'components/AllocatedCases/AllocatedCases';
import BackButton from 'components/Layout/BackButton/BackButton';

const Workers = () => {
  const { query } = useRouter();
  return (
    <div>
      <Seo title={`#${query.id} Allocation Workers`} />
      <BackButton />
      <AllocatedCases id={query.id} />
    </div>
  );
};

export default Workers;
