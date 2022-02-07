import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import StatusTags from './StatusTags';

describe('StatusTags', () => {
  it('shows care area', () => {
    render(<StatusTags resident={mockedResident} />);
    expect(screen.getByText('Adult social care'));
    render(
      <StatusTags
        resident={{
          ...mockedResident,
          contextFlag: 'C',
        }}
      />
    );
    expect(screen.getByText("Children's social care"));
  });

  it('shows deceased', () => {
    render(
      <StatusTags
        resident={{
          ...mockedResident,
          dateOfDeath: '2020-11-13',
        }}
      />
    );
    expect(screen.getByText('Adult social care'));
  });

  it('shows restricted', () => {
    render(
      <StatusTags
        resident={{
          ...mockedResident,
          restricted: 'Y',
        }}
      />
    );
    expect(screen.getByText('Restricted'));
  });
});
