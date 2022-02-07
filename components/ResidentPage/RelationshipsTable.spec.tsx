import { fireEvent, render, screen } from '@testing-library/react';
import {
  mockedExistingRelationship,
  mockedRelationshipData,
  mockedRelationshipFactory,
} from 'factories/relationships';
import RelationshipsTable from './RelationshipsTable';
import 'next/router';

jest.mock('next/router', () => ({
  useRouter: () => ({
    reload: jest.fn(),
  }),
}));

const mockRelationships = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [
    mockedRelationshipData.build({
      type: 'parent',
      relationships: [
        mockedExistingRelationship.build({
          firstName: 'Giovanni',
          lastName: 'Muciaccia',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'child',
      relationships: [
        mockedExistingRelationship.build({
          firstName: 'Giuseppe',
          lastName: 'Geppetto',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'unbornSibling',
      relationships: [
        mockedExistingRelationship.build({
          firstName: 'Jambi',
          lastName: 'Neverborn',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'siblingOfUnbornChild',
      relationships: [
        mockedExistingRelationship.build({
          firstName: 'Cento',
          lastName: 'Neverborn',
        }),
      ],
    }),
  ],
});

describe('RelationshipsTable', () => {
  it('lists relationships', () => {
    render(<RelationshipsTable relationships={mockRelationships} />);
    expect(screen.getAllByRole('list').length).toBe(4);
    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('link').length).toBe(4);
  });

  it('lists pretty relationship tyeps', () => {
    render(<RelationshipsTable relationships={mockRelationships} />);
    expect(screen.getByText('Parent(s)'));
    expect(screen.getByText('Children'));
    expect(screen.getByText('Unborn sibling(s)'));
  });

  it('can remove relationships', () => {
    render(<RelationshipsTable relationships={mockRelationships} />);
    fireEvent.click(screen.getAllByText('Remove')[0]);
    expect(screen.getByText('You are about to remove Giovanni Muciaccia'));
  });
});
