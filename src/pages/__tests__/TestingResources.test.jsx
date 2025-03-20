import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TestingResources from '../TestingResources';
import { ArrowLeft, ExternalLink } from 'lucide-react';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />
}));

// Mock the PageLinks component
jest.mock('../../components/PageLinks', () => {
  return function MockPageLinks() {
    return <div data-testid="page-links" />;
  };
});

describe('TestingResources Component', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
    render(<TestingResources onBack={mockOnBack} />);
  });

  describe('Layout and Structure', () => {
    test('should render all main components', () => {
      expect(screen.getByTestId('testing-resources-page')).toBeInTheDocument();
      expect(screen.getByTestId('back-button')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toHaveTextContent('Testing Resources');
    });

    test('should render correct number of resource cards', () => {
      const cards = screen.getAllByTestId(/^resource-card-/);
      expect(cards).toHaveLength(6);
    });
  });

  describe('Resource Cards', () => {
    test('should render each resource card with correct content', () => {
      const seleniumCard = screen.getByTestId('resource-card-selenium-webdriver');
      expect(seleniumCard).toBeInTheDocument();
      
      const cardContent = within(seleniumCard);
      expect(cardContent.getByTestId('resource-title-selenium-webdriver')).toHaveTextContent('Selenium WebDriver');
      expect(cardContent.getByTestId('resource-description-selenium-webdriver')).toBeInTheDocument();
      expect(cardContent.getByTestId('resource-link-selenium-webdriver')).toHaveAttribute('href', 'https://www.selenium.dev/');
    });

    test('should handle image load errors correctly', () => {
      const img = screen.getByTestId('resource-image-selenium-webdriver');
      fireEvent.error(img);
      expect(img).toHaveAttribute('src', expect.stringContaining('placeholder'));
    });

    test('should apply hover effects on resource cards', async () => {
      const card = screen.getByTestId('resource-card-selenium-webdriver');
      await userEvent.hover(card);
      expect(card).toHaveClass('hover:transform', 'hover:scale-105');
    });
  });

  describe('Navigation and Interaction', () => {
    test('should call onBack when back button is clicked', async () => {
      const backButton = screen.getByTestId('back-button');
      await userEvent.click(backButton);
      expect(mockOnBack).toHaveBeenCalled();
    });

    test('should open links in new tab', () => {
      const links = screen.getAllByTestId(/^resource-link-/);
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    test('should handle keyboard navigation', async () => {
      const backButton = screen.getByTestId('back-button');
      await userEvent.tab();
      expect(backButton).toHaveFocus();
      
      const resourceLinks = screen.getAllByTestId(/^resource-link-/);
      for (const link of resourceLinks) {
        await userEvent.tab();
        expect(document.activeElement).toBe(link);
      }
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<TestingResources onBack={mockOnBack} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Testing Resources');
    });

    it('should have proper ARIA attributes on interactive elements', () => {
      render(<TestingResources onBack={mockOnBack} />);
      
      const backButton = screen.getByTestId('back-button');
      expect(backButton).toHaveAttribute('aria-label', 'Back to Home');
      
      const resourceLinks = screen.getAllByTestId(/^resource-link-/);
      resourceLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-label');
      });
    });

    it('should provide alt text for all images', () => {
      render(<TestingResources onBack={mockOnBack} />);
      
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.alt).not.toBe('');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should apply correct grid classes for different viewports', () => {
      render(<TestingResources onBack={mockOnBack} />);
      
      const grid = screen.getByTestId('resource-grid');
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
    });

    it('should ensure touch targets are large enough', () => {
      render(<TestingResources onBack={mockOnBack} />);
      
      const backButton = screen.getByTestId('back-button');
      const computedStyle = window.getComputedStyle(backButton);
      expect(parseInt(computedStyle.minHeight)).toBeGreaterThanOrEqual(44);
      
      const resourceLinks = screen.getAllByTestId(/^resource-link-/);
      resourceLinks.forEach(link => {
        const linkStyle = window.getComputedStyle(link);
        expect(parseInt(linkStyle.minHeight)).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing onBack prop gracefully', () => {
      // Should not throw when onBack is not provided
      expect(() => render(<TestingResources />)).not.toThrow();
    });

    it('should handle malformed resource data gracefully', () => {
      // Mock console.error to prevent noise in test output
      const originalError = console.error;
      console.error = jest.fn();

      const TestingResourcesWithProps = () => {
        const malformedResources = [
          { id: 1 }, // Missing required fields
          { id: 2, title: 'Test', description: null, image: '', link: undefined }
        ];
        return <TestingResources resources={malformedResources} onBack={mockOnBack} />;
      };

      render(<TestingResourcesWithProps />);
      
      // Should still render without crashing
      expect(screen.getByTestId('resource-grid')).toBeInTheDocument();

      // Restore console.error
      console.error = originalError;
    });
  });

  describe('Performance', () => {
    it('should render efficiently without unnecessary updates', () => {
      const { rerender } = render(<TestingResources onBack={mockOnBack} />);
      
      // Get initial render content
      const initialContent = screen.getByTestId('resource-grid').innerHTML;
      
      // Rerender with same props
      rerender(<TestingResources onBack={mockOnBack} />);
      
      // Content should be identical (no unnecessary updates)
      expect(screen.getByTestId('resource-grid').innerHTML).toBe(initialContent);
    });
  });
}); 