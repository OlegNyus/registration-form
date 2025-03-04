import React from 'react';
import { Calendar, User, Tag, PlusCircle, RefreshCw } from 'lucide-react';
import PageLinks from '../components/PageLinks';
import { useBlog } from '../context/BlogContext';

// Get current date in format: Month Day, Year
const getCurrentDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

const Blog = ({ onSelectPost, onNewPost, onEditPost }) => {
  const { blogPosts, resetBlogPosts } = useBlog();
  const currentDate = getCurrentDate();
  
  const handlePostClick = (postId) => {
    onSelectPost(postId);
  };
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all blog posts? This will remove any new posts you\'ve created.')) {
      resetBlogPosts();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Blog</h1>
          <div className="flex gap-2">
            <button
              data-cy="reset-blog-posts-button"
              onClick={handleReset}
              className="text-white flex items-center gap-2 px-4 py-2 rounded bg-red-600/70 hover:bg-red-600 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              data-cy="new-blog-post-button"
              onClick={onNewPost}
              className="text-white flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Post</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-white/5 rounded-lg overflow-hidden shadow-lg hover:bg-white/10 transition-colors duration-200"
              data-cy={`blog-post-${post.id}`}
            >
              <div 
                className="h-48 overflow-hidden cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 
                  className="text-xl font-bold text-white mb-2 cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  {post.title}
                </h2>
                <div className="flex items-center text-white/60 mb-4 text-sm space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{post.date || currentDate}</span>
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
                <p 
                  className="text-white/80 mb-4 cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <div 
                    className="text-indigo-300 font-medium cursor-pointer"
                    onClick={() => handlePostClick(post.id)}
                  >
                    Read More
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPost(post.id);
                    }}
                    className="text-white/70 hover:text-white px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors duration-200 text-sm"
                    data-cy={`edit-blog-post-${post.id}`}
                  >
                    Edit
                  </button>
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