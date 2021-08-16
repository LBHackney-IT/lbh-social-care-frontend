import PrintableForm from './PrintableForm';
import { render, screen } from '@testing-library/react';
import { Form } from 'data/flexibleForms/forms.types';

const mockForm: Form = {
  isViewableByAdults: true,
  isViewableByChildrens: true,
  id: '1',
  name: 'Mock form name',
  steps: [
    {
      id: '1',
      name: 'Foo step',
      theme: '',
      fields: [
        {
          id: '1',
          question: 'Foo question',
          required: true,
          type: 'radios',
        },
        {
          id: '2',
          question: 'Bar question',
          type: 'checkboxes',
        },
      ],
    },
    {
      id: '2',
      name: 'Bar step',
      theme: '',
      fields: [],
    },
  ],
};

describe('PrintableForm', () => {
  it('renders steps and questions', () => {
    render(<PrintableForm form={mockForm} />);

    expect(screen.getByText('Mock form name'));
    expect(screen.getByText('1. Foo step'));
    expect(screen.getByText('2. Bar step'));
    expect(screen.getByText('Foo question', { exact: false }));
    expect(screen.getByText('Bar question'));
    expect(screen.getAllByText('Choose all that apply').length).toBe(1);
  });

  it('properly marks required questions', () => {
    render(<PrintableForm form={mockForm} />);

    expect(screen.getByText('Foo question*'));
  });

  it('adds the right prompts for single and multiple selects', () => {
    render(<PrintableForm form={mockForm} />);

    expect(screen.getAllByText('Choose all that apply').length).toBe(1);
    expect(screen.getAllByText('Choose one').length).toBe(1);
  });
});
