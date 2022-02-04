import RemoveRelationshipDialog from './RemoveRelationshipDialog';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockedExistingRelationship } from 'factories/relationships';

describe('RemoveRelationshipDialog', () => {
  it('displays the name of the person as part of the title', () => {
    render(
      <RemoveRelationshipDialog
        isOpen={true}
        onDismiss={jest.fn()}
        onFormSubmit={jest.fn()}
        person={mockedExistingRelationship.build({
          firstName: 'Foo',
          lastName: 'Bar',
        })}
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
        person={mockedExistingRelationship.build()}
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
        person={mockedExistingRelationship.build()}
      />
    );

    fireEvent.click(screen.getByText(/No, do nothing/));

    expect(onDismiss).toHaveBeenCalled();
  });
});
