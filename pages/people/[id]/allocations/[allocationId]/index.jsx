import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AllocationRecap from 'components/AllocatedWorkers/AllocationRecap/AllocationRecap';
import BackButton from 'components/Layout/BackButton/BackButton';

const AllocationPage = () => {
  const {
    query: { id, allocationId, recordId },
  } = useRouter();
  return (
    <>
      <Seo title={`#${id} Allocation`} />
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
