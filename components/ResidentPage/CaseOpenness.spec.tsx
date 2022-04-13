import { render, screen } from '@testing-library/react';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedResident } from 'factories/residents';
import CaseOpennessTag from './CaseOpenness';

describe('CaseOpennessTag', () => {
  it('shows an open, active case', () => {
    render(
      <CaseOpennessTag
        resident={mockedResident}
        allocations={{
          allocations: mockedAllocations,
          totalCount: mockedAllocations.length,
        }}
      />
    );
    expect(screen.getByText('Open active case'));
  });

  it('shows an open case', () => {
    render(
      <CaseOpennessTag
        resident={{
          ...mockedResident,
          allocatedTeam: 'foo',
        }}
        allocations={{
          allocations: [],
          totalCount: mockedAllocations.length,
        }}
      />
    );
    expect(screen.getByText('Open case'));
  });

  it('shows a closed case', () => {
    render(
      <CaseOpennessTag
        resident={mockedResident}
        allocations={{
          allocations: [],
          totalCount: mockedAllocations.length,
        }}
      />
    );
    expect(screen.getByText('Closed case'));
  });
});
