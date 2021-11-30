import RemoveSubmissionDialog from './RemoveSubmissionDialog';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockedResident } from 'factories/residents';

describe('RemoveSubmissionDialog', () => {
  it('displays the name of the person as part of the title', () => {
    render(
      <RemoveSubmissionDialog
        isOpen={true}
        onDismiss={jest.fn()}
        onFormSubmit={jest.fn()}
        person={mockedResident}
      />
    );

    expect(screen.queryByText(/Foo Bar/)).toBeInTheDocument();
  });

  it('calls onDismiss when "Cancel" is clicked', () => {
    const onDismiss = jest.fn();

    render(
      <RemoveSubmissionDialog
        isOpen={true}
        onDismiss={onDismiss}
        onFormSubmit={jest.fn()}
        person={mockedResident}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/));

    expect(onDismiss).toHaveBeenCalled();
  });
});
