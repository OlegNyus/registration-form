import React from 'react';
import { ArrowLeft, Calendar, User, Tag, Edit } from 'lucide-react';
import PageLinks from '../components/PageLinks';
import { useBlog } from '../context/BlogContext';

// Get current date in format: Month Day, Year
const getCurrentDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

const BlogPost = ({ onBack, postId, onEdit }) => {
  const { getBlogPost } = useBlog();
  const post = getBlogPost(postId);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
          <button
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
            data-cy="blog-post-back-button"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </button>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-white/80">The blog post you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Function to clean content to remove duplicate title if present
  const cleanContent = (content) => {
    // Check if content starts with an h1 or h2 that matches the title
    const titleRegex = new RegExp(`<h[12][^>]*>${post.title}</h[12]>`, 'i');
    return content.replace(titleRegex, '');
  };

  // Function to enhance content with proper styling if needed
  const enhanceContent = (content) => {
    // Clean content first to remove duplicate title
    const cleanedContent = cleanContent(content);
    
    // If content doesn't have proper styling classes, add them
    if (!cleanedContent.includes('text-2xl font-bold text-white') && 
        !cleanedContent.includes('prose prose-invert')) {
      
      // Add basic styling wrapper if not present
      return `
        <div class="prose prose-invert prose-lg max-w-none">
          ${cleanedContent}
        </div>
      `;
    }
    return cleanedContent;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
            data-cy="blog-post-back-button"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </button>
          
          <button
            onClick={onEdit}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            data-cy="blog-post-edit-button"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Post</span>
          </button>
        </div>
        
        <div className="h-64 overflow-hidden rounded-lg mb-6">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
        
        <div className="flex items-center text-white/60 mb-6 text-sm space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{post.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
        
        <div className="text-white/80 italic mb-8">{post.excerpt}</div>
        
        <div 
          className="blog-content text-white"
          dangerouslySetInnerHTML={{ __html: enhanceContent(post.content) }}
        />
        
        <div className="mt-12 pt-6 border-t border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => alert('Share functionality coming soon!')}
              data-cy="share-facebook-button"
            >
              Facebook
            </button>
            <button 
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
              onClick={() => alert('Share functionality coming soon!')}
              data-cy="share-twitter-button"
            >
              Twitter
            </button>
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              onClick={() => alert('Share functionality coming soon!')}
              data-cy="share-email-button"
            >
              Email
            </button>
          </div>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default BlogPost; 