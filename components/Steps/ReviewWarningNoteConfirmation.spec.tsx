import { render } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import ReviewWarningNoteConfirmation from './ReviewWarningNoteConfirmation';

describe('Review Warning Note Confirmation', () => {
  const props = {
    formData: {
      person: mockedResident,
      reviewDecision: 'Yes',
    },
  };

  it('should render the correct text if the review decision was yes', () => {
    const { asFragment, getByText } = render(
      <ReviewWarningNoteConfirmation {...props} />
    );
    expect(
      getByText('The Warning Note has been renewed for Foo Bar')
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('it should render the correct text if the decision was no', () => {
    const props = {
      formData: {
        person: mockedResident,
        reviewDecision: 'No',
      },
    };

    const { asFragment, getByText } = render(
      <ReviewWarningNoteConfirmation {...props} />
    );
    expect(
      getByText('This Warning Note has been closed for Foo Bar')
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
