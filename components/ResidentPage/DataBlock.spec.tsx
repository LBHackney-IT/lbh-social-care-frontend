import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DataBlock from './DataBlock';
import { useResident } from 'utils/api/residents';
import { mockedResident } from 'factories/residents';

jest.mock('utils/api/residents');

(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

const mockMutate = jest.fn();
(useResident as jest.Mock).mockReturnValue({
  data: mockedResident,
  mutate: mockMutate,
});

describe('DataBlock', () => {
  it('shows a title and definition list of data', () => {
    render(
      <DataBlock
        title="example"
        socialCareId={1}
        list={[
          {
            label: 'First name',
            name: 'firstName',
            showInSummary: true,
          },
          {
            label: 'Last name',
            name: 'lastName',
            showInSummary: true,
          },
        ]}
      />
    );

    expect(screen.getByRole('heading'));
    expect(screen.getByText('example'));

    expect(screen.getAllByRole('term').length).toBe(2);
    expect(screen.getAllByRole('definition').length).toBe(2);
  });

  it('has a dialog with all the data', () => {
    render(
      <DataBlock
        title="example"
        socialCareId={1}
        list={[
          {
            label: 'First name',
            name: 'firstName',
            showInSummary: true,
          },
          {
            label: 'Last name',
            name: 'lastName',
          },
        ]}
      />
    );

    expect(screen.getAllByRole('term').length).toBe(1);
    fireEvent.click(screen.getByText('See all/edit'));
    expect(screen.getAllByRole('term').length).toBe(2);
    fireEvent.click(screen.getByText('Close'));
  });

  it('marks required data', () => {
    render(
      <DataBlock
        title="example"
        socialCareId={1}
        list={[
          {
            label: 'First name',
            name: 'firstName',
            showInSummary: true,
            required: true,
          },
        ]}
      />
    );

    expect(screen.getByLabelText('required'));
  });

  it('offers the option to edit in-place', () => {
    render(
      <DataBlock
        title="example"
        socialCareId={1}
        list={[
          {
            label: 'First name',
            name: 'firstName',
            showInSummary: true,
            readOnly: true,
          },
          {
            label: 'Last name',
            name: 'lastName',
            showInSummary: true,
          },
        ]}
      />
    );

    expect(screen.getAllByText('Edit').length).toBe(1);
  });

  it('loads the inline editor and submits changes', async () => {
    render(
      <DataBlock
        title="example"
        socialCareId={1}
        list={[
          {
            label: 'Last name',
            name: 'lastName',
            showInSummary: true,
          },
        ]}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByText('Edit')));
    await waitFor(() =>
      fireEvent.change(screen.getByRole('textbox'), {
        target: {
          value: 'example value',
        },
      })
    );
    await waitFor(() => fireEvent.click(screen.getByText('Save')));

    expect(global.fetch).toBeCalledWith(`/api/residents/${mockedResident.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: expect.anything(),
    });
    expect(mockMutate).toBeCalled();
  });
});
