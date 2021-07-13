import { render } from '@testing-library/react';
import Relationships from './Relationships';

import * as relationshipsAPI from 'utils/api/relationships';

import {
  mockedRelationship,
  mockedRelationshipPartialData,
  mockedRelationshipNoData,
  mockRelationshipEmptyData,
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

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe('Relationships component', () => {
  it('should display properly', () => {
    const props = {
      id: 33339587,
    };

    const { getByText } = render(<Relationships {...props} />);

    expect(getByText('MockedSpinner')).toBeInTheDocument();
  });

  it('should populate the list', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationship,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const props = {
      id: 33339587,
    };

    const { queryByText } = render(<Relationships {...props} />);

    expect(queryByText('Parent(s)')).toBeInTheDocument();
    expect(queryByText('Children')).toBeInTheDocument();
    expect(queryByText('Other')).toBeInTheDocument();
    expect(queryByText('Sibling(s)')).toBeInTheDocument();
    expect(queryByText('Unborn sibling(s)')).toBeInTheDocument();
    expect(queryByText('Sibling of unborn child')).toBeInTheDocument();

    expect(queryByText('Giovanni Muciaccia')).toBeInTheDocument();
    expect(queryByText('Jambi Neverborn')).toBeInTheDocument();
    expect(queryByText('Cento Neverborn')).toBeInTheDocument();
  });

  it('should populate partially the list', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipPartialData,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const props = {
      id: 33339587,
    };

    const { getByText, queryByText } = render(<Relationships {...props} />);

    expect(queryByText('Parent(s)')).toBeInTheDocument();
    expect(queryByText('Children')).toBeInTheDocument();
    expect(queryByText('Other')).not.toBeInTheDocument();
    expect(queryByText('Sibling(s)')).not.toBeInTheDocument();
    expect(queryByText('Sibling of unborn child')).not.toBeInTheDocument();

    expect(getByText('Mastro Geppetto')).toBeInTheDocument();
    expect(getByText('Pinocchio Geppetto')).toBeInTheDocument();
  });

  it('should render with no data', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipNoData,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const props = {
      id: 33339587,
    };

    const { queryByText } = render(<Relationships {...props} />);

    expect(queryByText('No relationship found')).toBeInTheDocument();
  });

  it('should return an error if malformed data', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockRelationshipEmptyData,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const props = {
      id: 33339587,
    };

    const { queryByText } = render(<Relationships {...props} />);

    expect(queryByText('No relationship found')).toBeInTheDocument();
  });

  it('should populate the list converting the type to display name', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: 33339587,
        personalRelationships: [mockedParentRelationship],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const props = {
      id: 33339587,
    };

    const { queryByText } = render(<Relationships {...props} />);

    expect(queryByText('Parent(s)')).toBeInTheDocument();
    expect(queryByText('Giovanni Muciaccia')).toBeInTheDocument();
    expect(queryByText('Neil GrandeArtista')).toBeInTheDocument();
  });

  it('should populate the list converting the type to display name', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: 33339587,
        personalRelationships: [mockedUnbornSiblingRelationship],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const props = {
      id: 33339587,
    };

    const { queryByText } = render(<Relationships {...props} />);

    expect(queryByText('Unborn sibling(s)')).toBeInTheDocument();
    expect(queryByText('Jambi Neverborn')).toBeInTheDocument();
  });

  it('should populate the list in alphabetical order (by surname/name) with same surname', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: 33339587,
        personalRelationships: [mockedOrderedRelationship],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const props = {
      id: 33339587,
    };

    const { queryAllByText } = render(<Relationships {...props} />);

    const names = queryAllByText(/Muciaccia/);

    expect(names[0]).toHaveTextContent('Giovanni Muciaccia');
    expect(names[1]).toHaveTextContent('Neil Muciaccia');
  });

  it('should populate the list in alphabetical order (by surname/name) different people', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: 33339587,
        personalRelationships: [mockedOrderedRelationship],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const props = {
      id: 33339587,
    };

    const { queryByTestId } = render(<Relationships {...props} />);

    const first = queryByTestId('related-person-name-0');
    const second = queryByTestId('related-person-name-1');
    const third = queryByTestId('related-person-name-2');
    const fourth = queryByTestId('related-person-name-3');

    expect(first).toHaveTextContent('Michele Giuppone');
    expect(second).toHaveTextContent('Giovanni Muciaccia');
    expect(third).toHaveTextContent('Neil Muciaccia');
    expect(fourth).toHaveTextContent('Francesco Rostrini');
  });
});
