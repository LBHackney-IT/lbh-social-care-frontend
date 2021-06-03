import { render, fireEvent } from '@testing-library/react';

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

  describe('isSummaryCollapsable', () => {
    const localProps = {
      formData: {
        foo: '123',
      },
      formPath: '/form/foo/',
      formSteps: [
        {
          id: 'first-step',
          title: 'First Step',
          components: [
            {
              component: 'TextInput',
              label: 'I am foo component',
              name: 'foo',
            },
          ],
        },
      ],
    };

    it('should render properly - with isSummaryCollapsable', () => {
      const { asFragment, getByText, queryByText } = render(
        <Summary {...localProps} isSummaryCollapsable />
      );
      expect(asFragment()).toMatchSnapshot();
      expect(getByText('Collapse all')).toBeInTheDocument();
      expect(queryByText('I am foo component')).toBeInTheDocument();

      fireEvent.click(getByText('Collapse view'));
      expect(queryByText('Collapse all')).not.toBeInTheDocument();
      expect(queryByText('Expand all')).toBeInTheDocument();

      fireEvent.click(getByText('Expand all'));
      expect(queryByText('Collapse all')).toBeInTheDocument();
      expect(queryByText('Expand all')).not.toBeInTheDocument();
      expect(queryByText('I am foo component')).toBeInTheDocument();
    });

    it('should render properly - with No isSummaryCollapsable', () => {
      const { asFragment } = render(<Summary {...localProps} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render any additional metadata provided', () => {
    const { getByText } = render(
      <Summary
        formData={{
          foo: '123',
        }}
        formPath="/form/foo/"
        formSteps={[
          {
            id: 'first-step',
            title: 'First Step',
            components: [
              {
                component: 'TextInput',
                label: 'I am foo component',
                name: 'foo',
              },
            ],
          },
        ]}
        additionalMetadata={[
          {
            key: 'title-of-row',
            title: 'Title of row',
            value: 'Value of row',
          },
        ]}
      />
    );

    getByText('Title of row');
    getByText('Value of row');
  });
});
