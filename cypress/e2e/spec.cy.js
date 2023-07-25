//import { rsnumber } from '../support/data.json';

describe('Hooks', () => {
  it('session passes user 1', () => {
    cy.visit(
      'https://datatables.net/examples/basic_init/zero_configuration.html'
    );

    cy.tableSearch('#example', 'London').as('table');

    cy.get('@table').then((res) => {
      cy.log('res', res.text());
    });
  });
});
