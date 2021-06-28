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
  it('should populate the list in alphabetical order (by surname/name) with same surname', async () => {
    const { queryAllByText } = render(
      <RelationshipElement {...mockedOrderedRelationship} />
    );

    const names = queryAllByText(/Muciaccia/);

    expect(names[0]).toHaveTextContent('Giovanni Muciaccia');
    expect(names[1]).toHaveTextContent('Neil Muciaccia');
  });

  it('should populate the list in alphabetical order (by surname/name) different people', async () => {
    const { queryByLabelText } = render(
      <RelationshipElement {...mockedOrderedRelationship} />
    );

    const first = queryByLabelText('rel_0');
    const second = queryByLabelText('rel_1');
    const third = queryByLabelText('rel_2');
    const fourth = queryByLabelText('rel_3');

    expect(first).toHaveTextContent('Michele Giuppone');
    expect(second).toHaveTextContent('Giovanni Muciaccia');
    expect(third).toHaveTextContent('Neil Muciaccia');
    expect(fourth).toHaveTextContent('Francesco Rostrini');
  });
});
