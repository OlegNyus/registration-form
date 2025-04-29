import React from 'react';
import { ArrowRight } from 'lucide-react';

const TestingResources = () => {
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
      logo: '/assets/testing-logos/playwright.jpeg',
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
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 min-h-screen p-8" data-cy="testing-resources-page-wrapper">
      <div className="container mx-auto px-4 py-8" data-cy="testing-resources-container">
        <div className="flex justify-start items-center mb-8" data-cy="testing-resources-header">
          <h1 className="text-3xl font-bold text-white" data-cy="testing-resources-title">Testing Resources</h1>
        </div>
        
        <p className="text-lg text-white/80 mb-8" data-cy="testing-resources-intro">
          Explore these powerful testing tools to improve your application quality and reliability.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-cy="testing-resources-grid">
          {testingTools.map((tool) => (
            <div key={tool.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105" data-cy={tool.dataCy}>
              <div className="p-6 flex flex-col h-full" data-cy={`${tool.dataCy}-content-wrapper`}>
                <div className="flex justify-center items-center h-20 mb-6" data-cy={`${tool.dataCy}-logo-container`}>
                  <img src={tool.logo} alt={`${tool.name} logo`} className="max-h-16 max-w-[80%] object-contain" data-cy={`${tool.dataCy}-logo`} />
                </div>
                <h2 className="text-xl font-bold text-white text-center mb-2" data-cy={`${tool.dataCy}-title`}>{tool.name}</h2>
                <p className="text-white/70 mb-4 flex-grow text-center" data-cy={`${tool.dataCy}-description`}>{tool.description}</p>
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-auto inline-flex items-center justify-center text-indigo-300 hover:text-indigo-400 transition-colors duration-200 font-medium"
                  data-cy={`${tool.dataCy}-learn-more-button`}
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestingResources; 