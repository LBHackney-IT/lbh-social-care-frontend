import { render } from '@testing-library/react';
import { AgeContext } from 'types';
import ReviewWarningNoteConfirmation from './ReviewWarningNoteConfirmation';

describe('Review Warning Note Confirmation', () => {
  const props = {
    formData: {
      person: {
        dateOfBirth: '2020-11-13',
        firstName: 'Ciasom',
        lastName: 'Tesselate',
        mosaicId: 44000000,
        nhsNumber: '12345',
        ageContext: 'A' as AgeContext,
        gender: 'F',
      },
      reviewDecision: 'Yes',
    },
  };

  it('should render the correct text if the review decision was yes', () => {
    const { asFragment, getByText } = render(
      <ReviewWarningNoteConfirmation {...props} />
    );
    expect(
      getByText('The Warning Note has been renewed for Ciasom Tesselate')
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('it should rennder the correct text if the decision was no', () => {
    const props = {
      formData: {
        person: {
          dateOfBirth: '2020-11-13',
          firstName: 'Ciasom',
          lastName: 'Tesselate',
          mosaicId: 44000000,
          nhsNumber: '12345',
          ageContext: 'A' as AgeContext,
          gender: 'F',
        },
        reviewDecision: 'No',
      },
    };

    const { asFragment, getByText } = render(
      <ReviewWarningNoteConfirmation {...props} />
    );
    expect(getByText('This Warning Note has been closed')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
