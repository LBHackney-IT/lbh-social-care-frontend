import { render, waitFor } from '@testing-library/react';
import PersonView from './PersonView';
import { useResident } from 'utils/api/residents';

jest.mock('utils/api/residents', () => ({
  useResident: jest.fn(),
}));

describe('PersonView component', () => {
  useResident.mockImplementation(() => ({
    data: {
      dateOfBirth: '2020-11-13',
      firstName: 'Ciasom',
      lastName: 'Tesselate',
      mosaicId: '44000000',
      formName: 'Foo_bar',
      nhsNumber: '12345',
      ageContext: 'A',
      firstLanguage: 'English',
      religion: 'Christian',
      dateOfDeath: '2021-11-13',
      sexualOrientation: 'Heterosexual',
      gender: 'F',
      ethnicity: 'White',
      preferredMethodOfContact: 'email',
      addressList: [
        {
          contactAddressFlag: 'N',
          displayAddressFlag: 'N',
          addressLine1: 'old adress',
          addressLine2: null,
          addressLine3: null,
          postCode: 'E5 0PU',
        },
        {
          contactAddressFlag: 'N',
          displayAddressFlag: 'Y',
          addressLine1: 'new adress',
          addressLine2: null,
          addressLine3: null,
          postCode: 'E5 0PU',
        },
      ],
      phoneNumber: [
        {
          phoneNumber: '02123',
          phoneType: 'Home',
        },
      ],
      otherNames: [{ firstName: 'asd', laseName: 'qwe' }],
      email: 'foo@bar.com',
    },
  }));

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
