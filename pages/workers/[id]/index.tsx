import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AllocatedCases from 'components/AllocatedCases/AllocatedCases';
import BackButton from 'components/Layout/BackButton/BackButton';

const Workers = (): React.ReactElement => {
  const { query } = useRouter();
  const allocationId = Number(query.id as string);
  return (
    <>
      <BackButton />
      <main className="lbh-main-wrapper" id="main-content" role="main">
        <Seo title={`Worker Allocations -  #${query.id}`} />
        <AllocatedCases id={allocationId} />
      </main>
    </>
  );
};

export default Workers;
