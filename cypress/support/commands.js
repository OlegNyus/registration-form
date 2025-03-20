// Import commands.js using ES2015 syntax:
import '@testing-library/cypress/add-commands'

// Custom command to get element by data-cy attribute
Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`)
})

// Custom command to check a resource card's content
Cypress.Commands.add('checkResourceCard', ({ title, description, image, link }) => {
  const cardId = title.toLowerCase().replace(/\s+/g, '-')
  cy.get(`[data-cy="resource-card-${cardId}"]`).within(() => {
    cy.get(`[data-cy="resource-title-${cardId}"]`).should('contain.text', title)
    cy.get(`[data-cy="resource-description-${cardId}"]`).should('contain.text', description)
    cy.get(`[data-cy="resource-image-${cardId}"]`)
      .should('be.visible')
      .and('have.attr', 'src', image)
    cy.get(`[data-cy="resource-link-${cardId}"]`)
      .should('have.attr', 'href', link)
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
  })
})

// Custom command to check responsive layout
Cypress.Commands.add('checkResponsiveLayout', (viewport) => {
  const layouts = {
    mobile: '1fr',
    tablet: 'repeat(2, 1fr)',
    desktop: 'repeat(3, 1fr)'
  }
  
  cy.get('[data-cy="resource-grid"]')
    .invoke('css', 'grid-template-columns')
    .should('match', new RegExp(layouts[viewport]))
}) 