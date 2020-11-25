import { render } from '@testing-library/react';

import Breadcrumbs from './Breadcrumbs';

describe('Breadcrumbs component', () => {
  const props = {
    steps: [
      {
        id: 'first-step',
        title: 'First Step',
      },
      {
        id: 'second-step-not-show',
        title: 'Second Step',
        conditionalRender: ({ hide }) => hide === 'false',
      },
      {
        id: 'third-step',
        title: 'Third Step',
      },
      {
        id: 'fouth-step',
        title: 'Fourt Step',
      },
    ],
    path: '/foo/',
    currentStepIndex: 2,
    data: { hide: true },
  };
  it('should render properly', () => {
    const { asFragment } = render(<Breadcrumbs {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
