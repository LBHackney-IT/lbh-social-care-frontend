import { AuthRoles } from '../support/commands';
import { format } from 'date-fns';

//Ideally - grab the latest status from the person, add one day so that the new status won't overlap
//End date should be the same date as the start date where possible to use as few days as possible
//Might be worth having something like this so that front end validation can show this issue too?
//Other option - delete end point to delete previous status? - might be easier?
//Other option - some constant that can be updated with the next start date to use?

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 1);
const futureDateFormatted = format(futureDate, 'yyyy-MM-dd');
const todayDate = format(new Date(), 'yyyy-MM-dd');
const caseStatusStartDate = '2000-01-03';
const caseStatusStartDateText = '03 Jan 2000';
const caseStatusStartDateEdit = '2000-01-04';
const caseStatusStartDateEditText = '04 Jan 2000';
const caseStatusBeforeStartDate = '2000-01-01';

describe('Using case status', () => {
  beforeEach(() => {
    // This is required as the email address stored in the cookie is not an
    // existing worker.
    cy.intercept(
      'POST',
      `/api/residents/${Cypress.env(
        'CHILDREN_RECORD_PERSON_ID'
      )}/case-statuses`,
      (req) => {
        req.body.createdBy = 'e2e.tests.adult@hackney.gov.uk';
      }
    );
    cy.intercept('POST', `/api/casestatus`, (req) => {
      req.body.createdBy = 'e2e.tests.adult@hackney.gov.uk';
    });
    cy.intercept('PATCH', '/api/casestatus/**', (req) => {
      req.body.editedBy = 'e2e.tests.adult@hackney.gov.uk';
    });
  });

  describe('As a user in the Childrens group', () => {
    describe('CIN case status', () => {
      it('should validate that when adding a CIN case status, a start date is required and the start date must be today or in the past', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('Add a case status').click();
        cy.get(`input[value=CIN]`).check();

        cy.get('input[name=startDate]').clear();
        cy.get('[data-testid=submit_button]').should('be.disabled');

        cy.get('input[name=startDate]').clear().type(futureDateFormatted);
        cy.get('textarea[name=notes]').click();
        cy.contains('Date cannot be in the future').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=startDate]').clear().type(todayDate);
        cy.get('textarea[name=notes]').click();
        cy.get('Date cannot be in the future').should('not.exist');
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=startDate]').clear().type(caseStatusStartDate);
        cy.get('textarea[name=notes]').click();
        cy.get('Date cannot be in the future').should('not.exist');
        cy.get('[data-testid=text-field-error-message]').should('not.exist');
      });

      it('should be possible to add a CIN case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
          AuthRoles.ChildrensGroup
        );

        cy.request(
          'GET',
          `/api/residents/${Cypress.env(
            'CHILDREN_RECORD_PERSON_ID'
          )}/casestatus`
        ).then((request) => {
          const status = request;
          console.log('status', status);
        });

        cy.contains('Add a case status').click();
        cy.get(`input[value=CIN]`).check();
        cy.get('input[name=startDate]').clear().type(caseStatusStartDate);
        cy.get('textarea[name=notes]').clear().type('this is a test note');
        cy.get('[data-testid=submit_button]').click();

        cy.url().should('include', '/review');
        cy.contains('Child in need').should('be.visible');
        cy.contains(caseStatusStartDateText).should('be.visible');
        cy.contains('this is a test note').should('be.visible');
        cy.contains('button', 'Yes, add this status').click();

        cy.url().should('include', '/details');
        cy.contains('Child in need').should('be.visible');
        cy.contains(caseStatusStartDateText).should('be.visible');
        cy.get('Add a case status').should('not.exist');
      });

      it('should validate when editing a CIN status that the start date cannot be in the future', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=edit]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=startDate]').clear().type(futureDateFormatted);
        cy.get('textarea[name=notes]').click();
        cy.contains('Date cannot be in the future').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=startDate]').clear().type(todayDate);
        cy.get('textarea[name=notes]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=startDate]').clear().type(caseStatusStartDateEdit);
        cy.get('textarea[name=notes]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');
      });

      it('should be possible to edit a CIN case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=edit]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=startDate]').clear().type(caseStatusStartDateEdit);
        cy.get('textarea[name=notes]')
          .clear()
          .type('this is an updated test note');
        cy.get('[data-testid=submit_button]').click();

        cy.url().should('include', '/review');
        cy.contains('Child in need').should('be.visible');
        cy.contains(caseStatusStartDateEditText).should('be.visible');
        cy.contains('this is an updated test note').should('be.visible');
        cy.contains('button', 'Yes, edit').click();

        cy.url().should('include', '/details');
        cy.contains('Child in need').should('be.visible');
        cy.contains(caseStatusStartDateEditText).should('be.visible');
      });

      it('should validate when ending a case status that the end date cannot be before the case status start date, start date can be in the future', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=end]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');

        cy.get('input[name=endDate]').clear().type(caseStatusBeforeStartDate);
        cy.get('label[for=endDate]').click();
        cy.contains('Date cannot be before start date').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=endDate]').clear().type(caseStatusStartDate);
        cy.get('label[for=endDate]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=endDate]').clear().type(futureDateFormatted);
        cy.get('label[for=endDate]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');
      });

      it('should be possible to end the CIN case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=end]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=endDate]').clear().type(caseStatusStartDate);
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/review');
        cy.contains(caseStatusStartDateText).should('be.visible');
        cy.contains('button', 'Yes, end').click();

        cy.url().should('include', '/details');
        cy.get('[data-testid=expand_details]').should('not.exist');
      });
    });
  });
});
