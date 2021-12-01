import { fireEvent, render, screen } from '@testing-library/react';
import { AppConfigProvider } from 'lib/appConfig';
import {
  mockedAllocationNote,
  mockedCaseNote,
  mockedNote,
  mockedWarningNoteCase,
} from 'factories/cases';
import { mockedUser } from 'factories/users';
import PersonTimeline from './PersonTimeline';
import { UserContext } from 'components/UserContext/UserContext';
import {
  FeatureFlagProvider,
  FeatureSet,
} from 'lib/feature-flags/feature-flags';

const features: FeatureSet = {
  'case-notes-deletion': {
    isActive: true,
  },
};

const mockEvents = [
  mockedNote,
  mockedCaseNote,
  mockedWarningNoteCase,
  mockedAllocationNote,
];

describe('PersonTimeline', () => {
  it('renders a list of clickable submissions', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2021-07-25T00:00:00.000Z').valueOf()
      );

    render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <FeatureFlagProvider features={features}>
          <AppConfigProvider appConfig={{}}>
            <PersonTimeline
              setSize={jest.fn()}
              onLastPage={false}
              size={1}
              events={mockEvents}
              personId={1}
            />
          </AppConfigProvider>
        </FeatureFlagProvider>
      </UserContext.Provider>
    );

    expect(screen.getAllByRole('listitem').length).toBe(5);
    expect(screen.getAllByRole('link').length).toBe(4);
    expect(screen.getByText('Showing 4 events over 9 months'));
    expect(screen.getByText('Load older events'));
  });

  it('can cope when there are no events to show', () => {
    render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <FeatureFlagProvider features={features}>
          <AppConfigProvider appConfig={{}}>
            <PersonTimeline
              setSize={jest.fn()}
              onLastPage={false}
              size={1}
              events={[]}
              personId={1}
            />
          </AppConfigProvider>
        </FeatureFlagProvider>
      </UserContext.Provider>
    );
    expect(screen.getByText('No events match your search'));
  });

  it('displays the hide/show deleted record link with the count', () => {
    render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <FeatureFlagProvider features={features}>
          <AppConfigProvider appConfig={{}}>
            <PersonTimeline
              setSize={jest.fn()}
              onLastPage={false}
              size={1}
              events={[]}
              personId={1}
              displayDeletedCases={false}
              setDisplayDeletedCases={() => {
                return null;
              }}
              deletedRecordsCount={10}
            />
          </AppConfigProvider>
        </FeatureFlagProvider>
      </UserContext.Provider>
    );
    expect(screen.getByText('Show deleted records (10)'));
  });

  it('hides the pagination button on the last page', () => {
    render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <FeatureFlagProvider features={features}>
          <AppConfigProvider appConfig={{}}>
            <PersonTimeline
              setSize={jest.fn()}
              onLastPage={true}
              size={1}
              events={mockEvents}
              personId={1}
            />
          </AppConfigProvider>
        </FeatureFlagProvider>
      </UserContext.Provider>
    );
    expect(screen.queryByText('Load older events')).toBeNull();
  });

  it('can load older events', () => {
    const mockHandler = jest.fn();
    render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <FeatureFlagProvider features={features}>
          <AppConfigProvider appConfig={{}}>
            <PersonTimeline
              setSize={mockHandler}
              onLastPage={false}
              size={1}
              events={mockEvents}
              personId={1}
            />
          </AppConfigProvider>
        </FeatureFlagProvider>
      </UserContext.Provider>
    );
    fireEvent.click(screen.getByText('Load older events'));
    expect(mockHandler).toBeCalledWith(2);
  });
});
