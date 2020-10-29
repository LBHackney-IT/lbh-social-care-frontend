import axios from 'axios';

export default async (req, res) => {
  const {
    query: { postcode },
  } = req;
  try {
    const { data } = await axios.get(
      `${process.env.POSTCODE_LOOKUP_URL}${postcode}`,
      {
        headers: {
          'x-api-key': process.env.POSTCODE_LOOKUP_APIKEY,
        },
      }
    );
    res.statusCode = data.statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data.data));
  } catch (e) {
    res.statusCode = 500;
    res.end(e.message);
  }
};
