describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://localhost:5173/')
        cy.injectAxe()
        cy.checkA11y(null, {
            rules: {
                'page-has-heading-one': { enabled: false } // ignore missing H1
            }
        }, (violations) => {
                cy.task('log', `${violations.length} accessibility violation(s)`)
                cy.task('table', violations)
            })

    });
});
