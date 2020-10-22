import { getResident } from 'utils/api/residents';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResident(req.query.id);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json('Resident Not Found');
        }
      } catch (error) {
        console.log(error.status);
        console.log('Resident get error:', error);
        res.status(500).json('Unable to get the Resident');
      }
      break;

    default:
      res.status(400).json('Invalid request method');
  }
};
