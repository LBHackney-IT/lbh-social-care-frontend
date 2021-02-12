import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import AllocationRecap from 'components/AllocatedWorkers/AllocationRecap/AllocationRecap';
import BackButton from 'components/Layout/BackButton/BackButton';

const AllocationPage = () => {
  const {
    query: { id, allocationId, recordId },
  } = useRouter();
  return (
    <>
      <NextSeo title={`#${id} Allocation`} noindex />
      <BackButton />
      <AllocationRecap
        personId={id}
        allocationId={allocationId}
        recordId={recordId}
      />
    </>
  );
};

export default AllocationPage;
