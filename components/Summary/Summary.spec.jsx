import { render } from '@testing-library/react';

import Summary from './Summary';

describe('Summary component', () => {
  const props = {
    formData: {
      foo: '123',
      bar: 'asd',
      asd: '',
      qwe: 'yo',
      foobar: 'asd',
    },
    formPath: '/form/foo/',
    formSteps: [
      {
        id: 'first-step',
        title: 'First Step',
        components: [
          { component: 'TextInput', label: 'I am foo component', name: 'foo' },
          { component: 'TextInput', label: 'I am bar component', name: 'bar' },
          { component: 'TextInput', label: 'I am asd component', name: 'asd' },
        ],
      },
      {
        id: 'second-step',
        title: 'Second Step',
        components: [
          {
            component: 'TextInput',
            label: 'I am foobar component',
            name: 'foobar',
          },
        ],
      },
    ],
    onFormSubmit: jest.fn(),
  };

  it('should render properly', () => {
    const { asFragment } = render(<Summary {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
