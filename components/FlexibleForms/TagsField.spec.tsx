import TagsField from './TagsField';
import { Formik, Form } from 'formik';
import { render, screen } from '@testing-library/react';

const mockSubmit = jest.fn();

describe('TagsField', () => {
  it('renders correctly', () => {
    render(
      <Formik
        onSubmit={mockSubmit}
        initialValues={{
          foo: false,
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <TagsField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
            />
          </Form>
        )}
      </Formik>
    );
    expect(screen.getByRole('textbox'));
    expect(screen.getByLabelText('Label text'));
    expect(screen.getByText('Hint text'));
  });

  it('accepts an initial value', () => {
    render(
      <Formik
        onSubmit={mockSubmit}
        initialValues={{
          foo: 'example initial value',
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <TagsField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
            />
          </Form>
        )}
      </Formik>
    );
    expect(screen.getByDisplayValue('example initial value'));
  });

  it('renders errors', () => {
    render(
      <Formik
        onSubmit={mockSubmit}
        initialValues={{
          foo: '',
        }}
        initialErrors={{
          foo: 'Example error',
        }}
        initialTouched={{
          foo: true,
        }}
      >
        {({ touched, errors }) => (
          <TagsField
            touched={touched}
            errors={errors}
            name="foo"
            label="Label text"
            hint="Hint text"
          />
        )}
      </Formik>
    );
    expect(screen.getByText('Example error'));
  });
});
