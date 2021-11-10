import { render, screen } from '@testing-library/react';
import SuccessSummary from './SuccessSummary';

describe('#SuccessSummary', () => {
  const testKey = 'test-key';
  const testValue = 'test-value';
  const testTitle = 'test-title';
  const testReferralLink = 'https://www.test-link.com/';

  const bodyTitleValue = 'test-body-value';
  const bodyLinkValue = 'test-link-value';

  const testBody = {
    [testKey]: testValue,
    title: bodyTitleValue,
    link: bodyLinkValue,
  };

  beforeEach(() => {
    render(
      <SuccessSummary
        title={testTitle}
        referralLink={testReferralLink}
        body={testBody}
      />
    );
  });

  it('should render correctly', () => {
    expect(screen.getByRole('alert'));
    expect(screen.getByText(testTitle));
    expect(screen.getByText(`${testKey} - ${testValue}`));
    expect(screen.getByText('Referral link'));

    const linkElement = screen.getByTestId('referral-link') as HTMLLinkElement;

    expect(linkElement.href).toBe(testReferralLink);
  });

  it('should remove title if inserted into body', () => {
    expect(screen.queryByText(bodyTitleValue)).toBeNull();
  });

  it('should remove link if inserted into body', () => {
    expect(screen.queryByText(bodyLinkValue)).toBeNull();
  });
});
