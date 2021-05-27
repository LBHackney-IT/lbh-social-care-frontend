import { render } from '@testing-library/react';
import Relationships from './Relationships';

import * as relationshipsAPI from 'utils/api/relationships';

import {
  mockedRelationship,
  mockedRelationshipPartialData,
  mockedRelationshipNoData,
  mockRelationshipEmptyData,
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

  it('should call the API', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationship,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const props = {
      id: 33339587,
    };
    render(<Relationships {...props} />);

    expect(relationshipsAPI.useRelationships).toHaveBeenCalledTimes(1);
    expect(mockedRelationship.personalRelationships).not.toBeNull;
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
    const { getByText } = render(<Relationships {...props} />);
    expect(getByText('Parents')).toBeInTheDocument();
    expect(getByText('Children')).toBeInTheDocument();
    expect(getByText('Other')).toBeInTheDocument();
    expect(getByText('Siblings')).toBeInTheDocument();

    expect(getByText('Giovanni Muciaccia')).toBeInTheDocument();
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
    expect(queryByText('Parents')).toBeInTheDocument();
    expect(queryByText('Children')).toBeInTheDocument();
    expect(queryByText('Other')).not.toBeInTheDocument();
    expect(queryByText('Siblings')).not.toBeInTheDocument();

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
    const { getByText, queryByText } = render(<Relationships {...props} />);
    expect(queryByText('RELATIONSHIPS')).not.toBeInTheDocument();
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
    const { getByText, queryByText } = render(<Relationships {...props} />);

    expect(queryByText('RELATIONSHIPS')).not.toBeInTheDocument();
  });
});
