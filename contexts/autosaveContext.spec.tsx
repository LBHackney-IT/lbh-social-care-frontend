import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Formik, Form, Field } from 'formik';
import AutosaveContext, {
  AutosaveProvider,
  AutosaveTrigger,
  AutosaveIndicator,
} from './autosaveContext';

describe('AutosaveProvider', () => {
  it('returns children', () => {
    render(<AutosaveProvider>Test</AutosaveProvider>);
    expect(screen.getByText('Test'));
  });
});

describe('AutosaveIndicator', () => {
  it('correctly shows when changes are saved', () => {
    render(
      <AutosaveContext.Provider value={{ saved: true, saving: false }}>
        <AutosaveIndicator />
      </AutosaveContext.Provider>
    );
    expect(screen.getByText('Changes saved'));
  });

  it('correctly shows when saving is in progress', () => {
    render(
      <AutosaveContext.Provider value={{ saved: false, saving: true }}>
        <AutosaveIndicator />
      </AutosaveContext.Provider>
    );
    expect(screen.getByText('Saving changes...'));
  });

  it('correctly shows when there are unsaved changes', () => {
    render(
      <AutosaveContext.Provider value={{ saved: false, saving: false }}>
        <AutosaveIndicator />
      </AutosaveContext.Provider>
    );
    expect(screen.getByText('Unsaved changes'));
  });
});

describe('AutosaveTrigger', () => {
  const mockSubmit = jest.fn();

  it('submits changes after a delay', async () => {
    jest.useFakeTimers();

    render(
      <AutosaveProvider>
        <Formik
          initialValues={{
            foo: '',
          }}
          onSubmit={mockSubmit}
        >
          <Form>
            <label htmlFor="foo">Foo</label>
            <Field name="foo" id="foo" />
            <AutosaveTrigger />
          </Form>
        </Formik>
      </AutosaveProvider>
    );

    expect(mockSubmit).toHaveBeenCalledTimes(0);

    fireEvent.change(screen.getByLabelText('Foo'), {
      target: { value: 'test value' },
    });

    jest.runAllTimers();

    await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
  });

  it('submits the latest values', () => {
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {
        foo: 'test value',
      },
      expect.anything()
    );
  });
});
