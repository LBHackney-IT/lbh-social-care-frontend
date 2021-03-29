import { render } from '@testing-library/react';

import Breadcrumbs, { BreadcrumbProps } from './Breadcrumbs';

describe('Breadcrumbs component', () => {
  const props: BreadcrumbProps = {
    steps: [
      {
        id: 'first-step',
        title: 'First Step',
        components: [],
      },
      {
        id: 'second-step-not-show',
        title: 'Second Step',
        conditionalRender: ({ hide }: Record<string, unknown>) =>
          hide === 'false',
        components: [],
      },
      {
        id: 'third-step',
        title: 'Third Step',
        components: [],
      },
      {
        id: 'fouth-step',
        title: 'Fourt Step',
        components: [],
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
