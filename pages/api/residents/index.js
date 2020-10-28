import { getResidents } from 'utils/server/residents';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(401).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResidents(req.query);
        if (data?.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json('Residents Not Found');
        }
      } catch (error) {
        console.log('Residents get error:', error);
        error?.response?.status === 404
          ? res.status(404).json('Residents Not Found')
          : res.status(500).json('Unable to get the Residents');
      }
      break;

    default:
      res.status(400).json('Invalid request method');
  }
};
