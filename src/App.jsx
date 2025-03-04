import React, { useState, useEffect } from 'react';
import Registration from './pages/Registration';
import ThankYou from './pages/ThankYou';
import Customers from './pages/Customers';
import MdViewer from './pages/MdViewer';
import MdFilesList from './pages/MdFilesList';
import UnderDevelopment from './pages/UnderDevelopment';
import LandingPage from './pages/LandingPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogPostForm from './pages/BlogPostForm';
import { CustomersProvider } from './context/CustomersContext';
import { MdFilesProvider } from './context/MdFilesContext';
import { BlogProvider } from './context/BlogContext';
import FunAscii from './components/FunAscii';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || 'home';
  });
  
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSubmitSuccess = (formData) => {
    setCurrentPage('thankyou');
    window.location.hash = 'thankyou';
  };

  const handleBack = () => {
    if (currentPage === 'mdfiles') {
      setCurrentPage('mdviewer');
      window.location.hash = 'mdviewer';
    } else if (currentPage === 'under-development') {
      setCurrentPage('customers');
      window.location.hash = 'customers';
    } else if (currentPage === 'blog') {
      setCurrentPage('home');
      window.location.hash = 'home';
    } else if (currentPage === 'blogpost') {
      setCurrentPage('blog');
      window.location.hash = 'blog';
    } else if (currentPage === 'blogpostform') {
      setCurrentPage('blog');
      window.location.hash = 'blog';
    } else if (currentPage === 'customers') {
      setCurrentPage('registration');
      window.location.hash = 'registration';
    } else if (currentPage === 'thankyou') {
      setCurrentPage('registration');
      window.location.hash = 'registration';
    } else {
      setCurrentPage('home');
      window.location.hash = 'home';
    }
  };

  const handleViewCustomers = () => {
    setCurrentPage('customers');
    window.location.hash = 'customers';
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    setCurrentPage('under-development');
    window.location.hash = 'under-development';
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage('mdfiles');
    window.location.hash = 'mdfiles';
  };

  const handleSelectBlogPost = (postId) => {
    setSelectedBlogPostId(postId);
    setCurrentPage('blogpost');
    window.location.hash = 'blogpost';
  };

  const handleNewBlogPost = () => {
    setCurrentPage('blogpostform');
    window.location.hash = 'blogpostform';
  };

  const handleEditPost = (postId) => {
    setEditingPostId(postId);
    setCurrentPage('blogpostform');
    window.location.hash = 'blogpostform';
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage navigateTo={navigateTo} />;
      case 'registration':
        return <Registration onSubmitSuccess={handleSubmitSuccess} />;
      case 'thankyou':
        return <ThankYou onBack={handleBack} onViewCustomers={handleViewCustomers} />;
      case 'customers':
        return <Customers onBack={handleBack} onSelectCustomer={handleSelectCustomer} />;
      case 'mdviewer':
        return <MdViewer onCategorySelect={handleCategorySelect} />;
      case 'mdfiles':
        return <MdFilesList category={selectedCategory} onBack={handleBack} />;
      case 'fun-ascii':
        return <FunAscii />;
      case 'blog':
        return (
          <Blog 
            onBack={() => {
              setCurrentPage('home');
              window.location.hash = 'home';
            }} 
            onSelectPost={handleSelectBlogPost}
            onNewPost={() => {
              setEditingPostId(null);
              setCurrentPage('blogpostform');
              window.location.hash = 'blogpostform';
            }}
            onEditPost={handleEditPost}
          />
        );
      case 'blogpost':
        return (
          <BlogPost 
            onBack={() => setCurrentPage('blog')} 
            postId={selectedBlogPostId}
            onEdit={() => handleEditPost(selectedBlogPostId)}
          />
        );
      case 'blogpostform':
        return (
          <BlogPostForm 
            onBack={() => {
              setCurrentPage('blog');
              window.location.hash = 'blog';
            }} 
            editingPostId={editingPostId}
          />
        );
      case 'under-development':
        return <UnderDevelopment onBack={handleBack} />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="App">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a 
            href="#home" 
            className="text-white font-bold text-xl hover:text-gray-300 transition-colors duration-200"
            data-cy="app-logo"
          >
            My App
          </a>
          <div className="space-x-4">
            <a href="#home" className="text-white hover:text-gray-300">Home</a>
            <a href="#registration" className="text-white hover:text-gray-300">Register</a>
            <a href="#customers" className="text-white hover:text-gray-300">Customers</a>
            <a href="#blog" className="text-white hover:text-gray-300">Blog</a>
            <a href="#fun-ascii" className="text-white hover:text-gray-300">Fun ASCII</a>
          </div>
        </div>
      </nav>
      
      <CustomersProvider>
        <MdFilesProvider>
          <BlogProvider>
            {renderPage()}
          </BlogProvider>
        </MdFilesProvider>
      </CustomersProvider>
    </div>
  );
}

export default App;