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

//These need updated each time the test are run
const CINcaseStatusStartDate = '2000-01-12';
const CINcaseStatusStartDateText = '12 Jan 2000';
const CINcaseStatusStartDateEdit = '2000-01-13';
const CINcaseStatusStartDateEditText = '13 Jan 2000';
const CINcaseStatusBeforeStartDate = '2000-01-01';

const CPcaseStatusStartDate = '2000-01-15';
const CPcaseStatusStartDateText = '15 Jan 2000';
const CPcaseStatusStartDateEdit = '2000-01-16';
const CPcaseStatusStartDateEditText = '16 Jan 2000';
const CPcaseStatusBeforeStartDate = '2000-01-01';

const LACcaseStatusStartDate = '2000-01-18';
const LACcaseStatusStartDateText = '18 Jan 2000';
const LACcaseStatusStartDateEdit = '2000-01-19';
const LACcaseStatusStartDateEditText = '19 Jan 2000';
const LACcaseStatusBeforeStartDate = '2000-01-01';

describe('Using case status', () => {
  beforeEach(() => {
    // This is required as the email address stored in the cookie is not an
    // existing worker.
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

        cy.get('input[name=startDate]').clear().type(CINcaseStatusStartDate);
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
        cy.get('input[name=startDate]').clear().type(CINcaseStatusStartDate);
        cy.get('textarea[name=notes]').clear().type('this is a test note');
        cy.get('[data-testid=submit_button]').click();

        cy.url().should('include', '/review');
        cy.contains('Child in need').should('be.visible');
        cy.contains(CINcaseStatusStartDateText).should('be.visible');
        cy.contains('this is a test note').should('be.visible');
        cy.contains('button', 'Yes, add this status').click();

        cy.url().should('include', '/details');
        cy.contains('Child in need').should('be.visible');
        cy.contains(CINcaseStatusStartDateText).should('be.visible');
        cy.get('Add a case status').should('not.exist');
      });

      it('should validate when editing a CIN status that the start date cannot be in the future', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('Edit / End').click();
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

        cy.get('input[name=startDate]')
          .clear()
          .type(CINcaseStatusStartDateEdit);
        cy.get('textarea[name=notes]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');
      });

      //Edit needs more work
      it('should be possible to edit a CIN case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('Edit / End').click();
        cy.get(`input[value=edit]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=startDate]')
          .clear()
          .type(CINcaseStatusStartDateEdit);
        cy.get('textarea[name=notes]')
          .clear()
          .type('this is an updated test note');
        cy.get('[data-testid=submit_button]').click();

        cy.url().should('include', '/review');
        cy.contains('Child in need').should('be.visible');
        cy.contains(CINcaseStatusStartDateEditText).should('be.visible');
        cy.contains('this is an updated test note').should('be.visible');
        cy.contains('button', 'Yes, edit').click();

        cy.url().should('include', '/details');
        cy.contains('Child in need').should('be.visible');
        cy.contains(CINcaseStatusStartDateEditText).should('be.visible');
      });

      it('should validate when ending a CIN case status that the end date cannot be before the case status start date, start date can be in the future', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('Edit / End').click();
        cy.get(`input[value=end]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');

        cy.get('input[name=endDate]')
          .clear()
          .type(CINcaseStatusBeforeStartDate);
        cy.get('label[for=endDate]').click();
        cy.contains('Date cannot be before start date').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=endDate]').clear().type(CINcaseStatusStartDateEdit);
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

        cy.contains('Edit / End').click();
        cy.get(`input[value=end]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=endDate]').clear().type(CINcaseStatusStartDateEdit);
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/review');
        cy.contains(CINcaseStatusStartDateEditText).should('be.visible');
        cy.contains('button', 'Yes, end').click();

        cy.url().should('include', '/details');
        cy.get('[data-testid=expand_details]').should('not.exist');
        cy.contains('Add a case status').should('be.visible');
      });
    });

    xdescribe('CP case status', () => {
      it('should validate that when adding a CP case status, a start date and answer is required and the start date must be today or in the past', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('Add a case status').click();
        cy.get(`input[value=CP]`).check();

        cy.get('input[name=startDate]').clear();
        cy.get('[data-testid=submit_button]').should('be.disabled');

        cy.get('input[name=startDate]').clear().type(futureDateFormatted);
        cy.get('[data-testid=category]').click();
        cy.contains('Date cannot be in the future').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=startDate]').clear().type(todayDate);
        cy.get('[data-testid=category]').click();
        cy.get('Date cannot be in the future').should('not.exist');
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=startDate]').clear().type(CPcaseStatusStartDate);
        cy.get('[data-testid=category]').click();
        cy.get('Date cannot be in the future').should('not.exist');
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('[data-testid=submit_button]').should('be.disabled');
        cy.get(`input[value=C1]`).check();
        cy.get('[data-testid=submit_button]').should('not.be.disabled');
      });

      it('should be possible to add a CP case status', () => {
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
        cy.get(`input[value=CP]`).check();
        cy.get('input[name=startDate]').clear().type(CPcaseStatusStartDate);
        cy.get(`input[value=C1]`).check();
        cy.get('[data-testid=submit_button]').click();

        cy.url().should('include', '/review');
        cy.contains('Child protection').should('be.visible');
        cy.contains(CPcaseStatusStartDateText).should('be.visible');
        cy.contains('Neglect').should('be.visible');
        cy.contains('button', 'Yes, add this status').click();

        cy.url().should('include', '/details');
        cy.contains('Child protection').should('be.visible');
        cy.contains(CPcaseStatusStartDateText).should('be.visible');
        cy.get('Add a case status').should('not.exist');
      });

      it('should validate when editing a CP status that the start date cannot be in the future', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=edit]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');

        cy.get('input[name=startDate]').clear().type(futureDateFormatted);
        cy.get('[data-testid=category]').click();
        cy.contains('Date cannot be in the future').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=startDate]').clear().type(todayDate);
        cy.get('[data-testid=category]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=startDate]').clear().type(CPcaseStatusStartDateEdit);
        cy.get('[data-testid=category]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');
      });

      //Edit needs more work
      xit('should be possible to edit a CP case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=edit]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=startDate]').clear().type(CPcaseStatusStartDateEdit);
        cy.get(`input[value=C2]`).check();
        cy.get('[data-testid=submit_button]').click();

        cy.url().should('include', '/review');
        cy.contains('Child protection').should('be.visible');
        cy.contains(CPcaseStatusStartDateEditText).should('be.visible');
        cy.contains('Physical abuse').should('be.visible');
        cy.contains('button', 'Yes, edit').click();

        cy.url().should('include', '/details');
        cy.contains('Child protection').should('be.visible');
        cy.contains(CPcaseStatusStartDateEditText).should('be.visible');
      });

      it('should validate when ending a CP case status that the end date cannot be before the case status start date, start date can be in the future', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=end]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');

        cy.get('input[name=endDate]').clear().type(CPcaseStatusBeforeStartDate);
        cy.get('label[for=endDate]').click();
        cy.contains('Date cannot be before start date').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=endDate]').clear().type(CPcaseStatusStartDate);
        cy.get('label[for=endDate]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=endDate]').clear().type(futureDateFormatted);
        cy.get('label[for=endDate]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');
      });

      it('should be possible to end the CP case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=end]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=endDate]').clear().type(CPcaseStatusStartDate);
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/review');
        cy.contains(CPcaseStatusStartDateText).should('be.visible');
        cy.contains('button', 'Yes, end').click();

        cy.url().should('include', '/details');
        cy.get('[data-testid=expand_details]').should('not.exist');
        cy.contains('Add a case status').should('be.visible');
      });
    });

    xdescribe('LAC case status', () => {
      it('should validate that when adding a LAC case status, a start date and two answers are required and the start date must be today or in the past', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('Add a case status').click();
        cy.get(`input[value=LAC]`).check();

        cy.get('input[name=startDate]').clear();
        cy.get('[data-testid=submit_button]').should('be.disabled');

        cy.get('input[name=startDate]').clear().type(futureDateFormatted);
        cy.get('[data-testid=legalStatus]').click();
        cy.contains('Date cannot be in the future').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=startDate]').clear().type(todayDate);
        cy.get('[data-testid=legalStatus]').click();
        cy.get('Date cannot be in the future').should('not.exist');
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=startDate]').clear().type(LACcaseStatusStartDate);
        cy.get('[data-testid=legalStatus]').click();
        cy.get('Date cannot be in the future').should('not.exist');
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('select[id=legalStatus]').select('C2: Full care order');
        cy.get('select[id=placementType]').select(
          'K1: Secure children’s homes'
        );
        cy.get('[data-testid=submit_button]').should('not.be.disabled');
      });

      it('should be possible to add a LAC case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('Add a case status').click();
        cy.get(`input[value=LAC]`).check();
        cy.get('input[name=startDate]').clear().type(LACcaseStatusStartDate);
        cy.get('select[id=legalStatus]').select('C2: Full care order');
        cy.get('select[id=placementType]').select(
          'K1: Secure children’s homes'
        );
        cy.get('[data-testid=submit_button]').click();

        cy.url().should('include', '/review');
        cy.contains('Looked after child').should('be.visible');
        cy.contains(LACcaseStatusStartDateText).should('be.visible');
        cy.contains('C2: Full care order').should('be.visible');
        cy.contains('K1: Secure children’s homes').should('be.visible');
        cy.contains('button', 'Yes, add this status').click();

        cy.url().should('include', '/details');
        cy.contains('Looked after child').should('be.visible');
        cy.contains(LACcaseStatusStartDateText).should('be.visible');
        cy.get('Add a case status').should('not.exist');
      });

      it('should validate when editing a LAC status that the start date cannot be in the future', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=edit]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');

        cy.get('input[name=startDate]').clear().type(futureDateFormatted);
        cy.get('[data-testid=legalStatus]').click();
        cy.contains('Date cannot be in the future').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=startDate]').clear().type(todayDate);
        cy.get('[data-testid=legalStatus]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=startDate]')
          .clear()
          .type(LACcaseStatusStartDateEdit);
        cy.get('[data-testid=legalStatus]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');
      });

      //Edit needs more work
      it('should be possible to edit a LAC case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=edit]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=startDate]')
          .clear()
          .type(LACcaseStatusStartDateEdit);
        cy.get('select[id=legalStatus]').select('E1: Placement order granted');
        cy.get('select[id=placementType]').select('P3: Residential employment');
        cy.get('[data-testid=submit_button]').click();

        cy.url().should('include', '/review');
        cy.contains('Looked after child').should('be.visible');
        cy.contains(LACcaseStatusStartDateEditText).should('be.visible');
        cy.contains('E1: Placement order granted').should('be.visible');
        cy.contains('P3: Residential employment').should('be.visible');
        cy.contains('button', 'Yes, edit').click();

        cy.url().should('include', '/details');
        cy.contains('Looked after child').should('be.visible');
        cy.contains(LACcaseStatusStartDateEditText).should('be.visible');
      });

      it('should validate when ending a LAC case status that the end date cannot be before the case status start date, start date can be in the future', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=end]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');

        cy.get('input[name=endDate]')
          .clear()
          .type(LACcaseStatusBeforeStartDate);
        cy.get('label[for=endDate]').click();
        cy.contains('Date cannot be before start date').should('be.visible');
        cy.get('[data-testid=text-field-error-message]').should('exist');

        cy.get('input[name=endDate]').clear().type(LACcaseStatusStartDate);
        cy.get('label[for=endDate]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');

        cy.get('input[name=endDate]').clear().type(futureDateFormatted);
        cy.get('label[for=endDate]').click();
        cy.get('[data-testid=text-field-error-message]').should('not.exist');
      });

      it('should be possible to end the LAC case status', () => {
        cy.visitAs(
          `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`,
          AuthRoles.ChildrensGroup
        );

        cy.contains('edit').click();
        cy.get(`input[value=end]`).check();
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/edit/edit');
        cy.get('input[name=endDate]').clear().type(LACcaseStatusStartDate);
        cy.get('select[id=episodeReason]').select('E16: Child moved abroad');
        cy.get('[data-testid=submit_button]').click();
        cy.url().should('include', '/review');
        cy.contains(LACcaseStatusStartDateText).should('be.visible');
        cy.contains('E16: Child moved abroad').should('be.visible');
        cy.contains('button', 'Yes, end').click();

        cy.url().should('include', '/details');
        cy.get('[data-testid=expand_details]').should('not.exist');
        cy.contains('Add a case status').should('be.visible');
      });
    });
  });
});
