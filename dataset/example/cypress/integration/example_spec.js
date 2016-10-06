/* global describe, beforeEach, it, cy, context */
/* eslint xo/filename-case: 0 */

describe('Project χ - examples', () => {
  context('home', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('<title> is correct and have an index', () => {
      cy.title().should('include', 'Project-χ');
      cy.get('index').find('.card').should('have.length', 7);
    });
  });

  context('examples/bars', () => {
    beforeEach(() => {
      cy.visit(`/examples/bars`);
    });

    it('should generate a bar chart', () => {
      cy.get('#_examples_bars__chart svg')
        .should('have.attr', 'title', 'Bar Chart');

      cy.get('#_examples_bars__chart svg')
        .find('rect').should('have.length', 26);
    });

    it('should update a resource', () => {
      cy.get('#datapckage-editor').find('#toogle-panel').click()
        .get('#dataPackageEditor').find('textarea.editor').should('be.hidden')
          .type('{selectall}letter\tfrequency\nA\t.08167\nB\t.01492\n', {force: true})
        .get('#datapckage-editor').find('button[type="submit"]').click()
        .get('#_examples_bars__chart svg')
          .find('rect').should('have.length', 2);
    });

    it('should add a resource', () => {
      cy.get('#datapckage-editor').find('#toogle-panel').click()
        .get('#datapckage-editor').find('#data-add').click()
        .get('#dataPackageEditor').find('textarea.editor').last().should('be.hidden')
          .type(`{selectall}letter\tfrequency\nA\t.08167\nB\t.01492\n`, {force: true})
        .get('#datapckage-editor').find('button[type="submit"]').click()
        .get('#_examples_bars__chart svg').first()
          .find('rect').should('have.length', 26)
        .get('#_examples_bars__chart svg').last()
          .find('rect').should('have.length', 2);
    });
  });

  context('treemap', () => {
    beforeEach(() => {
      cy.visit(`/examples/treemap`);
    });

    it('should generate a treemap', () => {
      cy.get('#_examples_treemap__chart')
        .find('.treemap').should('have.length', 2);
    });

    it('should delete a resource', () => {
      cy.get('#datapckage-editor').find('#toogle-panel').click()
        .get('#dataPackageEditor').find('a.close').first().click()
        .get('#datapckage-editor').find('button[type="submit"]').click()
        .get('#_examples_treemap__chart')
          .find('.treemap').should('have.length', 1);
    });
  });

  context('examples/biojs', () => {
    beforeEach(() => {
      cy.visit(`/examples/biojs`);
    });

    it('should generate a biojs viewer', () => {
      cy.get('#_examples_biojs__viewer')
        .find('.chart').should('have.length', 13);
    });
  });

  context('examples/chiasm', () => {
    beforeEach(() => {
      cy.visit(`/examples/chiasm`);
    });

    it('should generate a chiasm chart', () => {
      cy.get('#_example_chiasm__container svg')
        .should('have.attr', 'title', 'Chiasm Chart');

      cy.get('#_example_chiasm__container .chiasm-component-myBarChart')
        .find('rect').should('have.length', 26 + 5);
    });

    it('should update a resource', () => {
      cy.get('#datapckage-editor').find('#toogle-panel').click()
        .get('#dataPackageEditor').find('textarea.editor').first().should('be.hidden')
          .type('{selectall}letter\tfrequency\nA\t.08167\nB\t.01492\n', {force: true})
        .get('#datapckage-editor').find('button[type="submit"]').click()
        .get('#_example_chiasm__container .chiasm-component-myBarChart')
          .find('rect').should('have.length', 2 + 5);
    });
  });

  context('examples/vega', () => {
    beforeEach(() => {
      cy.visit(`/examples/vega`);
    });

    it('should generate a vega chart', () => {
      cy.get('#_examples_vega__chart svg')
        .should('have.attr', 'class', 'marks');

      cy.get('#_examples_vega__chart svg .mark-rect')
        .find('rect').should('have.length', 26);
    });

    it('should update a resource', () => {
      cy.get('#datapckage-editor').find('#toogle-panel').click()
        .get('#dataPackageEditor').find('textarea.editor').last().should('be.hidden')
          .type('{selectall}letter\tfrequency\nA\t.08167\nB\t.01492\n', {force: true})
        .get('#datapckage-editor').find('button[type="submit"]').click()
        .get('#_examples_vega__chart svg .mark-rect')
          .find('rect').should('have.length', 2);
    });
  });

  context('examples/polymer', () => {
    beforeEach(() => {
      cy.visit(`/examples/polymer`);
    });

    it('should generate a polymer chart', () => {
      cy.get('#chart svg')
        .should('have.attr', 'title', 'Bar Chart');

      cy.get('#chart svg')
        .find('rect').should('have.length', 26);
    });

    it('should update a resource', () => {
      cy.get('#datapckage-editor').find('#toogle-panel').click()
        .get('#dataPackageEditor').find('textarea.editor').last().should('be.hidden')
          .type('{selectall}letter\tfrequency\nA\t.08167\nB\t.01492\n', {force: true})
        .get('#datapckage-editor').find('button[type="submit"]').click()
        .get('#chart svg')
          .find('rect').should('have.length', 2);
    });
  });

  context('examples/universe', () => {
    beforeEach(() => {
      cy.visit(`/examples/universe`);
    });

    it('should generate a charts', () => {
      cy.get('#charts').find('svg')
        .should('have.length', 3);
    });
  });
});
