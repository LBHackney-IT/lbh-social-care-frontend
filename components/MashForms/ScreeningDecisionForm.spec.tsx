import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import ScreeningDecisionForm from './ScreeningDecisionForm';
import { submitScreeningDecision } from 'utils/api/mashReferrals';
import { mockedWorker } from 'factories/workers';

jest.mock('utils/api/mashReferrals');

const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

describe('#ScreeningDecisionForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    render(
      <ScreeningDecisionForm
        referral={mockedMashReferral}
        workerEmail={mockedWorker.email}
      />
    );
  });

  it('should render correctly', () => {
    expect(screen.getByText('Make screening decision')).toBeVisible();
    expect(screen.getByText('Document the decision')).toBeVisible();
    expect(screen.getByText('Select screening decision')).toBeVisible();
    expect(screen.getByText('Is this contact urgent?')).toBeVisible();
    expect(screen.getByText('Submit')).toBeVisible();
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
    ).toBeVisible();
  });

  it('should disable submit button when submitScreeningDecision Submit button is clicked', () => {
    expect(screen.getByText('Submit')).not.toHaveAttribute('disabled');

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
  });

  it('should call submitScreeningDecision when Submit button is clicked', () => {
    (submitScreeningDecision as jest.Mock).mockResolvedValue(true);

    fireEvent.click(screen.getByText('Submit'));

    expect(submitScreeningDecision).toBeCalledWith(
      mockedMashReferral.id,
      mockedWorker.email,
      'NFA',
      false
    );
  });

  it('should call submitScreeningDecision with urgency when Submit button is clicked', async () => {
    (submitScreeningDecision as jest.Mock).mockResolvedValue(true);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Yes'));
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Submit'));
    });

    expect(submitScreeningDecision).toBeCalledWith(
      mockedMashReferral.id,
      mockedWorker.email,
      'NFA',
      true
    );
  });

  it('should reroute the user with a confirmation when submitScreeningDecision returns successfully', async () => {
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
          tab: 'screening-decision',
        },
      });
    });
  });

  it('should show an error message when submitScreeningDecision throws an error', async () => {
    const errorMessage = 'TEST-ERROR-MESSAGE';
    const errorObject = { response: { data: errorMessage } };
    (submitScreeningDecision as jest.Mock).mockRejectedValue(errorObject);

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
