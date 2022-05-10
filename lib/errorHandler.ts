import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import type { NextApiResponse } from 'next';

export const handleAxiosError = (
  res: NextApiResponse,
  error: AxiosError,
  objectName: string
) => {
  switch (error.response?.status) {
    case StatusCodes.NOT_FOUND:
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `${objectName} Not Found` });
      break;
    case StatusCodes.INTERNAL_SERVER_ERROR:
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: Unable to get ${objectName}`,
      });
      break;
    default:
      res.status(error.response?.status || 500).json(error?.response?.data);
      break;
  }
  return res;
};
