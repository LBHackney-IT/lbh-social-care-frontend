import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingDialog from './index';

describe('OnboardingDialog component', () => {
  it("displays the onboarding dialog if user hasn't already seen it", () => {
    global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    render(<OnboardingDialog />);

    expect(
      screen.queryByText(
        "Good news! You're part of the brand new workflow pilot."
      )
    ).toBeVisible();
  });

  it("doesn't display the onboarding dialog if user has already seen it", () => {
    global.Storage.prototype.getItem = jest.fn().mockReturnValue('');

    render(<OnboardingDialog />);

    expect(
      screen.queryByText(
        "Good news! You're part of the brand new workflow pilot."
      )
    ).not.toBeInTheDocument();
  });

  it("saves that the user has seen the dialog if they've clicked okay", () => {
    global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    const setItem = jest.fn();
    global.Storage.prototype.setItem = setItem;

    render(<OnboardingDialog />);

    fireEvent.click(screen.getByText('Okay, show me'));

    expect(setItem).toHaveBeenCalledWith('seen-workflows-pilot-onboarding', '');
  });

  it("hides the dialog after they've clicked okay", () => {
    global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    render(<OnboardingDialog />);

    fireEvent.click(screen.getByText('Okay, show me'));

    expect(
      screen.queryByText(
        "Good news! You're part of the brand new workflow pilot."
      )
    ).not.toBeInTheDocument();
  });

  it("saves that the user has seen the dialog if they've clicked dismiss", () => {
    global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    const setItem = jest.fn();
    global.Storage.prototype.setItem = setItem;

    render(<OnboardingDialog />);

    fireEvent.click(screen.getByText('Got it, dismiss'));

    expect(setItem).toHaveBeenCalledWith('seen-workflows-pilot-onboarding', '');
  });

  it("hides the dialog after they've clicked dismiss", () => {
    global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    render(<OnboardingDialog />);

    fireEvent.click(screen.getByText('Got it, dismiss'));

    expect(
      screen.queryByText(
        "Good news! You're part of the brand new workflow pilot."
      )
    ).not.toBeInTheDocument();
  });
});
