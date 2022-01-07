import { AuthRoles } from '../support/commands';

describe('Use AddressLookup to search Hackney address api', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/postcode/**').as('postcodeApi');
  });
  it('using a building number & postcode', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=building-number]`).click().type('1');
    cy.get(`input[id=postcode]`).click().type('SW1A 0AA');
    cy.get(`button[id=lookup-button]`).click();
    cy.wait('@postcodeApi');
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`)
      .select('THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE')
      .should('have.text', 'THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE');
  });

  it('using just a postcode', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=postcode]`).click().type('SW1A 0AA');
    cy.get(`button[id=lookup-button]`).click();
    cy.wait('@postcodeApi');
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`)
      .contains('THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE')
      .should('have.length.at.least', 1);
  });

  it('using different building numbers & postcodes', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=building-number]`).click().type('188');
    cy.get(`input[id=postcode]`).click().type('SE17 1JJ');
    cy.get(`button[id=lookup-button]`).click();
    cy.wait('@postcodeApi');
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`)
      .select('188 WALWORTH ROAD')
      .should('have.text', '188 WALWORTH ROAD');

    cy.get(`input[id=building-number]`).click().clear().type('194');
    cy.get(`input[id=postcode]`).click().clear().type('SE17 1JJ');
    cy.get(`button[id=lookup-button]`).click();
    cy.wait('@postcodeApi');
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`)
      .select('194 WALWORTH ROAD')
      .should('have.text', '194 WALWORTH ROAD');
  });

  it('returns all matching addresses', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=building-number]`).click().clear();
    cy.get(`input[id=postcode]`).click().clear().type('E5 8RP');
    cy.get(`button[id=lookup-button]`).click();
    cy.wait('@postcodeApi');
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`).select('101 DURLSTON ROAD, HACKNEY');
    cy.contains(/101 DURLSTON ROAD, HACKNEY/).should('be.visible');
  });
});
