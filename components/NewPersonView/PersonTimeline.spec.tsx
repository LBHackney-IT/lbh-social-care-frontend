import { fireEvent, render, screen } from '@testing-library/react';
import { AppConfigProvider } from 'lib/appConfig';
import {
  mockedAllocationNote,
  mockedCaseNote,
  mockedNote,
  mockedWarningNoteCase,
} from 'factories/cases';
import PersonTimeline from './PersonTimeline';
import {
  FeatureFlagProvider,
  FeatureSet,
} from 'lib/feature-flags/feature-flags';
import * as permissions from 'lib/permissions';

const mockEvents = [
  mockedNote,
  mockedCaseNote,
  mockedWarningNoteCase,
  mockedAllocationNote,
];

const features: FeatureSet = {
  'case-notes-deletion': {
    isActive: true,
  },
};

jest.spyOn(permissions, 'isAdminOrDev').mockImplementation(() => {
  return true;
});

describe('PersonTimeline', () => {
  it('renders a list of clickable submissions', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2021-07-25T00:00:00.000Z').valueOf()
      );
    render(
      <AppConfigProvider appConfig={{}}>
        <FeatureFlagProvider features={{}}>
          <PersonTimeline
            setSize={jest.fn()}
            onLastPage={false}
            size={1}
            events={mockEvents}
            personId={1}
          />
        </FeatureFlagProvider>
      </AppConfigProvider>
    );

    expect(screen.getAllByRole('listitem').length).toBe(5);
    expect(screen.getAllByRole('link').length).toBe(4);
    expect(screen.getByText('Showing 4 events over 9 months'));
    expect(screen.getByText('Load older events'));
  });

  it('can cope when there are no events to show', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <FeatureFlagProvider features={{}}>
          <PersonTimeline
            setSize={jest.fn()}
            onLastPage={false}
            size={1}
            events={[]}
            personId={1}
          />
        </FeatureFlagProvider>
      </AppConfigProvider>
    );
    expect(screen.getByText('No events match your search'));
  });

  it('hides the pagination button on the last page', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <FeatureFlagProvider features={{}}>
          <PersonTimeline
            setSize={jest.fn()}
            onLastPage={true}
            size={1}
            events={mockEvents}
            personId={1}
          />
        </FeatureFlagProvider>
      </AppConfigProvider>
    );
    expect(screen.queryByText('Load older events')).toBeNull();
  });

  it('can load older events', () => {
    const mockHandler = jest.fn();
    render(
      <AppConfigProvider appConfig={{}}>
        <FeatureFlagProvider features={{}}>
          <PersonTimeline
            setSize={mockHandler}
            onLastPage={false}
            size={1}
            events={mockEvents}
            personId={1}
          />
        </FeatureFlagProvider>
      </AppConfigProvider>
    );
    fireEvent.click(screen.getByText('Load older events'));
    expect(mockHandler).toBeCalledWith(2);
  });

  it('should not display the "Show deleted records" link in staging for admin or dev', () => {
    const mockHandler = jest.fn();
    jest.spyOn(permissions, 'isAdminOrDev').mockImplementation(() => {
      return false;
    });

    const { queryByText } = render(
      <AppConfigProvider appConfig={{}}>
        <FeatureFlagProvider features={features}>
          <PersonTimeline
            setSize={mockHandler}
            onLastPage={false}
            size={1}
            events={mockEvents}
            displayDeletedCases={false}
            setDisplayDeletedCases={() => {
              return null;
            }}
            personId={1}
          />
        </FeatureFlagProvider>
      </AppConfigProvider>
    );
    expect(queryByText('Show deleted records')).toBeNull();
  });

  it('should display the "Show deleted records" link in staging for admin or dev', () => {
    const mockHandler = jest.fn();
    jest.spyOn(permissions, 'isAdminOrDev').mockImplementation(() => {
      return true;
    });

    const { getByText } = render(
      <AppConfigProvider appConfig={{}}>
        <FeatureFlagProvider features={features}>
          <PersonTimeline
            setSize={mockHandler}
            onLastPage={false}
            size={1}
            events={mockEvents}
            displayDeletedCases={false}
            setDisplayDeletedCases={() => {
              return null;
            }}
            personId={1}
          />
        </FeatureFlagProvider>
      </AppConfigProvider>
    );
    expect(getByText('Show deleted records')).toBeInTheDocument();
  });
});
