import FlexibleFields from './FlexibleFields';
import { Formik } from 'formik';
import { render, screen } from '@testing-library/react';

const mockSubmit = jest.fn();

describe('TextField', () => {
  it('returns a normal field', () => {
    render(
      <Formik onSubmit={mockSubmit} initialValues={{}}>
        <FlexibleFields
          field={{ id: 'foo', question: '', type: 'text' }}
          values={{}}
          touched={{}}
          errors={{}}
        />
      </Formik>
    );

    expect(screen.getByRole('textbox'));
  });

  it('shows conditional fields when the condition is met', () => {
    render(
      <Formik onSubmit={mockSubmit} initialValues={{}}>
        <FlexibleFields
          field={{
            id: 'foo',
            question: 'foo',
            type: 'text',
            condition: {
              id: 'bar',
              value: 'yes',
            },
          }}
          values={{ bar: 'yes' }}
          touched={{}}
          errors={{}}
        />
      </Formik>
    );

    expect(screen.getByRole('textbox'));
  });

  it('hides conditional fields when the condition is not met', () => {
    render(
      <Formik onSubmit={mockSubmit} initialValues={{}}>
        <FlexibleFields
          field={{
            id: 'foo',
            question: 'foo',
            type: 'text',
            condition: {
              id: 'bar',
              value: 'yes',
            },
          }}
          values={{ bar: '' }}
          touched={{}}
          errors={{}}
        />
      </Formik>
    );

    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('renders nothing for an unsupported field type', () => {
    render(
      <Formik onSubmit={mockSubmit} initialValues={{}}>
        <FlexibleFields
          field={{
            id: 'foo',
            type: 'whatever' as never,
            question: 'foo',
          }}
          values={{}}
          touched={{}}
          errors={{}}
        />
      </Formik>
    );
    expect(screen.queryByText('Test label')).toBeNull();
  });
});
