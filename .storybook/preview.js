import { withNextRouter } from 'storybook-addon-next-router';
import '../stylesheets/all.scss';
import '../stylesheets/header.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [withNextRouter()];
