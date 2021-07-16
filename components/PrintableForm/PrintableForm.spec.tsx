import PrintableForm from './PrintableForm';
import { render, screen } from '@testing-library/react';
import { Form } from 'data/flexibleForms/forms.types';

const mockForm = {
  name: 'Mock form name',
  steps: [
    {
      name: 'Foo step',
      fields: [
        {
          question: 'Foo question',
          required: true,
          type: 'radios',
        },
        {
          question: 'Bar question',
          type: 'checkboxes',
        },
      ],
    },
    {
      name: 'Bar step',
      fields: [],
    },
  ],
};

describe('PrintableForm', () => {
  it('renders steps and questions', () => {
    render(<PrintableForm form={mockForm as Form} />);

    expect(screen.getByText('Mock form name'));
    expect(screen.getByText('1. Foo step'));
    expect(screen.getByText('2. Bar step'));
    expect(screen.getByText('Foo question', { exact: false }));
    expect(screen.getByText('Bar question'));
    expect(screen.getAllByText('Choose all that apply').length).toBe(1);
  });

  it('properly marks required questions', () => {
    render(<PrintableForm form={mockForm as Form} />);

    expect(screen.getByText('Foo question*'));
  });

  it('adds the right prompts for single and multiple selects', () => {
    render(<PrintableForm form={mockForm as Form} />);

    expect(screen.getAllByText('Choose all that apply').length).toBe(1);
    expect(screen.getAllByText('Choose one').length).toBe(1);
  });
});
