import axios from 'axios';
import { Workflow } from 'components/ResidentPage/types';
import useSWR, { SWRResponse } from 'swr';

interface Res {
  workflow: Workflow;
}

/** get a resident's workflows, using their social care id */
const useWorkflowIds = (workflowId?: string): SWRResponse<Res, Error> => {
  return useSWR(
    workflowId
      ? `${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/api/workflows/${workflowId}`
      : null,
    (resource, options) =>
      axios
        .get(resource, {
          ...options,
          withCredentials: true,
        })
        .then((res) => res.data)
  );
};

export default useWorkflowIds;
