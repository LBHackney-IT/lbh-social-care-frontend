import { Factory } from 'fishery';

import { ErrorAPI } from 'types';

export const errorFactory = Factory.define<ErrorAPI>(() => ({
  response: {
    data: {},
    status: 404,
    statusText: 'error',
    headers: {},
    config: {},
  },
  name: 'error',
  message: 'error',
  config: {},
  isAxiosError: false,
  toJSON: () => ({}),
}));

export const mockedAPIerror = errorFactory.build();
export const mockedAPIservererror = errorFactory.build({
  response: {
    status: 500,
  },
});
