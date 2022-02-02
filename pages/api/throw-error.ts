import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { apiHandler } from 'lib/apiHandler';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  throw new Error('ErrorThrowingPage api error');
};

export default apiHandler(endpoint);
