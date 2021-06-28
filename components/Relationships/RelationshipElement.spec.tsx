import { render } from '@testing-library/react';
import RelationshipElement from './RelationshipElement';

import {
  mockedParentRelationship,
  mockedUnbornSiblingRelationship,
  mockedOrderedRelationship,
} from 'factories/relationships';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
}));

describe('Relationships component', () => {
  it('should populate the list converting the type to display name', async () => {
    const { getByText } = render(
      <RelationshipElement {...mockedParentRelationship} />
    );

    expect(getByText('Parent')).toBeInTheDocument();
    expect(getByText('Giovanni Muciaccia')).toBeInTheDocument();
    expect(getByText('Neil GrandeArtista')).toBeInTheDocument();
  });

  it('should populate the list converting the type to display name', async () => {
    const { getByText } = render(
      <RelationshipElement {...mockedUnbornSiblingRelationship} />
    );

    expect(getByText('Unborn sibling')).toBeInTheDocument();
    expect(getByText('Jambi Neverborn')).toBeInTheDocument();
  });
  it('should populate the list in alphabetical order', async () => {
    const { queryAllByText } = render(
      <RelationshipElement {...mockedOrderedRelationship} />
    );

    const names = queryAllByText(/Muciaccia/);

    expect(names[0]).toHaveTextContent('Giovanni Muciaccia');
    expect(names[1]).toHaveTextContent('Neil Muciaccia');
  });
});
