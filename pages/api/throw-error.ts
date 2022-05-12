import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async () => {
  throw new Error('ErrorThrowingPage api error');
};

export default apiHandler(endpoint);
