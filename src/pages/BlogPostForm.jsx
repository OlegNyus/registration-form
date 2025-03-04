import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Save, Code, FileText, Calendar, User, Tag } from 'lucide-react';
import PageLinks from '../components/PageLinks';
import { useBlog } from '../context/BlogContext';

const BlogPostForm = ({ onBack, editingPostId }) => {
  const { addBlogPost, getBlogPost, updateBlogPost } = useBlog();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  });

  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [isRawHtml, setIsRawHtml] = useState(true);
  const contentRef = useRef(null);

  const categories = [
    'Tutorials',
    'Tips & Tricks',
    'Technical',
    'Announcements',
    'Case Studies',
    'Industry News'
  ];

  // Load post data if editing
  useEffect(() => {
    if (editingPostId) {
      const post = getBlogPost(editingPostId);
      if (post) {
        setFormData({
          ...post
        });
      }
    }
  }, [editingPostId, getBlogPost]);

  // Add this to the top of your component to handle autofill styling
  useEffect(() => {
    // Add a style tag to override browser autofill styles
    const style = document.createElement('style');
    style.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.05) inset !important;
        -webkit-text-fill-color: white !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // If in plain text mode, convert to HTML first
      let finalContent = formData.content;
      if (!isRawHtml) {
        finalContent = convertTextToHtml(formData.content);
      }
      
      if (editingPostId) {
        // Update existing post
        const updatedPost = {
          ...formData,
          content: finalContent,
          id: editingPostId
        };
        
        updateBlogPost(updatedPost);
      } else {
        // Create new post
        const newPost = {
          ...formData,
          content: finalContent,
          id: Date.now(), // Use timestamp as a simple unique ID
          date: 'March 4, 2025' // Use a consistent date format
        };
        
        addBlogPost(newPost);
      }
      
      // Navigate back to the blog page
      onBack();
    }
  };

  const togglePreview = () => {
    // If switching to preview mode and not in raw HTML mode, convert text to HTML first
    if (!previewMode && !isRawHtml) {
      setFormData({
        ...formData,
        content: convertTextToHtml(formData.content)
      });
    }
    setPreviewMode(!previewMode);
  };

  const toggleEditorMode = () => {
    setIsRawHtml(!isRawHtml);
    
    // If switching to HTML mode, convert the plain text to HTML
    if (isRawHtml) {
      setFormData({
        ...formData,
        content: convertTextToHtml(formData.content)
      });
    }
  };

  // Function to handle paste events in the content textarea
  const handlePaste = (e) => {
    if (!isRawHtml) return; // Only process in raw HTML mode
    
    // Get pasted text
    const pastedText = e.clipboardData.getData('text');
    
    // Check if it looks like HTML (contains tags)
    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(pastedText);
    
    if (!hasHtmlTags) {
      // Prevent default paste
      e.preventDefault();
      
      // Convert plain text to HTML
      const htmlContent = convertTextToHtml(pastedText);
      
      // Get current cursor position
      const cursorPos = contentRef.current.selectionStart;
      const currentContent = formData.content;
      
      // Insert the HTML content at cursor position
      const newContent = 
        currentContent.substring(0, cursorPos) + 
        htmlContent + 
        currentContent.substring(cursorPos);
      
      // Update form data
      setFormData({
        ...formData,
        content: newContent
      });
    }
  };

  // Function to convert plain text to HTML with proper styling
  const convertTextToHtml = (text) => {
    if (!text) return '';
    
    // Split text into lines
    const lines = text.split('\n');
    let html = '';
    let inList = false;
    let listType = '';
    let inParagraph = false;
    let inCodeBlock = false;
    
    // Check if this is the first paragraph to make it a lead paragraph
    let isFirstParagraph = true;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // Skip empty lines
      if (line === '') {
        if (inParagraph) {
          html += '</p>\n';
          inParagraph = false;
        }
        if (inList) {
          html += `</${listType}>\n`;
          inList = false;
        }
        if (inCodeBlock) {
          html += '</code></pre></div>\n';
          inCodeBlock = false;
        }
        continue;
      }
      
      // Headings
      if (line.startsWith('# ')) {
        if (inParagraph) {
          html += '</p>\n';
          inParagraph = false;
        }
        if (inList) {
          html += `</${listType}>\n`;
          inList = false;
        }
        if (inCodeBlock) {
          html += '</code></pre></div>\n';
          inCodeBlock = false;
        }
        const headingText = line.substring(2);
        html += `<h2 class="text-2xl font-bold text-white mt-8 mb-4">${headingText}</h2>\n`;
      }
      // Subheadings
      else if (line.startsWith('## ')) {
        if (inParagraph) {
          html += '</p>\n';
          inParagraph = false;
        }
        if (inList) {
          html += `</${listType}>\n`;
          inList = false;
        }
        if (inCodeBlock) {
          html += '</code></pre></div>\n';
          inCodeBlock = false;
        }
        const headingText = line.substring(3);
        html += `<h3 class="text-xl font-bold text-white mt-6 mb-3">${headingText}</h3>\n`;
      }
      // Unordered lists
      else if (line.startsWith('- ')) {
        if (inParagraph) {
          html += '</p>\n';
          inParagraph = false;
        }
        if (inCodeBlock) {
          html += '</code></pre></div>\n';
          inCodeBlock = false;
        }
        
        if (!inList || listType !== 'ul') {
          if (inList) {
            html += `</${listType}>\n`;
          }
          html += '<ul class="list-disc pl-6 my-4 space-y-2">\n';
          inList = true;
          listType = 'ul';
        }
        
        const itemText = line.substring(2);
        html += `  <li>${itemText}</li>\n`;
      }
      // Ordered lists
      else if (/^\d+\.\s/.test(line)) {
        if (inParagraph) {
          html += '</p>\n';
          inParagraph = false;
        }
        if (inCodeBlock) {
          html += '</code></pre></div>\n';
          inCodeBlock = false;
        }
        
        if (!inList || listType !== 'ol') {
          if (inList) {
            html += `</${listType}>\n`;
          }
          html += '<ol class="list-decimal pl-6 my-4 space-y-2">\n';
          inList = true;
          listType = 'ol';
        }
        
        const itemText = line.replace(/^\d+\.\s/, '');
        html += `  <li>${itemText}</li>\n`;
      }
      // Blockquotes
      else if (line.startsWith('> ')) {
        if (inParagraph) {
          html += '</p>\n';
          inParagraph = false;
        }
        if (inList) {
          html += `</${listType}>\n`;
          inList = false;
        }
        if (inCodeBlock) {
          html += '</code></pre></div>\n';
          inCodeBlock = false;
        }
        
        const quoteText = line.substring(2);
        html += `<div class="bg-white/10 p-4 rounded-lg my-4 border-l-4 border-indigo-400">
  <p class="font-semibold">Pro Tip:</p>
  <p>${quoteText}</p>
</div>\n`;
      }
      // Code blocks
      else if (line.startsWith('```')) {
        if (inParagraph) {
          html += '</p>\n';
          inParagraph = false;
        }
        if (inList) {
          html += `</${listType}>\n`;
          inList = false;
        }
        
        if (!inCodeBlock) {
          html += '<div class="bg-gray-800 p-4 rounded-md my-4 overflow-x-auto"><pre><code>';
          inCodeBlock = true;
        } else {
          html += '</code></pre></div>\n';
          inCodeBlock = false;
        }
      }
      // Regular paragraphs
      else {
        if (inList) {
          html += `</${listType}>\n`;
          inList = false;
        }
        if (inCodeBlock) {
          html += line;
          if (i < lines.length - 1) {
            html += '\n';
          }
          continue;
        }
        
        if (!inParagraph) {
          if (isFirstParagraph) {
            html += '<p class="lead">';
            isFirstParagraph = false;
          } else {
            html += '<p>';
          }
          inParagraph = true;
        } else if (i > 0 && lines[i-1].trim() !== '') {
          html += '<br />';
        } else {
          html += ' ';
        }
        html += line;
      }
    }
    
    // Close any open tags
    if (inParagraph) {
      html += '</p>\n';
    }
    if (inList) {
      html += `</${listType}>\n`;
    }
    if (inCodeBlock) {
      html += '</code></pre></div>\n';
    }
    
    return html;
  };

  // Add a function to check if the form is valid for disabling the save button
  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.excerpt.trim() !== '' &&
      formData.content.trim() !== '' &&
      formData.author.trim() !== '' &&
      formData.category !== ''
    );
  };

  // Render the form or preview
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        {previewMode ? (
          // Preview Mode
          <>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onBack}
                className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
                data-cy="blog-preview-back-to-blog-button"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </button>
              <h1 className="text-2xl font-bold text-white">
                {editingPostId ? 'Preview Edited Post' : 'Preview New Post'}
              </h1>
            </div>
            
            <div className="h-48 overflow-hidden mb-6 rounded-lg">
              <img 
                src={formData.image} 
                alt={formData.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">{formData.title}</h1>
            
            <div className="flex items-center text-white/60 mb-6 text-sm space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>March 4, 2025</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{formData.author || 'Author'}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                <span>{formData.category || 'Category'}</span>
              </div>
            </div>
            
            <p className="text-white/80 italic mb-6">{formData.excerpt}</p>
            
            <div 
              className="prose prose-invert prose-lg max-w-none text-white/90"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={togglePreview}
                className="px-4 py-2 mr-4 bg-white/10 text-white rounded hover:bg-white/20 transition-colors duration-200"
                data-cy="blog-preview-back-button"
              >
                Back to Editing
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`flex items-center gap-2 px-6 py-2 ${
                  isFormValid() 
                    ? 'bg-indigo-600 hover:bg-indigo-700' 
                    : 'bg-indigo-600/50 cursor-not-allowed'
                } text-white rounded transition-colors duration-200`}
                data-cy="blog-preview-submit-button"
              >
                <Save className="w-4 h-4" />
                <span>Save Post</span>
              </button>
            </div>
          </>
        ) : (
          // Edit Mode
          <>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onBack}
                className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
                data-cy="blog-form-back-button"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </button>
              <h1 className="text-2xl font-bold text-white">
                {editingPostId ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-white mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white/5 border ${errors.title ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-500`}
                  placeholder="Enter blog post title"
                  data-cy="blog-title-input"
                />
                {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-white mb-2">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white/5 border ${errors.excerpt ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-500 h-24`}
                  placeholder="Enter a brief summary of your post"
                  data-cy="blog-excerpt-input"
                />
                {errors.excerpt && <p className="text-red-500 mt-1">{errors.excerpt}</p>}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="content" className="text-white">
                    {isRawHtml ? 'Content (HTML)' : 'Content (Plain Text)'}
                  </label>
                  <button
                    type="button"
                    onClick={toggleEditorMode}
                    className="flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
                    data-cy="blog-toggle-editor-button"
                  >
                    {isRawHtml ? (
                      <>
                        <FileText className="w-4 h-4" />
                        <span>Switch to Plain Text</span>
                      </>
                    ) : (
                      <>
                        <Code className="w-4 h-4" />
                        <span>Switch to HTML</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  ref={contentRef}
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  className={`w-full p-3 bg-white/5 border ${errors.content ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-500 h-64 ${isRawHtml ? 'font-mono' : ''}`}
                  placeholder={isRawHtml 
                    ? "<p>Enter your post content in HTML format</p>" 
                    : "Enter your post content. Use # for headings, - for lists, and > for quotes."
                  }
                  data-cy="blog-content-input"
                />
                {errors.content && <p className="text-red-500 mt-1">{errors.content}</p>}
                <p className="text-white/60 text-sm mt-1">
                  {isRawHtml 
                    ? "You can use HTML tags to format your content. Paste plain text to auto-convert to HTML." 
                    : "Use # for headings, - for lists, > for quotes. Double line breaks create new paragraphs."
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="author" className="block text-white mb-2">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/5 border ${errors.author ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-500`}
                    placeholder="Enter author name"
                    data-cy="blog-author-input"
                  />
                  {errors.author && <p className="text-red-500 mt-1">{errors.author}</p>}
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-white mb-2">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/5 border ${errors.category ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-500`}
                    data-cy="blog-category-select"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 mt-1">{errors.category}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-white mb-2">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Enter image URL"
                  data-cy="blog-image-input"
                />
                <p className="text-white/60 text-sm mt-1">Enter a URL for the post's featured image.</p>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={togglePreview}
                  className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors duration-200"
                  data-cy="blog-preview-button"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`flex items-center gap-2 px-6 py-2 ${
                    isFormValid() 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : 'bg-indigo-600/50 cursor-not-allowed'
                  } text-white rounded transition-colors duration-200`}
                  data-cy="blog-submit-button"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Post</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <PageLinks />
    </div>
  );
};

export default BlogPostForm; 