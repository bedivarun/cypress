// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//ß
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('rsnumber', () => {
  cy.visit(
    'https://datatables.net/examples/basic_init/zero_configuration.html'
  );
  cy.get('table > tbody > tr > td')
    .eq(0)
    .then(($val) => {
      cy.writeFile('cypress/support/data.json', { rsnumber: $val.text() });
    });
});

Cypress.Commands.add('tableSearch', (tableId, lookFor) => {
  cy.get('body').then(($body) => {
    if ($body.find(tableId).length > 0) {
      cy.get(tableId + ' tr').then(($tr) => {
        const tableLength = $tr.length;
        if (tableLength > 0) {
          cy.get($tr)
            .find('td')
            .then(($td) => {
              if ($td.text().includes(lookFor)) {
                return cy
                  .get($td)
                  .contains(lookFor)
                  .then(($res) => $res.parent());
              } else {
                const div = document.createElement('div');
                const divText = document.createTextNode('Table data not found');
                div.appendChild(divText);
                return cy.wrap(div);
              }
            });
        }
      });
    } else {
      const div = document.createElement('div');
      const divText = document.createTextNode('table not found');
      div.appendChild(divText);
      return cy.wrap(div);
    }
  });
});

Cypress.Commands.add('random', (input) => {
  // program to generate random strings
  const result = Math.random().toString(36).substring(2, 5);
  cy.get(input).type(result);
});
