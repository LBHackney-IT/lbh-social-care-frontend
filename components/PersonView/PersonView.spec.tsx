import { render, waitFor } from '@testing-library/react';
import PersonView from './PersonView';
import * as residentsAPI from 'utils/api/residents';
import { mockedResident } from 'factories/residents';

describe('PersonView component', () => {
  jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
    data: mockedResident,
    isValidating: false,
    mutate: jest.fn(),
    revalidate: jest.fn(),
  }));

  const props = {
    personId: 44000000,
    expandView: false,
  };

  it('should render properly', async () => {
    const { getByText, queryByText } = render(<PersonView {...props} />);
    await waitFor(() => {
      expect(getByText('13/11/2020')).toBeInTheDocument();
    });
    expect(queryByText('Expand view')).not.toBeInTheDocument();
  });

  it('should render person view', async () => {
    const { getByText, queryByText } = render(
      <PersonView {...props} expandView={true} />
    );
    await waitFor(() => {
      expect(getByText('Expand view')).toBeInTheDocument();
    });
    expect(queryByText('13/11/2020')).not.toBeInTheDocument();
  });

  it('should render properly with node children', async () => {
    const { findByText } = render(<PersonView {...props}>foo</PersonView>);
    const children = await findByText('foo');
    expect(children).toBeDefined();
  });

  it('should render properly with func children', async () => {
    const { findByText } = render(
      <PersonView {...props}>{(person) => `foo${person.firstName}`}</PersonView>
    );
    const children = await findByText('fooFoo');
    expect(children).toBeDefined();
  });
});
