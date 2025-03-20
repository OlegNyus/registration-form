describe('Testing Resources Page - Smoke Tests', () => {
  beforeEach(() => {
    // Start from the home page
    cy.visit('/')
  })

  it('should load the home page', () => {
    // Basic test to verify the app loads
    cy.get('body').should('be.visible')
  })

  it('should have navigation elements', () => {
    // Verify basic navigation structure
    cy.get('nav').should('exist')
  })

  describe('Navigation', () => {
    it('TC-NAV-001: should access Testing Resources page via navigation bar', () => {
      // Click Testing Resources in navigation
      cy.get('a[href="#testing-resources"]').click()

      // Verify URL change
      cy.location('hash').should('eq', '#testing-resources')

      // Verify page content
      cy.get('[data-cy="testing-resources-page"]').should('be.visible')
      cy.get('[data-cy="page-title"]').should('contain.text', 'Testing Resources')
      cy.get('[data-cy="resource-grid"]').should('be.visible')
    })

    it('TC-NAV-002: should access Testing Resources page via direct URL', () => {
      // Visit page directly
      cy.visit('/#testing-resources')

      // Verify page loads correctly
      cy.get('[data-cy="testing-resources-page"]').should('be.visible')
      cy.get('[data-cy="page-header"]').within(() => {
        cy.get('[data-cy="page-title"]').should('be.visible')
        cy.get('[data-cy="page-description"]').should('be.visible')
      })
      cy.get('[data-cy="back-button"]').should('be.visible')
    })

    it('TC-NAV-003: should navigate back to home page', () => {
      cy.visit('/#testing-resources')
      cy.get('[data-cy="back-button"]').click()
      cy.location('hash').should('eq', '#home')
    })
  })

  describe('Resource Cards', () => {
    beforeEach(() => {
      cy.visit('/#testing-resources')
    })

    it('TC-CARD-001: should display resource cards with correct content', () => {
      // Test first resource card (Selenium WebDriver)
      cy.get('[data-cy="resource-card-selenium-webdriver"]').within(() => {
        cy.get('[data-cy="resource-title-selenium-webdriver"]')
          .should('contain.text', 'Selenium WebDriver')
        cy.get('[data-cy="resource-description-selenium-webdriver"]')
          .should('contain.text', 'Popular tool for web browser automation')
        cy.get('[data-cy="resource-image-selenium-webdriver"]')
          .should('be.visible')
          .and('have.attr', 'alt', 'Selenium WebDriver logo')
        cy.get('[data-cy="resource-link-selenium-webdriver"]')
          .should('have.attr', 'href', 'https://www.selenium.dev/')
          .and('have.attr', 'target', '_blank')
      })
    })

    it('TC-CARD-002: should handle image load errors gracefully', () => {
      // Set up intercept before visiting the page
      cy.intercept(
        'GET',
        'https://www.selenium.dev/images/selenium_logo_square_green.png',
        {
          statusCode: 404,
          body: 'Not Found'
        }
      ).as('imageRequest')
      
      // Visit the page after setting up intercept
      cy.visit('/#testing-resources')
      
      // Wait for the image request to complete
      cy.wait('@imageRequest', { timeout: 10000 })
      
      // Verify placeholder image is shown
      cy.get('[data-cy="resource-image-selenium-webdriver"]')
        .should('have.attr', 'src')
        .and('eq', 'https://via.placeholder.com/400x300?text=Resource+Image')
    })

    it('TC-CARD-003: should verify all resource cards are present', () => {
      cy.get('[data-cy="resource-grid"]')
        .find('[data-cy^="resource-card-"]')
        .should('have.length', 6)
    })
  })

  describe('Responsive Layout', () => {
    beforeEach(() => {
      cy.visit('/#testing-resources')
    })

    it('TC-RESP-001: should display correctly on mobile viewport', () => {
      cy.viewport('iphone-x')
      
      // Wait for any CSS transitions to complete
      cy.wait(500)
      
      // Verify single column layout
      cy.get('[data-cy="resource-grid"]')
        .should('have.css', 'display', 'grid')
        .should(($el) => {
          const gridCols = window.getComputedStyle($el[0]).gridTemplateColumns.split(' ').length
          expect(gridCols).to.equal(1)
        })
      
      // Verify no horizontal scroll
      cy.get('[data-cy="testing-resources-page"]')
        .should('be.visible')
        .and(($el) => {
          const hasScroll = $el[0].scrollWidth > $el[0].clientWidth
          expect(hasScroll).to.be.false
        })
      
      // Verify touch targets are large enough
      cy.get('[data-cy="back-button"]')
        .should(($el) => {
          expect($el.outerHeight()).to.be.at.least(44)
        })
      
      cy.get('[data-cy^="resource-link-"]')
        .first()
        .should(($el) => {
          expect($el.outerHeight()).to.be.at.least(44)
        })
    })

    it('TC-RESP-002: should display correctly on tablet viewport', () => {
      cy.viewport('ipad-2')
      
      // Wait for any CSS transitions to complete
      cy.wait(500)
      
      // Verify two-column layout
      cy.get('[data-cy="resource-grid"]')
        .should('have.css', 'display', 'grid')
        .should(($el) => {
          const gridCols = window.getComputedStyle($el[0]).gridTemplateColumns.split(' ').length
          expect(gridCols).to.equal(2)
        })
    })

    it('TC-RESP-003: should display correctly on desktop viewport', () => {
      cy.viewport(1280, 720)
      
      // Wait for any CSS transitions to complete
      cy.wait(500)
      
      // Verify three-column layout
      cy.get('[data-cy="resource-grid"]')
        .should('have.css', 'display', 'grid')
        .should(($el) => {
          const gridCols = window.getComputedStyle($el[0]).gridTemplateColumns.split(' ').length
          expect(gridCols).to.equal(3)
        })
    })
  })

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/#testing-resources')
    })

    it('TC-A11Y-001: should support keyboard navigation', () => {
      // Focus the back button
      cy.get('[data-cy="back-button"]').focus()
      
      // Use keyboard to navigate through all focusable elements
      cy.get('[data-cy="back-button"]').trigger('keydown', { keyCode: 9 }) // Tab key
      
      // Verify focus moved to first resource link
      cy.get('[data-cy="resource-link-selenium-webdriver"]')
        .should('be.focused')
      
      // Verify all resource links are focusable
      cy.get('[data-cy^="resource-link-"]').each(($link) => {
        cy.wrap($link)
          .focus()
          .should(($el) => {
            const styles = window.getComputedStyle($el[0])
            expect(styles.outline || styles.boxShadow).to.not.equal('none')
          })
      })
    })

    it('TC-A11Y-002: should have proper ARIA attributes', () => {
      cy.get('[data-cy="page-title"]')
        .should('have.prop', 'tagName', 'H1')
      
      cy.get('[data-cy^="resource-link-"]')
        .should('have.attr', 'rel', 'noopener noreferrer')
    })
  })
}) 