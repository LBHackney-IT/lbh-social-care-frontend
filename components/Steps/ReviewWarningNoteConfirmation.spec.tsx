import { fireEvent, render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import ReviewWarningNoteConfirmation from './ReviewWarningNoteConfirmation';
import Router from 'next/router';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

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

  it('it should redirect to the resident view on confirm', () => {
    const props = {
      formData: {
        person: mockedResident,
        reviewDecision: 'No',
      },
    };

    const { asFragment, getByText } = render(
      <ReviewWarningNoteConfirmation {...props} />
    );

    fireEvent.click(screen.getByText('View person'));

    expect(Router.push).toHaveBeenCalledWith('/residents/1');
  });
});
