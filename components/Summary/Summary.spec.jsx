import { render } from '@testing-library/react';

import Summary from './Summary';

describe('Summary component', () => {
  const objectComponents = [
    {
      component: 'TextInput',
      name: 'first',
    },
    {
      component: 'TextInput',
      name: 'second',
    },
    {
      component: 'TextInput',
      name: 'third',
    },
  ];
  const props = {
    formData: {
      foo: '123',
      bar: 'asd',
      asd: '',
      qwe: 'yo',
      foobar: 'asd',
      oo: { first: 'first', second: 'second', third: 'third' },
      oi: { first: 'first', second: 'second', third: 'third' },
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
      {
        id: 'object-step',
        title: 'Object Step',
        components: [
          {
            component: 'ObjectInput',
            label: 'I am object component',
            name: 'oo',
            components: objectComponents,
          },
          {
            component: 'ObjectInput',
            label: 'I am object component inline',
            name: 'oi',
            summaryInline: true,
            components: objectComponents,
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
