import { Workflow } from 'components/ResidentPage/types';
import useSWR, { SWRResponse } from 'swr';

interface Res {
  workflows: Workflow[];
  count: number;
}

/** get a resident's workflows, using their social care id */
const useWorkflows = (
  socialCareId: number,
  limit = 20
): SWRResponse<Res, Error> => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/api/workflows?social_care_id=${socialCareId}&per_page=${limit}`,
    (url) =>
      fetch(url, {
        credentials: 'include', // by default, fetch won't send the cookie
      }).then((r) => r.json())
  );
};

export default useWorkflows;
