import React from 'react';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import PageLinks from '../components/PageLinks';

// Get current date in format: Month Day, Year
const getCurrentDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Our Platform',
    excerpt: 'Learn how to make the most of our platform features and tools to enhance your productivity.',
    author: 'Admin',
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Best Practices for Customer Management',
    excerpt: 'Discover the most effective strategies for managing your customer database and improving relationships.',
    author: 'Support Team',
    category: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Understanding ASCII Conversion',
    excerpt: 'A deep dive into how ASCII conversion works and why it matters for developers and tech enthusiasts.',
    author: 'Tech Team',
    category: 'Technical',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Upcoming Features and Improvements',
    excerpt: 'Get a sneak peek at the exciting new features we\'re working on for our platform.',
    author: 'Product Team',
    category: 'Announcements',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const Blog = ({ onBack, onSelectPost }) => {
  const currentDate = getCurrentDate();
  
  const handlePostClick = (postId) => {
    onSelectPost(postId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            data-cy="blog-back-button"
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Blog</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <div 
              key={post.id} 
              onClick={() => handlePostClick(post.id)}
              className="bg-white/5 rounded-lg overflow-hidden shadow-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              data-cy={`blog-post-${post.id}`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
                <div className="flex items-center text-white/60 mb-4 text-sm space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{currentDate}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    <span>{post.category}</span>
                  </div>
                </div>
                <p className="text-white/80 mb-4">{post.excerpt}</p>
                <div className="text-indigo-300 font-medium">
                  Read More
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default Blog; 