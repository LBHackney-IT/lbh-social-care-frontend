import RemoveRelationshipDialog from './RemoveRelationshipDialog';
import { render, screen, fireEvent } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

describe('RemoveRelationshipDialog', () => {
  it('displays the name of the person as part of the title', () => {
    render(
      <RemoveRelationshipDialog
        isOpen={true}
        onDismiss={jest.fn()}
        onFormSubmit={jest.fn()}
        person={residentFactory.build({ firstName: 'Foo', lastName: 'Bar' })}
      />
    );

    expect(screen.queryByText(/Foo Bar/)).toBeInTheDocument();
  });

  it('calls onFormSubmit when button is clicked', () => {
    const onFormSubmit = jest.fn();

    render(
      <RemoveRelationshipDialog
        isOpen={true}
        onDismiss={jest.fn()}
        onFormSubmit={onFormSubmit}
        person={residentFactory.build()}
      />
    );

    fireEvent.click(screen.getByText(/Yes/));

    expect(onFormSubmit).toHaveBeenCalled();
  });

  it('calls onDismiss when "Cancel" is clicked', () => {
    const onDismiss = jest.fn();

    render(
      <RemoveRelationshipDialog
        isOpen={true}
        onDismiss={onDismiss}
        onFormSubmit={jest.fn()}
        person={residentFactory.build()}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/));

    expect(onDismiss).toHaveBeenCalled();
  });
});
