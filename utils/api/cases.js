import axios from 'axios';

export const getCases = async (id) => {
  const { data } = await axios.get(`/api/cases/${id}`);
  return data;
};
