import { getResident } from 'utils/server/residents';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResident(req.query.id);
        res.status(200).json(data);
      } catch (error) {
        console.log('Resident get error:', error);
        error?.response?.status === 404
          ? res.status(404).json('Resident Not Found')
          : res.status(500).json('Unable to get the Resident');
      }
      break;

    default:
      res.status(400).json('Invalid request method');
  }
};
