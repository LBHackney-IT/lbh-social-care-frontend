import { render, waitFor } from '@testing-library/react';
import PersonView from './PersonView';
import * as residentsAPI from 'utils/api/residents';

describe('PersonView component', () => {
  jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
    data: {
      dateOfBirth: '2020-11-13',
      firstName: 'Ciasom',
      lastName: 'Tesselate',
      mosaicId: 44000000,
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
      uprn: '',
      restricted: false,
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
    const children = await findByText('fooCiasom');
    expect(children).toBeDefined();
  });
});
