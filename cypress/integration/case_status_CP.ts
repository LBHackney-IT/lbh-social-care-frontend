import { AuthRoles } from '../support/commands';
import { format } from 'date-fns';

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 1);
const futureDateFormatted = format(futureDate, 'yyyy-MM-dd');
const todayDate = format(new Date(), 'yyyy-MM-dd');

const caseStatusStartDate = '2000-01-12';
const caseStatusStartDateText = '12 Jan 2000';
const caseStatusStartDateEdit = '2000-01-11';
const caseStatusStartDateEditText = '11 Jan 2000';
const caseStatusBeforeStartDate = '2000-01-01';
const caseStatusDayBeforeStartDate = '2000-01-10';

const invalidCaseStatusStartDate = '2000-01-10';

describe('Using CP case status', () => {
  beforeEach(() => {
    // This is required as the email address stored in the cookie is not an
    // existing worker.
    cy.intercept('POST', `/api/casestatus`, (req) => {
      req.body.createdBy = 'e2e.tests.adult@hackney.gov.uk';
    });
    cy.intercept('PATCH', '/api/casestatus/**', (req) => {
      req.body.editedBy = 'e2e.tests.adult@hackney.gov.uk';
    });
    cy.intercept('GET', '/api/residents/**/casestatus**').as('getCaseStatus');
  });

  describe('As a user in the Childrens group', () => {
    it('should end any existing case status before all other CP tests', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_SECOND_PERSON_ID')}/details`,
        AuthRoles.ChildrensGroup
      );
      cy.wait('@getCaseStatus');
      cy.request(
        'GET',
        `/api/residents/${Cypress.env(
          'CHILDREN_RECORD_SECOND_PERSON_ID'
        )}/casestatus?include_closed_cases=false`
      ).then((response) => {
        if (response.body.length > 0) {
          cy.contains('a', 'Edit / End', {
            timeout: 20000,
          }).click();
          cy.get(`input[value=end]`).check();
          cy.get('[data-testid=submit_button]').click();
          cy.url().should('include', '/edit/edit');
          cy.get('input[name=endDate]').clear().type(caseStatusStartDateEdit);
          cy.get('label[for=endDate]').click();
          cy.get('[data-testid=submit_button]').click();
          cy.url().should('include', '/review');
          cy.contains(caseStatusStartDateEditText).should('be.visible');
          cy.contains('button', 'Yes, end').click();
        }
      });
    });

    it('should validate that when adding a CP case status, a start date and answer is required and the start date must be today or in the past', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_SECOND_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Add a case status').click();
      cy.get(`input[value=CP]`).check();

      cy.get('input[name=startDate]').clear();
      cy.get('[data-testid=submit_button]').should('be.disabled');

      cy.get('input[name=startDate]').clear().type(futureDateFormatted);
      cy.get('[data-testid=category]').click();
      cy.contains(/Date cannot be/).should('be.visible');
      cy.get('[data-testid=text-field-error-message]').should('exist');

      cy.get('input[name=startDate]').clear().type(todayDate);
      cy.get('[data-testid=category]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');

      cy.get('input[name=startDate]').clear().type(caseStatusStartDate);
      cy.get('[data-testid=category]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');

      cy.get('[data-testid=submit_button]').should('be.disabled');
      cy.get(`input[value=C1]`).check();
      cy.get('[data-testid=submit_button]').should('not.be.disabled');
    });

    it('should be possible to add a CP case status', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_SECOND_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Add a case status').click();
      cy.get(`input[value=CP]`).check();
      cy.get('input[name=startDate]').clear().type(caseStatusStartDate);
      cy.get(`input[value=C1]`).check();
      cy.get('[data-testid=submit_button]').click();

      cy.url().should('include', '/review');
      cy.contains('Child protection').should('be.visible');
      cy.contains(caseStatusStartDateText).should('be.visible');
      cy.contains('Neglect').should('be.visible');
      cy.contains('button', 'Yes, add this status').click();

      cy.url().should('include', '/details');
      cy.contains('Child protection').should('be.visible');
      cy.contains(caseStatusStartDateText).should('be.visible');
      cy.get('Add a case status').should('not.exist');
    });

    it('should validate when editing a CP status that the start date cannot be in the future', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_SECOND_PERSON_ID')}/details`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('a', 'Edit / End', {
        timeout: 20000,
      }).click();
      cy.get(`input[value=edit]`).check();
      cy.get('[data-testid=submit_button]').click();
      cy.url().should('include', '/edit/edit');

      cy.get('input[name=startDate]').clear().type(futureDateFormatted);
      cy.get('[data-testid=category]').click();
      cy.contains(/Date cannot be/).should('be.visible');
      cy.get('[data-testid=text-field-error-message]').should('exist');

      cy.get('input[name=startDate]').clear().type(todayDate);
      cy.get('[data-testid=category]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');

      cy.get('input[name=startDate]').clear().type(caseStatusStartDateEdit);
      cy.get('[data-testid=category]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');
    });

    it('should be possible to edit a CP case status', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_SECOND_PERSON_ID')}/details`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('a', 'Edit / End', {
        timeout: 20000,
      }).click();
      cy.get(`input[value=edit]`).check();
      cy.get('[data-testid=submit_button]').click();
      cy.url().should('include', '/edit/edit');
      cy.get('input[name=startDate]').clear().type(caseStatusStartDateEdit);
      cy.get(`input[value=C2]`).check();
      cy.get('[data-testid=submit_button]').click();

      cy.url().should('include', '/review');
      cy.contains('Child protection').should('be.visible');
      cy.contains(caseStatusStartDateEditText).should('be.visible');
      cy.contains('Physical abuse').should('be.visible');
      cy.contains('button', 'Yes, edit').click();

      cy.url().should('include', '/details');
      cy.contains('Child protection').should('be.visible');
      cy.contains(caseStatusStartDateEditText).should('be.visible');
      cy.contains('Physical abuse').should('be.visible');
    });

    it('should validate when ending a CP case status that the end date cannot be before the case status start date, start date can be in the future', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_SECOND_PERSON_ID')}/details`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('a', 'Edit / End', {
        timeout: 20000,
      }).click();
      cy.get(`input[value=end]`).check();
      cy.get('[data-testid=submit_button]').click();
      cy.url().should('include', '/edit/edit');

      cy.get('input[name=endDate]').clear().type(caseStatusBeforeStartDate);
      cy.get('label[for=endDate]').click();
      cy.contains(/Date cannot be/).should('be.visible');
      cy.get('[data-testid=text-field-error-message]').should('exist');

      cy.get('input[name=endDate]').clear().type(caseStatusDayBeforeStartDate);
      cy.get('label[for=endDate]').click();
      cy.contains(/Date cannot be/).should('be.visible');
      cy.get('[data-testid=text-field-error-message]').should('exist');

      cy.get('input[name=endDate]').clear().type(caseStatusStartDateEdit);
      cy.get('label[for=endDate]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');

      cy.get('input[name=endDate]').clear().type(futureDateFormatted);
      cy.get('label[for=endDate]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');
    });

    it('should be possible to end the CP case status', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_SECOND_PERSON_ID')}/details`,
        AuthRoles.ChildrensGroup
      );
      cy.wait('@getCaseStatus');
      cy.contains('a', 'Edit / End', {
        timeout: 20000,
      }).click();
      cy.get(`input[value=end]`).check();
      cy.get('[data-testid=submit_button]').click();
      cy.url().should('include', '/edit/edit');
      cy.get('input[name=endDate]').clear().type(caseStatusStartDateEdit);
      cy.get('[data-testid=submit_button]').click();
      cy.url().should('include', '/review');
      cy.contains(caseStatusStartDateEditText).should('be.visible');
      cy.contains('button', 'Yes, end').click();

      cy.url().should('include', '/details');

      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_SECOND_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );
      cy.wait('@getCaseStatus');
      cy.contains('Add a case status', {
        timeout: 30000,
      }).should('be.visible');
    });
    it('should not allow you to create a new case status before the previous status end date', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Add a case status').click();
      cy.get(`input[value=CP]`).check();

      cy.get('input[name=startDate]').clear();
      cy.get('[data-testid=submit_button]').should('be.disabled');

      cy.get('input[name=startDate]').clear().type(invalidCaseStatusStartDate);
      cy.get('[data-testid=category]').click();
      cy.contains(/Date cannot be/).should('be.visible');
      cy.get('[data-testid=text-field-error-message]').should('exist');
    });
  });
});
