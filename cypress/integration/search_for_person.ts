import { AuthRoles } from '../support/commands';

describe('Search for a person', () => {
  describe('As a user in the Childrens group', () => {
    it('should show a list that contains children records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.ChildrensGroup);
      cy.contains('Name').type(Cypress.env('CHILDREN_RECORD_FULL_NAME'));
      cy.get('[type="submit"]').click();

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('CHILDREN_RECORD_PERSON_ID')
      );

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('CHILDREN_RECORD_FULL_NAME')
      );

      cy.contains('Load more').should('not.exist');
    });

    it('should show a list that contains adult records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.ChildrensGroup);
      cy.contains('Name').type(Cypress.env('ADULT_RECORD_FULL_NAME'));
      cy.get('[type="submit"]').click();

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('ADULT_RECORD_PERSON_ID')
      );

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('ADULT_RECORD_FULL_NAME')
      );

      cy.contains('Load more').should('not.exist');
    });

    it('should not redirect to login page after clicking "clear search" twice', () => {
      cy.visitAs('/search', AuthRoles.ChildrensGroup);

      cy.contains('Name').type(Cypress.env('ADULT_RECORD_FULL_NAME'));

      cy.get('#clear-link').click();
      cy.get('#clear-link').click();

      cy.url().should('include', '/search');
    });
  });

  describe('As a user in the Adults group', () => {
    it('should show a list that contains children records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdultsGroup);

      cy.contains('Name').type(Cypress.env('CHILDREN_RECORD_FULL_NAME'));
      cy.get('[type="submit"]').click();

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('CHILDREN_RECORD_PERSON_ID')
      );

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('CHILDREN_RECORD_FULL_NAME')
      );
      cy.contains('Load more').should('not.exist');
    });

    it('should show a list that contains adult records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdultsGroup);

      cy.contains('Name').type(Cypress.env('ADULT_RECORD_FULL_NAME'));
      cy.get('[type="submit"]').click();

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('ADULT_RECORD_PERSON_ID')
      );

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('ADULT_RECORD_FULL_NAME')
      );
      cy.contains('Load more').should('not.exist');
    });
  });

  describe('As a user in the Admin Dev group', () => {
    it('show a list of records that match the Mosaic ID when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdminDevGroup);

      cy.get('[data-testid="mosaic_id"]').type(Cypress.env('MOSAIC_ID_TEST'));
      cy.get('[type="submit"]').click();
      cy.get('td a').click();
      cy.contains(Cypress.env('NAME_FOR_MOSAIC_ID_TEST')).should('be.visible');
      cy.contains('Load more').should('not.exist');
    });

    it('should show a list that contains adult records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdminDevGroup);

      cy.contains('Name').type(Cypress.env('ADULT_RECORD_FULL_NAME'));
      cy.get('form').submit();
      cy.contains(Cypress.env('ADULT_RECORD_FULL_NAME')).should('be.visible');
      cy.contains('Load more').should('not.exist');
    });

    it('should show a list that contains children records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdminDevGroup);

      cy.contains('Name').type(Cypress.env('CHILDREN_RECORD_FULL_NAME'));
      cy.get('[type="submit"]').click();
      cy.contains(
        `${Cypress.env('CHILDREN_RECORD_FIRST_NAME')} ${Cypress.env(
          'CHILDREN_RECORD_LAST_NAME'
        )}`
      );
      cy.contains('Load more').should('not.exist');
      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).click();
      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should(
        'be.visible'
      );
    });

    describe('test fuzzy name search', () => {
      it('should return correct person when one letter wrong in first name', () => {
        cy.visitAs('/search', AuthRoles.AdminDevGroup);

        cy.contains('Name').type('Cristoball');
        cy.get('[type="submit"]').click();

        cy.get('[data-testid="residents-table"]').contains(
          Cypress.env('CHILDREN_RECORD_PERSON_ID')
        );

        cy.get('[data-testid="residents-table"]').contains(
          Cypress.env('CHILDREN_RECORD_FULL_NAME')
        );

        cy.contains('Load more').should('not.exist');
      });

      it('should return correct person when one letter incorrect in first name & one letter incorrect in last name', () => {
        cy.visitAs('/search', AuthRoles.AdminDevGroup);

        cy.contains('Name').type('Cristubal CawFell');
        cy.get('[type="submit"]').click();

        cy.get('[data-testid="residents-table"]').contains(
          Cypress.env('CHILDREN_RECORD_PERSON_ID')
        );

        cy.get('[data-testid="residents-table"]').contains(
          Cypress.env('CHILDREN_RECORD_FULL_NAME')
        );

        cy.contains('Load more').should('not.exist');
      });

      it.only('should return correct person when we have 2 persons with same name but different date of birth', () => {
        cy.visitAs('/search', AuthRoles.AdminDevGroup);

        cy.contains('Name').type('Qumendus');
        cy.get('input[name=date_of_birth-day]').type('01');
        cy.get('input[name=date_of_birth-month]').type('06');
        cy.get('input[name=date_of_birth-year]').type('2000');
        cy.get('[type="submit"]').click();

        cy.get('[data-testid="residents-table"]').contains('Qumendus Quality');

        cy.get('[data-testid="residents-table"]').contains('50000362');
        cy.get('[data-testid="residents-table"]')
          .contains('Qumendus Quality')
          .should('have.length', 1);
      });
    });
  });
});
