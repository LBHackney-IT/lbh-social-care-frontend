import { getCases } from 'utils/server/cases';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCases(req.query.id);
        if (data?.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json('Cases Not Found');
        }
      } catch (error) {
        console.log(error.status);
        console.log('Cases get error:', error);
        res.status(500).json('Unable to get the Cases');
      }
      break;

    default:
      res.status(400).json('Invalid request method');
  }
};
