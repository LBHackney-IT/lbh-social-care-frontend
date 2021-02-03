import { render, waitFor } from '@testing-library/react';
import PersonView from './PersonView';
import { getResident } from 'utils/api/residents';

jest.mock('utils/api/residents', () => ({
  getResident: jest.fn(),
}));

describe('PersonView component', () => {
  getResident.mockImplementation(() =>
    Promise.resolve({
      dateOfBirth: '2020-11-13',
      firstName: 'Ciasom',
      lastName: 'Tesselate',
      mosaicId: '44000000',
      formName: 'Foo_bar',
      nhsNumber: '12345',
    })
  );

  const props = {
    personId: '44000000',
    expandView: false,
  };

  it('should render properly', async () => {
    const { getByText, queryByText } = render(<PersonView {...props} />);
    await waitFor(() => {
      expect(getByText('11/13/2020')).toBeInTheDocument();
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
    expect(queryByText('11/13/2020')).not.toBeInTheDocument();
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
    const children = await findByText('fooCiasom');
    expect(children).toBeDefined();
  });
});
