import PersonSelect from './PersonSelect';
import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';

describe('PersonSelect', () => {
  it("correctly formats a person's details", () => {
    render(
      <PersonSelect
        name="person"
        label="Matching people"
        people={[mockedResident]}
      />
    );
    expect(screen.getByText('foo bar'));
    expect(screen.getByText('Born 13 Nov 2020 · Example address'));
    expect(screen.getAllByRole('radio').length).toBe(1);
  });

  //   TODO: handle incomplete details?

  //   TODO: Actually manage and submit state, once we have reason for that sort of thing
});
