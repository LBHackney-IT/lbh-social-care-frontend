import { AxiosError } from 'axios';

export const isAxiosError = (error: unknown): boolean => {
  return (error as AxiosError).isAxiosError;
};
