import { AuthRoles } from '../support/commands';
import { format } from 'date-fns';

const getLatestEndedStatusEndDate = (
  caseStatusIncludingEnded: any | undefined
): string | undefined => {
  if (caseStatusIncludingEnded) {
    let latestEndDate: string;
    const endedCaseData = caseStatusIncludingEnded.filter(
      (status) => status.endDate
    );
    if (endedCaseData && endedCaseData.length > 0) {
      latestEndDate = endedCaseData[0].endDate;
      endedCaseData.forEach((status) => {
        if (Date.parse(status.endDate) > Date.parse(latestEndDate)) {
          latestEndDate = status.endDate;
        }
      });
      return latestEndDate;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

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

let residentId = Cypress.env('CHILDREN_RECORD_PERSON_ID');
console.log('CIN Original residentID', residentId);
const newResident = {
  firstName: 'Todrick',
  lastName: 'Teddington',
  contextFlag: 'C',
  title: 'Ms',
  gender: 'F',
  macroEthnicity: 'Black or Black British',
  firstLanguage: 'French',
  religion: 'Sikh',
  sexualOrientation: 'Heterosexual/Straight',
  nhsNumber: 386,
  emailAddress: 'gaguripy@mailinator.com',
  preferredMethodOfContact: 'Phone',
  restricted: 'N',
  dateOfBirth: '2013-05-02',
  ethnicity: 'D.D1',
  createdBy: 'e2e.tests.adult@hackney.gov.uk',
};

describe.only('Check Case Status Feature is disabled', () => {
  it('should not be possible to add a Case Status on a child', () => {
    cy.visitAs(`/people/${residentId}`, AuthRoles.ChildrensGroup);
    cy.get('Add a case status').should('not.exist');
  });

  it('should not be possible to view a Case Status on a child', () => {
    cy.visitAs(`/people/${residentId}/details`, AuthRoles.ChildrensGroup);
    cy.url().should('include', '/details');
    cy.contains('Child in need').should('not.exist');
  });
});

xdescribe('Using CIN case status', () => {
  beforeEach(() => {
    // This is required as the email address stored in the cookie is not an
    // existing worker.
    cy.intercept('POST', `/api/casestatus`, (req) => {
      req.body.createdBy = 'e2e.tests.adult@hackney.gov.uk';
    });
    cy.intercept('POST', `/api/casestatus/update/**`, (req) => {
      req.body.createdBy = 'e2e.tests.adult@hackney.gov.uk';
    });
    cy.intercept('PATCH', '/api/casestatus/**', (req) => {
      req.body.editedBy = 'e2e.tests.adult@hackney.gov.uk';
    });
    cy.intercept('GET', '/api/residents/**/casestatus**').as('getCaseStatus');
  });

  describe('As a user in the Adults group', () => {
    it('should not be possible to add a case status on an adult record', () => {
      cy.visitAs(`/people/${residentId}`, AuthRoles.AdultsGroup);
      cy.get('Add a case status').should('not.exist');
    });
  });

  describe('As a user in the Childrens group', () => {
    it('should check for any existing case status before all other CIN tests & if one exists then use a newly created resident to run tests against', () => {
      cy.visitAs(`/people/${residentId}/details`, AuthRoles.ChildrensGroup);
      cy.wait('@getCaseStatus');
      cy.request(
        'GET',
        `/api/residents/${Cypress.env(
          'CHILDREN_RECORD_PERSON_ID'
        )}/casestatus?include_closed_cases=false`
      ).then((response) => {
        if (response.body.length > 0) {
          cy.request('POST', `/api/residents`, newResident).then(
            (postResponse) => {
              residentId = postResponse.body.id;
              console.log('CIN NEW residentID', residentId);
            }
          );
        } else {
          cy.request(
            'GET',
            `/api/residents/${Cypress.env(
              'CHILDREN_RECORD_PERSON_ID'
            )}/casestatus?include_closed_cases=true`
          ).then((endDateResponse) => {
            const latestEndDate = getLatestEndedStatusEndDate(
              endDateResponse.body
            );
            if (
              latestEndDate &&
              latestEndDate != undefined &&
              new Date(latestEndDate) > new Date(caseStatusStartDate)
            ) {
              cy.request('POST', `/api/residents`, newResident).then(
                (newPostResponse) => {
                  residentId = newPostResponse.body.id;
                  console.log('CIN- NEW personID', residentId);
                }
              );
            }
          });
        }
      });
    });

    it('should validate that when adding a CIN case status, a start date is required and the start date must be today or in the past', () => {
      cy.visitAs(`/people/${residentId}`, AuthRoles.ChildrensGroup);

      cy.contains('Add a case status').click();
      cy.get(`input[value=CIN]`).check();

      cy.get('input[name=startDate]').clear();
      cy.get('[data-testid=submit_button]').should('be.disabled');

      cy.get('input[name=startDate]').clear().type(futureDateFormatted);
      cy.get('textarea[name=notes]').click();
      cy.contains(/Date cannot be/).should('be.visible');
      cy.get('[data-testid=text-field-error-message]').should('exist');

      cy.get('input[name=startDate]').clear().type(todayDate);
      cy.get('textarea[name=notes]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');

      cy.get('input[name=startDate]').clear().type(caseStatusStartDate);
      cy.get('textarea[name=notes]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');
    });

    it('should be possible to add a CIN case status', () => {
      cy.visitAs(`/people/${residentId}`, AuthRoles.ChildrensGroup);

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
      cy.visitAs(`/people/${residentId}/details`, AuthRoles.ChildrensGroup);

      cy.contains('a', 'Edit / End', {
        timeout: 20000,
      }).click();
      cy.get(`input[value=edit]`).check();
      cy.get('[data-testid=submit_button]').click();
      cy.url().should('include', '/edit/edit');
      cy.get('input[name=startDate]').clear().type(futureDateFormatted);
      cy.get('textarea[name=notes]').click();
      cy.contains(/Date cannot be/).should('be.visible');
      cy.get('[data-testid=text-field-error-message]').should('exist');

      cy.get('input[name=startDate]').clear().type(todayDate);
      cy.get('textarea[name=notes]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');

      cy.get('input[name=startDate]').clear().type(caseStatusStartDateEdit);
      cy.get('textarea[name=notes]').click();
      cy.get('[data-testid=text-field-error-message]').should('not.exist');
    });

    it('should be possible to edit a CIN case status', () => {
      cy.visitAs(`/people/${residentId}/details`, AuthRoles.ChildrensGroup);

      cy.contains('a', 'Edit / End', {
        timeout: 20000,
      }).click();
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
      cy.contains('this is an updated test note').should('be.visible');
    });

    it('should validate when ending a CIN case status that the end date cannot be before the case status start date, start date can be in the future', () => {
      cy.visitAs(`/people/${residentId}/details`, AuthRoles.ChildrensGroup);

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

    it('should be possible to end the CIN case status', () => {
      cy.visitAs(`/people/${residentId}/details`, AuthRoles.ChildrensGroup);
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
      cy.visitAs(`/people/${residentId}`, AuthRoles.ChildrensGroup);
      cy.wait('@getCaseStatus');
      cy.contains('Add a case status', {
        timeout: 30000,
      })
        .scrollIntoView()
        .should('be.visible');
    });

    it('should not allow you to create a new case status before the previous status end date', () => {
      cy.visitAs(`/people/${residentId}`, AuthRoles.ChildrensGroup);

      cy.contains('Add a case status').click();
      cy.get(`input[value=CIN]`).check();

      cy.get('input[name=startDate]').clear();
      cy.get('[data-testid=submit_button]').should('be.disabled');

      cy.get('input[name=startDate]').clear().type(invalidCaseStatusStartDate);
      cy.get('textarea[name=notes]').click();
      cy.contains(/Date cannot be/).should('be.visible');
      cy.get('[data-testid=text-field-error-message]').should('exist');
    });
  });
});
