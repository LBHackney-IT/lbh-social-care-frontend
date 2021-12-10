import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import InitialDecisionForm from './InitialDecisionForm';
import { submitInitialDecision } from 'utils/api/mashReferrals';
import { mockedWorker } from 'factories/workers';

jest.mock('utils/api/mashReferrals');

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('#InitialDecisionForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    render(
      <InitialDecisionForm
        referral={mockedMashReferral}
        workerEmail={mockedWorker.email}
      />
    );
  });

  it('should render correctly', () => {
    expect(screen.getByText('Document the decision'));

    expect(screen.getByText('Make initial decision'));
    expect(screen.getByText('Select referral category'));
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

  it('should disable submit button when submitInitialDecision Submit button is clicked', () => {
    expect(screen.getByText('Submit')).not.toHaveAttribute('disabled');

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
  });

  it('should call submitInitialDecision Submit button is clicked', () => {
    (submitInitialDecision as jest.Mock).mockResolvedValue(true);

    fireEvent.click(screen.getByText('Submit'));

    expect(submitInitialDecision).toBeCalledWith(
      mockedMashReferral.id,
      mockedWorker.email,
      'CSC Screening required in MASH',
      'Abuse linked to faith or belief',
      false
    );
  });

  it('should reroute the user with a confirmation when submitInitialDecision returns successfully', async () => {
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockPush).toBeCalledWith({
        pathname: '/team-assignments',
        query: {
          confirmation: `{"title":"A decision has been submitted for ${mockedMashReferral.mashResidents
            .map((resident) => `${resident.firstName} ${resident.lastName}`)
            .join(' and ')}","link":"${
            mockedMashReferral.referralDocumentURI
          }"}`,
          tab: 'initial-decision',
        },
      });
    });
  });

  it('should show an error message when submitInitialDecision throws an error', async () => {
    const errorMessage = 'TEST-ERROR-MESSAGE';
    const errorObject = { response: { data: errorMessage } };
    (submitInitialDecision as jest.Mock).mockRejectedValue(errorObject);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage));
    });
  });
});
