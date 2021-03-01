import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import AllocationRecap from 'components/AllocatedWorkers/AllocationRecap/AllocationRecap';
import BackButton from 'components/Layout/BackButton/BackButton';

const AllocationPage = (): React.ReactElement => {
  const {
    query: { id, allocationId, recordId },
  } = useRouter();
  return (
    <>
      <NextSeo title={`#${id} Allocation`} noindex />
      <BackButton />
      <AllocationRecap
        personId={id as string}
        allocationId={allocationId as string}
        recordId={recordId as string}
      />
    </>
  );
};

export default AllocationPage;
