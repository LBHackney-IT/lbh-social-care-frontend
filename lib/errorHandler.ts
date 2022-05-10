import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import type { NextApiResponse } from 'next';

export const handleAxiosError = (
  res: NextApiResponse,
  error: AxiosError,
  objectName: string
) => {
  error.response?.status === StatusCodes.NOT_FOUND
    ? res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `${objectName} Not Found` })
    : res.status(error.response?.status || 500).json(error?.response?.data);

  return res;
};
