import { getResidentCases, postResidentCase } from 'utils/server/residents';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(401).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResidentCases(req.query.id);
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
    case 'POST':
      try {
        const data = await postResidentCase(req.query.id, req.body);
        if (data?.length > 0) {
          res.status(201).json(data);
        } else {
          res.status(404).json('Endpoint not found');
        }
      } catch (error) {
        console.log(error.status);
        console.log('Cast post error:', error);
        res.status(500).json('Unable to post cast');
      }
      break;

    default:
      res.status(400).json('Invalid request method');
  }
};
