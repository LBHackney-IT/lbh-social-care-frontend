import * as relationshipsAPI from './relationships';
import * as SWR from 'swr';
import axios from 'axios';

jest.mock('swr');
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('relationships APIs', () => {
  describe('useRelationships', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      relationshipsAPI.useRelationships(123);
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/residents/123/relationships'
      );
    });
  });

  describe('addRelationships', () => {
    it('calls the POST /api/relationships endpoint', () => {
      const formData = {
        personId: 123,
        otherPersonId: 456,
        createdBy: 'test@hackney.gov.uk',
        type: 'parent',
      };
      jest.spyOn(axios, 'post');

      relationshipsAPI.addRelationships(formData);

      expect(axios.post).toHaveBeenCalledWith('/api/relationships', formData);
    });

    it('returns response from POST /api/relationships endpoint', async () => {
      const formData = {
        personId: 123,
        otherPersonId: 456,
        createdBy: 'test@hackney.gov.uk',
        type: 'parent',
        details: 'emergency contact',
      };
      const apiResponse = { data: 'foobar' };
      mockedAxios.post.mockResolvedValue(apiResponse);

      const response = await relationshipsAPI.addRelationships(formData);

      expect(response).toBe(apiResponse.data);
    });

    describe('when form data includes additional options', () => {
      it('does not send "additionalOptions" as part of the request', () => {
        const formData = {
          personId: 123,
          otherPersonId: 456,
          createdBy: 'test@hackney.gov.uk',
          type: 'parent',
          additionalOptions: ['isMainCarer'],
        };
        jest.spyOn(axios, 'post');

        relationshipsAPI.addRelationships(formData);

        expect(axios.post).not.toHaveBeenCalledWith(
          '/api/relationships',
          expect.objectContaining({ additionalOptions: ['isMainCarer'] })
        );
      });

      describe('and it has main carer', () => {
        it('adds isMainCarer as "Y" to request if an array', () => {
          const formData = {
            personId: 123,
            otherPersonId: 456,
            createdBy: 'test@hackney.gov.uk',
            type: 'parent',
            additionalOptions: ['isMainCarer'],
          };
          jest.spyOn(axios, 'post');

          relationshipsAPI.addRelationships(formData);

          expect(axios.post).toHaveBeenCalledWith(
            '/api/relationships',
            expect.objectContaining({ isMainCarer: 'Y' })
          );
        });

        it('adds isMainCarer as "Y" to request if a string', () => {
          const formData = {
            personId: 123,
            otherPersonId: 456,
            createdBy: 'test@hackney.gov.uk',
            type: 'acquaintance',
            additionalOptions: 'isMainCarer',
          };
          jest.spyOn(axios, 'post');

          relationshipsAPI.addRelationships(formData);

          expect(axios.post).toHaveBeenCalledWith(
            '/api/relationships',
            expect.objectContaining({ isMainCarer: 'Y' })
          );
        });
      });

      describe('and it has of unborn child', () => {
        it('changes type to "parentOfUnbornChild" in request if type is "parent"', () => {
          const formData = {
            personId: 123,
            otherPersonId: 456,
            createdBy: 'test@hackney.gov.uk',
            type: 'parent',
            additionalOptions: ['isParentOfUnbornChild'],
          };
          jest.spyOn(axios, 'post');

          relationshipsAPI.addRelationships(formData);

          expect(axios.post).toHaveBeenCalledWith(
            '/api/relationships',
            expect.objectContaining({ type: 'parentOfUnbornChild' })
          );
        });

        it('changes type to "siblingOfUnbornChild" in request if type is "sibling"', () => {
          const formData = {
            personId: 123,
            otherPersonId: 456,
            createdBy: 'test@hackney.gov.uk',
            type: 'sibling',
            additionalOptions: ['isSiblingOfUnbornChild'],
          };
          jest.spyOn(axios, 'post');

          relationshipsAPI.addRelationships(formData);

          expect(axios.post).toHaveBeenCalledWith(
            '/api/relationships',
            expect.objectContaining({ type: 'siblingOfUnbornChild' })
          );
        });
      });
    });
  });

  describe('removeRelationship', () => {
    it('calls the DELETE /api/relationships endpoint', () => {
      jest.spyOn(axios, 'delete');

      const relationshipId = '123456789';

      relationshipsAPI.removeRelationship(relationshipId);

      expect(axios.delete).toHaveBeenCalledWith(
        `/api/relationships/${relationshipId}`
      );
    });
  });
});
