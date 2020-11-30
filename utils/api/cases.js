import axios from 'axios';

export const getCases = async (params) => {
  const { data } = await axios.get('/api/cases', {
    params,
  });

  return data;
};
