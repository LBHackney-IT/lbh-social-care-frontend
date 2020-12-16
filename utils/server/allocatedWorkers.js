import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

// eslint-disable-next-line no-unused-vars
export const getResidentsAllocatedWorkers = async (mosaic_id) => {
  // const { data } = await axios.get(`${ENDPOINT_API}/asc-allocations`, {
  //   headers: { 'x-api-key': AWS_KEY },
  //   params: { mosaic_id },
  // });
  return {
    allocations: [
      {
        allocatedTeam: 'Integrated Learning Disabilities',
        allocatedWorker: 'John Random',
        startDate: '1/1/2000',
        endDate: '2/2/2000',
        role: 'social worker',
      },
      {
        allocatedTeam: 'Case Management Team',
        allocatedWorker: 'Mary Random',
        startDate: '1/1/2000',
        endDate: '2/2/2000',
        role: 'social worker 2',
      },
    ],
  }; //not sure what this should be
};

export const addAllocatedWorkers = async (formData) => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/asc-allocations`,
    formData,
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );
  return { ref: data?.['_id'] };
};
