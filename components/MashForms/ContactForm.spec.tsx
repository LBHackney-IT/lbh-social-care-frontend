import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import { submitContactDecision } from 'utils/api/mashReferrals';
import { mockedWorker } from 'factories/workers';
import ContactForm from './ContactForm';

jest.mock('utils/api/mashReferrals');

const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

describe('#ContactDecisionForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    render(
      <ContactForm
        referral={mockedMashReferral}
        workerEmail={mockedWorker.email}
      />
    );
  });

  it('should render correctly', () => {
    expect(screen.getByText('Work on contact'));
    expect(screen.getByText('Is this contact urgent?'));
    expect(screen.getByText('Submit'));
  });

  it('should dynamically render hint text for emailing a mash manager if decision is urgent', () => {
    expect(
      screen.queryByText(
        'Please email your MASH manager about the urgent case.'
      )
    ).toBeNull();

    fireEvent.click(screen.getByText('Yes'));

    expect(
      screen.getByText('Please email your MASH manager about the urgent case.')
    );
  });

  it('should disable submit button when submitContactDecision Submit button is clicked', () => {
    expect(screen.getByText('Submit')).not.toHaveAttribute('disabled');

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
  });

  it('should call submitContactDecision Submit button is clicked', () => {
    (submitContactDecision as jest.Mock).mockResolvedValue(true);

    fireEvent.click(screen.getByText('Submit'));

    expect(submitContactDecision).toBeCalledWith(
      mockedMashReferral.id,
      mockedWorker.email,
      false
    );
  });

  it('should reroute the user with a confirmation when submitContactDecision returns successfully', async () => {
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockPush).toBeCalledWith({
        pathname: '/team-assignments',
        query: {
          confirmation: `{"title":"Work on contact has been submitted for ${mockedMashReferral.mashResidents
            .map((resident) => `${resident.firstName} ${resident.lastName}`)
            .join(' and ')}","link":"${
            mockedMashReferral.referralDocumentURI
          }"}`,
          tab: 'contact',
        },
      });
    });
  });

  it('should show an error message when submitContactDecision throws an error', async () => {
    const errorMessage = 'TEST-ERROR-MESSAGE';
    const errorObject = { response: { data: errorMessage } };
    (submitContactDecision as jest.Mock).mockRejectedValue(errorObject);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage));
    });
  });

  it('should trigger router back on click of the cancel button', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockBack).toHaveBeenCalled();
  });
});
