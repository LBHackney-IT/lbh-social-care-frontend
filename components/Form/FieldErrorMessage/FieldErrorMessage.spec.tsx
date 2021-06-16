import { render } from '@testing-library/react';
import { FieldErrorMessage } from './FieldErrorMessage';

describe('<FieldErrorMessage />', () => {
  it('should render nothing if no error is provided', () => {
    const { asFragment } = render(<FieldErrorMessage error={undefined} />);

    expect(asFragment()).toMatchInlineSnapshot('<DocumentFragment />');
  });

  it('should render an unknown error if no message or type is provided on the error object', () => {
    const { getByText } = render(<FieldErrorMessage error={{}} />);

    getByText(
      'There was a problem. Please refresh the page or try again later.'
    );
  });

  it('should render the provided error message if one is given', () => {
    const { getByText } = render(
      <FieldErrorMessage
        error={{
          message: 'This is my error message',
        }}
      />
    );

    getByText('This is my error message');
  });

  it('should render a general message if the error is of type "required" and no message is provided', () => {
    const { getByText } = render(
      <FieldErrorMessage
        error={{
          type: 'required',
        }}
      />
    );

    getByText('Enter a value');
  });

  it('should render a general message with the custom action if the error is of type "required" and no message is provided', () => {
    const { getByText } = render(
      <FieldErrorMessage
        error={{
          type: 'required',
        }}
        action="Select"
      />
    );

    getByText('Select a value');
  });

  it('should render a field-specific message if the error is of type "required" and no message is provided', () => {
    const { getByText } = render(
      <FieldErrorMessage
        error={{
          type: 'required',
        }}
        label="First name"
      />
    );

    getByText('Enter a first name');
  });

  it('should render a field-specific message with "an" if the label starts with a vowel, if the error is of type "required" and no message is provided', () => {
    const { getByText } = render(
      <FieldErrorMessage
        error={{
          type: 'required',
        }}
        label="Age"
      />
    );

    getByText('Enter an age');
  });

  it('should not render "a" if the error is not singular', () => {
    const { getByText } = render(
      <FieldErrorMessage
        error={{
          type: 'required',
        }}
        label="Further details on this issue"
        isSingular={false}
      />
    );

    getByText('Enter further details on this issue');
  });
});
