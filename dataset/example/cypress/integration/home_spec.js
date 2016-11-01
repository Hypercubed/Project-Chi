/* global describe, beforeEach, it, cy, context */
/* eslint unicorn/filename-case: 0 */

describe('Project χ', () => {
  context('home', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('<title> is correct and have an index', () => {
      cy.title().should('include', 'Project-χ');
      cy.get('index').find('.card').should('have.length', 7);
    });
  });
});
