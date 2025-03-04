import React from 'react';
import { ArrowRight } from 'lucide-react';
import PageLinks from '../components/PageLinks';

const LandingPage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to Our Platform</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore our features designed to make your experience seamless and productive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Registration Feature */}
          <a 
            href="#registration"
            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105 cursor-pointer"
            data-cy="registration-feature"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Registration" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">User Registration</h3>
              <p className="text-white/70 mb-4">
                Create an account to access all features and save your preferences.
              </p>
              <div className="inline-flex items-center text-indigo-300">
                Register Now <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </a>
          
          {/* Customers Feature */}
          <a 
            href="#customers"
            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105 cursor-pointer"
            data-cy="customers-feature"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Customers" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Customers</h3>
              <p className="text-white/70 mb-4">
                View and manage your customer database with our intuitive interface.
              </p>
              <div className="inline-flex items-center text-indigo-300">
                View Customers <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </a>
          
          {/* Blog Feature */}
          <div 
            onClick={() => navigateTo('blog')}
            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105 cursor-pointer"
            data-cy="blog-feature"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Blog" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Blog</h3>
              <p className="text-white/70 mb-4">
                Read our latest articles, tutorials, and announcements.
              </p>
              <div className="inline-flex items-center text-indigo-300">
                Read Blog <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* ASCII Converter Feature */}
          <a 
            href="#fun-ascii"
            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105 cursor-pointer"
            data-cy="ascii-feature"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="ASCII Converter" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">ASCII Converter</h3>
              <p className="text-white/70 mb-4">
                Convert text to binary ASCII representation with our simple tool.
              </p>
              <div className="inline-flex items-center text-indigo-300">
                Try Converter <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </a>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
          <a 
            href="#registration"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md"
          >
            Get Started
          </a>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default LandingPage; 