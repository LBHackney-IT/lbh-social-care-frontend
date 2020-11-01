import axios from 'axios';

export const getCases = async (id) => {
  const { data } = await axios.get(`/api/cases/${id}`);
  return data;
};

// TODO: return data string from

// The backend want this to be a string object
export const postCase = async (formData) => {
  const { data } = await axios.post('/api/cases/', formData);
  return data;
};
