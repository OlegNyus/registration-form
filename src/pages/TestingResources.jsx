import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import PageLinks from '../components/PageLinks';

// Sample data for testing resources
const testingResources = [
  {
    id: 1,
    title: 'Selenium WebDriver',
    description: 'Popular tool for web browser automation and testing. Supports multiple programming languages and browsers.',
    image: 'https://www.selenium.dev/images/selenium_logo_square_green.png',
    link: 'https://www.selenium.dev/'
  },
  {
    id: 2,
    title: 'Cypress',
    description: 'Modern, all-in-one testing framework for web applications with real-time reloading and automatic waiting.',
    image: 'https://www.cypress.io/images/layouts/cypress-logo.svg',
    link: 'https://www.cypress.io/'
  },
  {
    id: 3,
    title: 'Jest',
    description: 'Delightful JavaScript testing framework with a focus on simplicity and support for React applications.',
    image: 'https://jestjs.io/img/jest.png',
    link: 'https://jestjs.io/'
  },
  {
    id: 4,
    title: 'Postman',
    description: 'Complete API development and testing environment. Perfect for testing REST, GraphQL, and other API types.',
    image: 'https://www.postman.com/_ar-assets/images/postman-logo-orange.svg',
    link: 'https://www.postman.com/'
  },
  {
    id: 5,
    title: 'JMeter',
    description: 'Application designed to load test functional behavior and measure performance of web applications.',
    image: 'https://jmeter.apache.org/images/jmeter.png',
    link: 'https://jmeter.apache.org/'
  },
  {
    id: 6,
    title: 'TestNG',
    description: 'Testing framework for Java inspired by JUnit and NUnit with powerful features for parallel testing.',
    image: 'https://testng.org/images/testng-logo.png',
    link: 'https://testng.org/'
  }
];

const ResourceCard = ({ title, description, image, link }) => {
  const cardId = title.toLowerCase().replace(/\s+/g, '-');
  return (
    <div 
      data-cy={`resource-card-${cardId}`}
      data-testid={`resource-card-${cardId}`}
      className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
    >
      <div className="h-48 overflow-hidden">
        <img
          data-cy={`resource-image-${cardId}`}
          data-testid={`resource-image-${cardId}`}
          src={image}
          alt={`${title} logo`}
          className="w-full h-full object-contain p-4"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Resource+Image';
            e.target.onerror = null;
          }}
        />
      </div>
      <div className="p-6">
        <h3 
          data-cy={`resource-title-${cardId}`}
          data-testid={`resource-title-${cardId}`}
          className="text-xl font-bold text-white mb-2"
        >
          {title}
        </h3>
        <p 
          data-cy={`resource-description-${cardId}`}
          data-testid={`resource-description-${cardId}`}
          className="text-white/80 mb-4 h-20"
        >
          {description}
        </p>
        <a
          data-cy={`resource-link-${cardId}`}
          data-testid={`resource-link-${cardId}`}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
          aria-label={`Visit ${title} website`}
        >
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const TestingResources = ({ onBack }) => {
  return (
    <div 
      data-cy="testing-resources-page"
      data-testid="testing-resources-page"
      className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            data-cy="back-button"
            data-testid="back-button"
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        <div 
          data-cy="page-header"
          data-testid="page-header"
          className="text-center mb-12"
        >
          <h1 
            data-cy="page-title"
            data-testid="page-title"
            className="text-4xl font-bold text-white mb-4"
          >
            Testing Resources
          </h1>
          <p 
            data-cy="page-description"
            data-testid="page-description"
            className="text-xl text-white/80"
          >
            Explore our curated collection of popular testing tools and frameworks
          </p>
        </div>

        <div 
          data-cy="resource-grid"
          data-testid="resource-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {testingResources.map((resource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default TestingResources; 