import { render, screen } from '@testing-library/react';
import { mockedAllocationNote, mockedCaseNote } from 'factories/cases';
import { AppConfigProvider } from 'lib/appConfig';
import { Case } from 'types';
import EventLink from './EventLink';

const mockFlexibleForm = {
  recordId: 'abcd1234',
  formName: 'child-case-note',
  personId: 123,
  formType: 'flexible-form',
  title: 'Test title',
} as Case;

const mockGoogleForm = {
  recordId: 'abcd1234',
  formName: 'Example form name',
  personId: 123,
  caseFormUrl: 'https://docs.google.com/document/whatever',
} as Case;

const mockWorkflow = {
  recordId: 'abcd1234',
  formName: 'Example assessment',
  personId: 123,
  caseFormData: {
    workflowId: '123abc',
  },
} as Case;

describe('EventLink', () => {
  it('correctly handles a flexible form', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <EventLink event={mockFlexibleForm} />
      </AppConfigProvider>
    );
    expect(
      (screen.getByText('Case note - Test title') as HTMLLinkElement).href
    ).toContain(`/people/123/submissions/abcd1234`);
  });

  it('correctly handles a workflow', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <EventLink event={mockWorkflow} />
      </AppConfigProvider>
    );
    expect(
      (screen.getByText('Example assessment') as HTMLLinkElement).href
    ).toContain('http://example.com/workflows/123abc');
  });

  it('correctly handles a google/external form', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <EventLink event={mockGoogleForm} />
      </AppConfigProvider>
    );
    expect(
      (screen.getByText('Example form name') as HTMLLinkElement).href
    ).toBe('https://docs.google.com/document/whatever');
  });

  it('correctly handles a legacy case note', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <EventLink event={mockedCaseNote} />
      </AppConfigProvider>
    );
    expect((screen.getByText('foorm') as HTMLLinkElement).href).toContain(
      `/people/123/records/4`
    );
  });

  it('correctly handles an allocation', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <EventLink event={mockedAllocationNote} />
      </AppConfigProvider>
    );
    expect(
      (screen.getByText('Worker allocated') as HTMLLinkElement).href
    ).toContain('/people/123/allocations/321?recordId=2');
  });

  it('correctly handles something unrecognisable', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <EventLink
          event={
            {
              caseFormData: {},
            } as unknown as Case
          }
        />
      </AppConfigProvider>
    );
    expect(screen.getByText('Unknown event'));
  });
});
