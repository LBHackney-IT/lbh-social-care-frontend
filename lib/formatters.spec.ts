import { mockedCaseNote } from 'factories/cases';
import { mockedResident } from 'factories/residents';
import { mockedWorker } from 'factories/workers';
import { allocationFactory } from 'factories/allocatedWorkers';
import { Resident } from 'types';
import {
  prettyAddress,
  prettyCaseDate,
  prettyCaseTitle,
  prettyResidentName,
  prettyWorkerName,
  summariseAllocations,
} from './formatters';

describe('prettyResidentName', () => {
  it('trims trailing and leading whitespace', () => {
    const result = prettyResidentName({
      firstName: '   First   ',
      lastName: '   Last     ',
    } as Resident);
    expect(result).toBe('First Last');
  });

  it('deals with incomplete data', () => {
    const result = prettyResidentName({
      firstName: '   First   ',
    } as Resident);
    expect(result).toBe('First');
  });
});

describe('prettyWorkerName', () => {
  it('joins first and last name together', () => {
    const result = prettyWorkerName(mockedWorker);
    expect(result).toBe('Foo Bar');
  });
});

describe('prettyAddress', () => {
  it('joins address and postcode together', () => {
    const result = prettyAddress(mockedResident);
    expect(result).toBe('sjakdjlk, hdsadjk');
  });
});

describe('prettyCaseDate', () => {
  it('uses date of event if present', () => {
    const result = prettyCaseDate(mockedCaseNote);
    expect(result).toBe('25 Oct 2020');
  });

  it('falls back to the timestamp', () => {
    const result = prettyCaseDate({
      ...mockedCaseNote,
      dateOfEvent: undefined,
      caseFormTimestamp: '2020-05-05',
    });
    expect(result).toBe('5 May 2020');
  });

  it('returns null if neither is given', () => {
    const result = prettyCaseDate({
      ...mockedCaseNote,
      dateOfEvent: undefined,
    });
    expect(result).toBeNull();
  });
});

describe('prettyCaseTitle', () => {
  it('gives the specific case note title if present, for a flexible form', () => {
    const result = prettyCaseTitle({
      ...mockedCaseNote,
      title: 'example title',
      formType: 'flexible-form',
    });
    expect(result).toBe('Form: example title');
  });

  it('otherwise shows only the form name', () => {
    const result = prettyCaseTitle(mockedCaseNote);
    expect(result).toBe('foorm');
  });

  it('otherwise shows an unknown message', () => {
    const result = prettyCaseTitle({
      ...mockedCaseNote,
      formName: '',
    });
    expect(result).toBe('Unknown record');
  });

  it('displays the correct allocation in the header', () => {
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: 'The Best Team',
        }),
      ])
    ).toBe(' · Allocated to Jon Doe (The Best Team)');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: undefined,
          allocatedWorkerTeam: 'The Best Team',
        }),
      ])
    ).toBe(' · Allocated to The Best Team');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: 'The Best Team',
        }),
      ])
    ).toBe(' · Allocated to Jon Doe (The Best Team)');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: undefined,
          allocatedWorkerTeam: 'The Best Team',
        }),
      ])
    ).toBe(' · Allocated to The Best Team');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: 'The Best Team',
        }),
        allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
      ])
    ).toBe(' · Allocated to Jon Doe (The Best Team) and 1 other');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: undefined,
          allocatedWorkerTeam: 'The Best Team',
        }),
        allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
      ])
    ).toBe(' · Allocated to The Best Team and 1 other');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: 'The Best Team',
        }),
        allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
      ])
    ).toBe(' · Allocated to Jon Doe (The Best Team) and 1 other');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: 'The Best Team',
        }),
        allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
        allocationFactory.build({ allocatedWorker: 'Agent Smith' }),
      ])
    ).toBe(' · Allocated to Jon Doe (The Best Team) and 2 others');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: undefined,
          allocatedWorkerTeam: 'The Best Team',
        }),
        allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
        allocationFactory.build({ allocatedWorker: 'Agent Smith' }),
      ])
    ).toBe(' · Allocated to The Best Team and 2 others');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: 'The Best Team',
        }),
        allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
        allocationFactory.build({ allocatedWorker: 'Agent Smith' }),
      ])
    ).toBe(' · Allocated to Jon Doe (The Best Team) and 2 others');

    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: undefined,
        }),
      ])
    ).toBe(' · Allocated to Jon Doe');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: undefined,
        }),
        allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
      ])
    ).toBe(' · Allocated to Jon Doe and 1 other');
    expect(
      summariseAllocations([
        allocationFactory.build({
          allocatedWorker: 'Jon Doe',
          allocatedWorkerTeam: undefined,
        }),
        allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
        allocationFactory.build({ allocatedWorker: 'Agent Smith' }),
      ])
    ).toBe(' · Allocated to Jon Doe and 2 others');
  });
});
