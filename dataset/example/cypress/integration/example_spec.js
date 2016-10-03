/* global describe, beforeEach, it, cy, context */
/* eslint xo/filename-case: 0 */

describe('Project χ', () => {
  context('home', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('cy.should - assert that <title> is correct', () => {
      cy.title().should('include', 'Project-χ');
    });

    it('cy.should - should have an index', () => {
      cy.get('index').find('.card').should('have.length', 7);
    });
  });

  context('examples/bars', () => {
    beforeEach(() => {
      cy.visit(`/examples/bars`);
    });

    it('cy.get() - query DOM elements', () => {
      cy.get('#_examples_bars__chart svg')
        .should('have.attr', 'title', 'Bar Chart');

      cy.get('#_examples_bars__chart svg')
        .find('rect').should('have.length', 26);
    });
  });

  context('examples/treemap', () => {
    beforeEach(() => {
      cy.visit(`/examples/treemap`);
    });

    it('cy.get() - query DOM elements', () => {
      cy.get('#_examples_treemap__chart')
        .find('.treemap').should('have.length', 2);
    });
  });

  context('examples/biojs', () => {
    beforeEach(() => {
      cy.visit(`/examples/biojs`);
    });

    it('cy.get() - query DOM elements', () => {
      cy.get('#_examples_biojs__viewer')
        .find('.chart').should('have.length', 13);
    });
  });

  context('examples/chiasm', () => {
    beforeEach(() => {
      cy.visit(`/examples/chiasm`);
    });

    it('cy.get() - query DOM elements', () => {
      cy.get('#_example_chiasm__container svg')
        .should('have.attr', 'title', 'Chiasm Chart');
    });
  });

  context('examples/vega', () => {
    beforeEach(() => {
      cy.visit(`/examples/vega`);
    });

    it('cy.get() - query DOM elements', () => {
      cy.get('#_examples_vega__chart svg')
        .should('have.attr', 'class', 'marks');

      cy.get('#_examples_vega__chart svg .mark-rect')
        .find('rect').should('have.length', 26);
    });
  });

  context('examples/polymer', () => {
    beforeEach(() => {
      cy.visit(`/examples/polymer`);
    });

    it('cy.get() - query DOM elements', () => {
      cy.get('#chart svg')
        .should('have.attr', 'title', 'Bar Chart');

      cy.get('#chart svg')
        .find('rect').should('have.length', 26);
    });
  });

  context('examples/universe', () => {
    beforeEach(() => {
      cy.visit(`/examples/universe`);
    });

    it('cy.get() - query DOM elements', () => {
      cy.get('#charts').find('svg')
        .should('have.length', 3);
    });
  });
});
