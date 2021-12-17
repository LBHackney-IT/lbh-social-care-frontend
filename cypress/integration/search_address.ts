import { AuthRoles } from '../support/commands';

describe('Use AddressLookup to search Hackney address api', () => {
  it('using a building number & postcode', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=buildingNumber]`).click().type('1');
    cy.get(`input[id=postcode]`).click().type('SW1A 0AA');
    cy.get(`button[id=lookup-button]`).click();
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`)
      .select('THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE')
      .should('have.text', 'THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE');
  });

  it('using a postcode', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=postcode]`).click().type('SW1A 0AA');
    cy.get(`button[id=lookup-button]`).click();
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`)
      .contains('THE SPEAKERS HOUSE, 1 PARLIAMENT SQUARE')
      .should('have.length.at.least', 1);
  });

  it('using different building numbers & postcodes', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=buildingNumber]`).click().type('188');
    cy.get(`input[id=postcode]`).click().type('SE17 1JJ');
    cy.get(`button[id=lookup-button]`).click();
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`)
      .select('188 WALWORTH ROAD')
      .should('have.text', '188 WALWORTH ROAD');

    cy.get(`input[id=buildingNumber]`).click().clear().type('194');
    cy.get(`input[id=postcode]`).click().clear().type('SE17 1JJ');
    cy.get(`button[id=lookup-button]`).click();
    cy.get(`select[id=address]`).should('be.visible');
    cy.get(`select[id=address]`)
      .select('194 WALWORTH ROAD')
      .should('have.text', '194 WALWORTH ROAD');
  });
});

describe('Validates user input', () => {
  it('when no building number or postcode is entered', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`button[id=lookup-button]`).click();
    cy.contains('You entered an invalid postcode').should('be.visible');
  });

  it('when no postcode is entered', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=buildingNumber]`).click().type('1');
    cy.get(`button[id=lookup-button]`).click();
    cy.contains('You entered an invalid postcode').should('be.visible');
  });

  it('when partial postcode is entered', () => {
    cy.visitAs(`/people/add`, AuthRoles.ChildrensGroup);
    cy.get(`input[id=postcode]`).click().type('SW1A');
    cy.get(`button[id=lookup-button]`).click();
    cy.contains('You entered an invalid postcode').should('be.visible');
  });
});
