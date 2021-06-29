import { render, RenderResult, screen } from '@testing-library/react';

import { residentFactory } from '../../../factories/residents';
import { AuthProvider } from '../../UserContext/UserContext';
import PersonView from '../../PersonView/PersonView';
import { userFactory } from '../../../factories/users';
import { createMockedPersonView } from '../../../test/helpers';

import * as casesAPI from 'utils/api/cases';
import { PersonDetailsPage } from './PersonDetailsPage';
import * as warningNotes from '../../../utils/api/warningNotes';
import { mockedWarningNote } from '../../../factories/warningNotes';

jest.mock('../../PersonView/PersonView');
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: { foo: 'bar' },
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));

const mockedAdultsUser = userFactory.build({
  hasAdminPermissions: false,
  hasUnrestrictedPermissions: false,
  hasChildrenPermissions: false,
  hasAdultPermissions: true,
});

const mockedAdultsResident = residentFactory.build({
  contextFlag: 'A',
});

const mockedChildrensUser = userFactory.build({
  hasAdminPermissions: false,
  hasUnrestrictedPermissions: false,
  hasChildrenPermissions: true,
  hasAdultPermissions: false,
});

const mockedChildrensResident = residentFactory.build({
  contextFlag: 'C',
});

describe('<PersonDetailsPage />', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    jest.spyOn(casesAPI, 'useCasesByResident').mockImplementation(() => ({
      size: 0,
      setSize: jest.fn(),
      data: [],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    jest.spyOn(warningNotes, 'useWarningNotes').mockImplementation(() => ({
      data: mockedWarningNote,
      mutate: jest.fn(),
      revalidate: jest.fn(),
      isValidating: false,
    }));
  });

  describe('for all users', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedAdultsResident)
      );
      renderResult = render(
        <AuthProvider user={mockedAdultsUser}>
          <PersonDetailsPage personId={100} />
        </AuthProvider>
      );
    });

    it('should render the details for the person', () => {
      expect(renderResult.asFragment()).toMatchSnapshot();
    });
  });

  describe('as an adults user', () => {
    it('should show any active warning notes for the person if the person is an adult', () => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedAdultsResident)
      );

      render(
        <AuthProvider user={mockedAdultsUser}>
          <PersonDetailsPage personId={100} />
        </AuthProvider>
      );

      screen.getByText('WARNING NOTE');
    });

    it('should show any active warning notes for the person if the person is a child', () => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedChildrensResident)
      );

      render(
        <AuthProvider user={mockedAdultsUser}>
          <PersonDetailsPage personId={100} />
        </AuthProvider>
      );

      screen.getByText('WARNING NOTE');
    });

    it('should show a restricted banner for a childrens person', () => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedChildrensResident)
      );

      render(
        <AuthProvider user={mockedAdultsUser}>
          <PersonDetailsPage personId={100} />
        </AuthProvider>
      );

      screen.getByText(
        'Some details for this person are restricted due to your permissions.'
      );
    });
  });

  describe('as a childrens user', () => {
    it('should show any active warning notes for the person if the person is a child', () => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedChildrensResident)
      );

      render(
        <AuthProvider user={mockedChildrensUser}>
          <PersonDetailsPage personId={100} />
        </AuthProvider>
      );

      screen.getByText('WARNING NOTE');
    });

    it('should show any active warning notes for the person if the person is an adult', () => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedAdultsResident)
      );

      render(
        <AuthProvider user={mockedChildrensUser}>
          <PersonDetailsPage personId={100} />
        </AuthProvider>
      );

      screen.getByText('WARNING NOTE');
    });

    it('should show a restricted banner for an adult person', () => {
      (PersonView as jest.Mock).mockImplementationOnce(
        createMockedPersonView(mockedAdultsResident)
      );

      render(
        <AuthProvider user={mockedChildrensUser}>
          <PersonDetailsPage personId={100} />
        </AuthProvider>
      );

      screen.getByText(
        'Some details for this person are restricted due to your permissions.'
      );
    });
  });
});
