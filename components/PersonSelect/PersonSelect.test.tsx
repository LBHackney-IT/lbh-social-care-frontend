import PersonSelect from './../PersonSelect/PersonSelect';
import { render, screen } from '@testing-library/react';

describe('PersonSelect', () => {
  it("correctly formats a person's details", () => {
    render(
      <PersonSelect
        name="person"
        label="Matching people"
        people={[
          {
            mosaicId: '0',
            firstName: 'foo',
            lastName: 'bar',
            dateOfBirth: '1990-04-10T00:00:00.0000000',
            addressList: [
              {
                addressLine1: 'Example address',
              },
            ],
          },
        ]}
      />
    );
    expect(screen.getByText('foo bar'));
    expect(screen.getByText('Born 10 Apr 1990 · Example address'));
    expect(screen.getAllByRole('radio').length).toBe(1);
  });

  //   TODO: handle incomplete details?

  //   TODO: Actually manage and submit state, once we have reason for that sort of thing
});
