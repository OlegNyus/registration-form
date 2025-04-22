import React from 'react';

const TestingResources = ({ onBack }) => {
  const testingTools = [
    {
      id: 1,
      name: 'Cypress',
      description: 'Fast, easy and reliable testing for anything that runs in a browser. Cypress is a front-end testing tool built for the modern web.',
      logo: '/assets/testing-logos/cypress.svg',
      url: 'https://www.cypress.io/',
      dataCy: 'cypress-card'
    },
    {
      id: 2,
      name: 'Playwright',
      description: 'Reliable end-to-end testing for modern web apps. Playwright enables cross-browser web automation that is ever-green, capable, reliable and fast.',
      logo: '/assets/testing-logos/playwright.svg',
      url: 'https://playwright.dev/',
      dataCy: 'playwright-card'
    },
    {
      id: 3,
      name: 'Appium',
      description: 'An open-source automation tool for running scripts and testing native, mobile web, and hybrid applications on iOS and Android platforms.',
      logo: '/assets/testing-logos/appium.svg',
      url: 'https://appium.io/',
      dataCy: 'appium-card'
    },
    {
      id: 4,
      name: 'Selenium',
      description: 'A portable framework for testing web applications. Selenium provides a playback tool for authoring functional tests without learning a test scripting language.',
      logo: '/assets/testing-logos/selenium.svg',
      url: 'https://www.selenium.dev/',
      dataCy: 'selenium-card'
    },
    {
      id: 5,
      name: 'Postman',
      description: 'A collaboration platform for API development. Postman simplifies each step of the API lifecycle and streamlines collaboration.',
      logo: '/assets/testing-logos/postman.svg',
      url: 'https://www.postman.com/',
      dataCy: 'postman-card'
    },
    {
      id: 6,
      name: 'WebdriverIO',
      description: 'Next-gen browser and mobile automation test framework for Node.js. WebdriverIO is a progressive automation framework built to automate modern web and mobile applications.',
      logo: '/assets/testing-logos/webdriverio.svg',
      url: 'https://webdriver.io/',
      dataCy: 'webdriverio-card'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8" data-cy="testing-resources-container">
      <div className="flex justify-between items-center mb-8" data-cy="testing-resources-header">
        <h1 className="text-3xl font-bold text-gray-800" data-cy="testing-resources-title">Testing Resources</h1>
        <button 
          onClick={onBack}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          data-cy="testing-resources-back-button"
        >
          Back
        </button>
      </div>
      
      <p className="text-lg text-gray-600 mb-8" data-cy="testing-resources-intro">
        Explore these powerful testing tools to improve your application quality and reliability.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-cy="testing-resources-grid">
        {testingTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg" data-cy={tool.dataCy}>
            <div className="p-6 flex flex-col h-full" data-cy={`${tool.dataCy}-content-wrapper`}>
              <div className="flex justify-center items-center h-24 mb-4" data-cy={`${tool.dataCy}-logo-container`}>
                <img src={tool.logo} alt={`${tool.name} logo`} className="max-h-16 max-w-full" data-cy={`${tool.dataCy}-logo`} />
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-3" data-cy={`${tool.dataCy}-title`}>{tool.name}</h2>
              <p className="text-gray-600 mb-6 flex-grow" data-cy={`${tool.dataCy}-description`}>{tool.description}</p>
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 text-white py-2 px-4 rounded text-center font-medium hover:bg-gray-700 transition-colors duration-300"
                data-cy={`${tool.dataCy}-learn-more-button`}
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestingResources; 