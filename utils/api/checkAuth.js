import axios from 'axios';

export const getUser = async () => {
  const { data } = await axios.get('/api/check-auth');
  return data;
};
