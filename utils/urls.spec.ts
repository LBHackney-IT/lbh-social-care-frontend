import {
  mockedAllocationNote,
  mockedCaseNote,
  mockedWarningNoteCase,
} from 'factories/cases';
import { Case } from 'types';
import { generateInternalLink, getQueryString, parseQueryString } from './urls';

describe('urls', () => {
  describe('getQueryString', () => {
    it('should return empty string on empty object', () => {
      expect(getQueryString({})).toEqual('');
    });

    it('should return the proper string filtering empty values', () => {
      expect(
        getQueryString({
          foo: 123,
          bar: '',
          foobar: null,
          barfoo: 'yo',
          yo: true,
        })
      ).toEqual('foo=123&barfoo=yo&yo=true');
    });
  });

  describe('parseQueryString', () => {
    it('should return empty string on empty object', () => {
      expect(parseQueryString('')).toEqual({});
    });

    it('should return the proper string filtering empty values', () => {
      expect(parseQueryString('foo=123&barfoo=yo&yo=true')).toEqual({
        foo: '123',
        barfoo: 'yo',
        yo: 'true',
      });
    });
  });

  describe('generateInternalUrl', () => {
    it('correctly handles all legacy form-wizard forms', () => {
      expect(generateInternalLink(mockedCaseNote)).toBe(
        `/people/123/records/4`
      );
      expect(generateInternalLink(mockedAllocationNote)).toBe(
        `/people/123/allocations/321?recordId=2`
      );
      expect(
        generateInternalLink({
          ...mockedWarningNoteCase,
          caseFormData: {
            ...mockedWarningNoteCase.caseFormData,
            form_name: 'Warning Note Created',
          },
        })
      ).toBe(`/people/123/warning-notes/456/view/note-created`);
      expect(
        generateInternalLink({
          ...mockedCaseNote,
          caseFormData: {
            ...mockedCaseNote.caseFormData,
            form_name_overall: 'Historical_Case_Note',
            is_historical: true,
          },
        })
      ).toBe(`/people/123/records/4?is_historical=true`);
    });

    it('returns nothing for an unrecognised form', () => {
      const result = generateInternalLink({
        caseFormData: {
          form_name_overall: 'ffff',
        },
      } as Case);
      expect(result).toBeNull();
    });
  });
});
