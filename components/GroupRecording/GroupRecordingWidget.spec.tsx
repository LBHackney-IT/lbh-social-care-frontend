import GroupRecordingWidget from './GroupRecordingWidget';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockedResident, residentFactory } from 'factories/residents';
import { useResidents } from 'utils/api/residents';
import * as CSRFToken from 'lib/csrfToken';
import axios from 'axios';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1' },
    asPath: 'path',
  }),
}));

jest.mock('utils/api/residents', () => ({
  useResidents: jest.fn(),
}));
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GroupRecordingWidget', () => {
  const mockedResident1 = residentFactory.build({
    id: 1,
    firstName: 'Foo',
    lastName: 'Bar',
  });

  const mockedResident2 = residentFactory.build({
    id: 2,
    firstName: 'Bar',
    lastName: 'Baz',
  });

  beforeEach(() => {
    (useResidents as jest.Mock).mockReturnValue({
      size: 2,
      data: [
        {
          residents: [mockedResident1, mockedResident2],
        },
      ],
    });
  });
  const mock = jest.spyOn(CSRFToken, 'tokenFromMeta'); // spy on otherFn
  mock.mockReturnValue('TEST_XSRF');

  it('should render properly', () => {
    const { asFragment } = render(
      <GroupRecordingWidget submissionId="1" initialPeople={[mockedResident]} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('shows one person initially', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    expect(
      screen.getByText(
        `${mockedResident1.firstName} ${mockedResident1.lastName}`
      )
    );
  });

  it('can show multiple people', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1, mockedResident2]}
      />
    );

    expect(
      screen.getByText(
        `${mockedResident1.firstName} ${mockedResident1.lastName}`
      )
    );
    expect(
      screen.getByText(
        `${mockedResident2.firstName} ${mockedResident2.lastName}`
      )
    );
  });

  it('shows an option to remove a person if multiple people are assigned to the group', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1, mockedResident2]}
      />
    );

    expect(screen.getAllByText('Remove').length).toBe(2);
  });

  it('does not show an option to remove a person if a single person is assigned to the group', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    expect(screen.queryByText('Remove')).toBeFalsy();
  });

  it('does not show a resident can be added if they already belong to the group', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    fireEvent.click(screen.getByText('Link another person'));

    fireEvent.change(screen.getByPlaceholderText('eg. 123456'), {
      target: { value: mockedResident1.id },
    });
    const personToAdd = screen.queryByLabelText(
      `${mockedResident1.firstName} ${mockedResident1.lastName}`
    ) as HTMLInputElement;
    expect(personToAdd).toBeNull();
  });

  it('shows a resident can be added if they do not belong to the group', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    fireEvent.click(screen.getByText('Link another person'));

    fireEvent.change(screen.getByPlaceholderText('eg. 123456'), {
      target: { value: mockedResident2.id },
    });
    const personToAdd = screen.getByText(
      `${mockedResident2.firstName} ${mockedResident2.lastName}`
    ) as HTMLInputElement;
    expect(personToAdd).toBeTruthy();
  });

  it('sets checked to true after selecting a resident to add', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    fireEvent.click(screen.getByText('Link another person'));

    fireEvent.change(screen.getByPlaceholderText('eg. 123456'), {
      target: { value: mockedResident2.id },
    });

    const residentToSelect = screen.getByLabelText(
      `${mockedResident2.firstName} ${mockedResident2.lastName}`
    ) as HTMLInputElement;
    expect(residentToSelect.checked).toBeFalsy();
    fireEvent.click(residentToSelect);
    expect(residentToSelect.checked).toBeTruthy();
  });

  it('add person button disabled if no resident is selected', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    fireEvent.click(screen.getByText('Link another person'));

    const addPersonButton = screen.getByText('Add person') as HTMLButtonElement;
    expect(addPersonButton.disabled).toBeTruthy();
  });

  it('add person button enabled if a resident is selected', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    fireEvent.click(screen.getByText('Link another person'));
    fireEvent.change(screen.getByPlaceholderText('eg. 123456'), {
      target: { value: mockedResident2.id },
    });
    fireEvent.click(
      screen.getByLabelText(
        `${mockedResident2.firstName} ${mockedResident2.lastName}`
      )
    );

    const addPersonButton = screen.getByText('Add person') as HTMLButtonElement;
    expect(addPersonButton.disabled).toBeFalsy();
  });

  it('makes a PATCH request with our new resident IDs after adding a resident', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    fireEvent.click(screen.getByText('Link another person'));

    fireEvent.change(screen.getByPlaceholderText('eg. 123456'), {
      target: { value: mockedResident2.id },
    });
    fireEvent.click(
      screen.getByLabelText(
        `${mockedResident2.firstName} ${mockedResident2.lastName}`
      )
    );

    fireEvent.click(screen.getByText('Add person'));

    expect(mockedAxios.patch).toHaveBeenLastCalledWith(
      '/api/submissions/1',
      {
        residents: [mockedResident1.id, mockedResident2.id],
      },
      { headers: { 'XSRF-TOKEN': 'TEST_XSRF' } }
    );
  });

  it('displays the newly added resident', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1]}
      />
    );

    fireEvent.click(screen.getByText('Link another person'));

    fireEvent.change(screen.getByPlaceholderText('eg. 123456'), {
      target: { value: mockedResident2.id },
    });
    fireEvent.click(
      screen.getByLabelText(
        `${mockedResident2.firstName} ${mockedResident2.lastName}`
      )
    );

    fireEvent.click(screen.getByText('Add person'));

    expect(
      screen.getByText(
        `${mockedResident2.firstName} ${mockedResident2.lastName}`
      )
    ).toBeTruthy();
  });

  it('makes a PATCH request with our new resident IDs after removing a resident', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1, mockedResident2]}
      />
    );

    fireEvent.click(screen.getAllByText('Remove')[0]);

    expect(mockedAxios.patch).toHaveBeenLastCalledWith(
      '/api/submissions/1',
      {
        residents: [mockedResident2.id],
      },
      { headers: { 'XSRF-TOKEN': 'TEST_XSRF' } }
    );
  });

  it('removes the removed resident from the group recording display', () => {
    render(
      <GroupRecordingWidget
        submissionId="1"
        initialPeople={[mockedResident1, mockedResident2]}
      />
    );

    fireEvent.click(screen.getAllByText('Remove')[0]);

    expect(
      screen.queryByText(
        `${mockedResident1.firstName} ${mockedResident1.lastName}`
      )
    ).toBeNull();
  });
});
