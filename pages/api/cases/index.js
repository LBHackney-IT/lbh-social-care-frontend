import { postResidentCase } from 'utils/server/residents';
import { getCases } from 'utils/server/cases';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(401).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCases(req.query);
        if (data?.cases?.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json('Cases Not Found');
        }
      } catch (error) {
        console.log('Cases get error:', error);
        error?.response?.status === 404
          ? res.status(404).json('Cases Not Found')
          : res.status(500).json('Unable to get the Cases');
      }
      break;

    case 'POST':
      try {
        const { data } = await postResidentCase(req.query.id, req.body);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      } catch (error) {
        console.log(error.status);
        console.log('Cast post error:', error);
        res.status(500).json('Unable to post cast');
      }
      break;

    default:
      res.status(400).json('Invalid request method');
      console.log(res.status);
  }
};
