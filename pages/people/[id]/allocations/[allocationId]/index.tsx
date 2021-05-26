import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AllocationRecap from 'components/AllocatedWorkers/AllocationRecap/AllocationRecap';

const AllocationPage = (): React.ReactElement => {
  const {
    query: { id, allocationId, recordId },
  } = useRouter();
  return (
    <>
      <Seo title={`#${id} Allocation`} />
      <AllocationRecap
        personId={Number(id as string)}
        allocationId={Number(allocationId as string)}
        recordId={recordId as string}
      />
    </>
  );
};

AllocationPage.goBackButton = true;

export default AllocationPage;
