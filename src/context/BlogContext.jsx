import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial blog posts data
const initialBlogPosts = [
  {
    id: 1,
    title: 'Getting Started with Our Platform',
    excerpt: 'Learn how to make the most of our platform features and tools to enhance your productivity.',
    author: 'Admin',
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'March 4, 2025',
    content: `
      <p class="lead">Welcome to our platform! This guide will help you get started and make the most of all the features we offer.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Setting Up Your Account</h2>
      <p>After registration, the first step is to complete your profile. This helps us personalize your experience and ensures you get the most relevant information.</p>
      <p>Here's what you should include in your profile:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>A professional profile picture</li>
        <li>Your contact information</li>
        <li>Your preferences and interests</li>
        <li>Your company details (if applicable)</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Exploring the Dashboard</h2>
      <p>Your dashboard is the central hub for all your activities. From here, you can access customer management, view analytics, and customize your settings.</p>
      <p>The dashboard is divided into several sections:</p>
      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li>Quick actions - for common tasks</li>
        <li>Recent activity - showing your latest interactions</li>
        <li>Analytics overview - key metrics at a glance</li>
        <li>Notifications - important updates and alerts</li>
      </ol>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Managing Customers</h2>
      <p>Our customer management system allows you to store, organize, and analyze your customer data efficiently. You can add new customers, edit existing records, and track interactions.</p>
      <div class="bg-white/10 p-4 rounded-lg my-4 border-l-4 border-indigo-400">
        <p class="font-semibold">Pro Tip:</p>
        <p>Use tags to categorize your customers for easier filtering and segmentation.</p>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Using the ASCII Converter</h2>
      <p>The ASCII converter is a powerful tool for developers. It allows you to quickly convert text to ASCII values, which can be useful for various programming tasks.</p>
      <p>To use the converter:</p>
      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li>Navigate to the ASCII Converter page</li>
        <li>Enter your text in the input field</li>
        <li>Click the "Convert" button</li>
        <li>View the ASCII values in the results section</li>
      </ol>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Getting Help</h2>
      <p>If you ever need assistance, our support team is just a click away. You can also check our blog for tutorials, tips, and announcements about new features.</p>
      
      <p>We're excited to have you on board and can't wait to see how you use our platform to achieve your goals!</p>
    `
  },
  {
    id: 2,
    title: 'Best Practices for Customer Management',
    excerpt: 'Discover the most effective strategies for managing your customer database and improving relationships.',
    author: 'Support Team',
    category: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'March 4, 2025',
    content: `
      <p class="lead">Effective customer management is crucial for business success. This guide explores best practices to help you organize, understand, and nurture your customer relationships.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Organizing Your Customer Database</h2>
      <p>A well-organized customer database is the foundation of effective customer management. Consider these strategies:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Use consistent naming conventions</li>
        <li>Implement a tagging system for easy categorization</li>
        <li>Regularly clean and update customer records</li>
        <li>Segment customers based on relevant criteria</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Understanding Customer Needs</h2>
      <p>To serve your customers effectively, you need to understand their needs, preferences, and pain points. Here's how:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Collect and analyze customer feedback</li>
        <li>Track customer interactions and purchase history</li>
        <li>Identify patterns in customer behavior</li>
        <li>Create customer personas to guide your approach</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Building Strong Relationships</h2>
      <p>Strong customer relationships lead to loyalty, repeat business, and referrals. Try these approaches:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Personalize your communications</li>
        <li>Respond promptly to inquiries and concerns</li>
        <li>Anticipate customer needs</li>
        <li>Show appreciation through loyalty programs or special offers</li>
      </ul>
      
      <div class="bg-white/10 p-4 rounded-lg my-4 border-l-4 border-indigo-400">
        <p class="font-semibold">Pro Tip:</p>
        <p>Remember that customer relationships are built on trust. Always be transparent, honest, and reliable in your interactions.</p>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Leveraging Technology</h2>
      <p>Modern technology can significantly enhance your customer management efforts:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Use CRM software to centralize customer information</li>
        <li>Implement automation for routine tasks</li>
        <li>Analyze data to identify trends and opportunities</li>
        <li>Utilize communication tools for consistent engagement</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Measuring Success</h2>
      <p>To ensure your customer management strategies are effective, track these key metrics:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Customer satisfaction scores</li>
        <li>Customer retention rates</li>
        <li>Customer lifetime value</li>
        <li>Net Promoter Score (NPS)</li>
      </ul>
      
      <p>By implementing these best practices, you'll create a customer-centric approach that drives satisfaction, loyalty, and business growth.</p>
    `
  },
  {
    id: 3,
    title: 'Understanding ASCII Conversion',
    excerpt: 'A deep dive into how ASCII conversion works and why it matters for developers and tech enthusiasts.',
    author: 'Tech Team',
    category: 'Technical',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'March 4, 2025',
    content: `
      <p class="lead">ASCII (American Standard Code for Information Interchange) is a character encoding standard that represents text in computers and other devices. Understanding ASCII conversion is essential for many programming and data processing tasks.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">What is ASCII?</h2>
      <p>ASCII is a character encoding standard that assigns numerical values to letters, digits, punctuation marks, and control characters. It was developed in the 1960s and remains fundamental to computing today.</p>
      <p>The standard ASCII character set includes 128 characters (0-127), covering:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Uppercase letters (A-Z)</li>
        <li>Lowercase letters (a-z)</li>
        <li>Digits (0-9)</li>
        <li>Punctuation marks</li>
        <li>Control characters</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">ASCII Table Highlights</h2>
      <p>Here are some important sections of the ASCII table:</p>
      <div class="bg-gray-800 p-4 rounded-md my-4 overflow-x-auto">
        <table class="w-full text-white">
          <thead>
            <tr class="border-b border-white/20">
              <th class="text-left py-2">Character</th>
              <th class="text-left py-2">ASCII Value</th>
              <th class="text-left py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-white/10">
              <td class="py-2">A-Z</td>
              <td class="py-2">65-90</td>
              <td class="py-2">Uppercase letters</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="py-2">a-z</td>
              <td class="py-2">97-122</td>
              <td class="py-2">Lowercase letters</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="py-2">0-9</td>
              <td class="py-2">48-57</td>
              <td class="py-2">Digits</td>
            </tr>
            <tr>
              <td class="py-2">Space</td>
              <td class="py-2">32</td>
              <td class="py-2">Space character</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Why ASCII Conversion Matters</h2>
      <p>ASCII conversion is important for several reasons:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Data transmission between different systems</li>
        <li>Text processing and manipulation</li>
        <li>Character validation and filtering</li>
        <li>Encryption and encoding algorithms</li>
        <li>Understanding binary data representation</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">ASCII Conversion in Practice</h2>
      <p>Here's a simple JavaScript example of ASCII conversion:</p>
      <div class="bg-gray-800 p-4 rounded-md my-4 overflow-x-auto">
        <pre><code>// Convert a string to ASCII values
function stringToAscii(str) {
  return str.split('').map(char => char.charCodeAt(0));
}

// Convert ASCII values back to a string
function asciiToString(asciiValues) {
  return asciiValues.map(code => String.fromCharCode(code)).join('');
}

// Example usage
const text = "Hello, World!";
const asciiValues = stringToAscii(text);
console.log(asciiValues); // [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
console.log(asciiToString(asciiValues)); // "Hello, World!"</code></pre>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Beyond ASCII: Unicode</h2>
      <p>While ASCII is still widely used, Unicode has expanded character encoding to include symbols and characters from virtually all writing systems around the world. UTF-8, a variable-width encoding form of Unicode, is now the dominant character encoding for the web.</p>
      
      <div class="bg-white/10 p-4 rounded-lg my-4 border-l-4 border-indigo-400">
        <p class="font-semibold">Pro Tip:</p>
        <p>When working with international text or special symbols, consider using Unicode instead of ASCII to ensure proper character representation.</p>
      </div>
      
      <p>Understanding ASCII conversion provides a foundation for more advanced text processing and encoding techniques, making it a valuable skill for developers and tech enthusiasts alike.</p>
    `
  },
  {
    id: 4,
    title: 'Upcoming Features and Improvements',
    excerpt: 'Get a sneak peek at the exciting new features we\'re working on for our platform.',
    author: 'Product Team',
    category: 'Announcements',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'March 4, 2025',
    content: `
      <p class="lead">We're constantly working to improve our platform and add new features that enhance your experience. Here's a preview of what's coming in the next few months.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Enhanced Dashboard</h2>
      <p>We're redesigning the dashboard to provide more actionable insights and a cleaner, more intuitive interface. New features include:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Customizable widgets for personalized views</li>
        <li>Improved data visualization with interactive charts</li>
        <li>Real-time activity feed with filtering options</li>
        <li>Quick access to frequently used tools and reports</li>
      </ul>
      
      <div class="bg-white/10 p-4 rounded-lg my-4">
        <h3 class="text-lg font-bold mb-2">Dashboard Preview</h3>
        <p>The new dashboard will feature a modular design that adapts to your workflow and priorities. You'll be able to arrange components, save different layouts, and switch between views with ease.</p>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Advanced Customer Analytics</h2>
      <p>We're expanding our analytics capabilities to help you gain deeper insights into customer behavior and preferences:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Predictive analytics for customer lifetime value</li>
        <li>Sentiment analysis for customer feedback</li>
        <li>Behavioral segmentation tools</li>
        <li>Custom report builder with export options</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Mobile App</h2>
      <p>We're excited to announce that we're developing a mobile app for iOS and Android. The app will include:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>On-the-go access to key platform features</li>
        <li>Push notifications for important updates</li>
        <li>Offline mode for viewing saved data</li>
        <li>Biometric authentication for enhanced security</li>
      </ul>
      
      <div class="bg-white/10 p-4 rounded-lg my-4 border-l-4 border-indigo-400">
        <p class="font-semibold">Join the Beta Program:</p>
        <p>Interested in early access to our mobile app? Sign up for our beta program to help shape the future of our platform.</p>
        <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">Join Beta</button>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Integration Ecosystem</h2>
      <p>We're expanding our integration capabilities to connect with more of the tools you use daily:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>New API endpoints for custom integrations</li>
        <li>Pre-built connectors for popular CRM and marketing platforms</li>
        <li>Improved data synchronization</li>
        <li>Webhook support for real-time event handling</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Enhanced Security Features</h2>
      <p>Security remains a top priority. Upcoming security enhancements include:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Two-factor authentication options</li>
        <li>Advanced permission management</li>
        <li>Audit logs for compliance and monitoring</li>
        <li>Enhanced data encryption</li>
      </ul>
      
      <p>We're excited about these upcoming features and can't wait to share them with you. Your feedback is invaluable in shaping our roadmap, so please continue to share your thoughts and suggestions.</p>
      
      <p>Stay tuned for more updates as we get closer to releasing these features!</p>
    `
  }
];

// Create the context
const BlogContext = createContext();

// Custom hook for using the blog context
export const useBlog = () => {
  return useContext(BlogContext);
};

// Provider component
export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState(() => {
    // Try to get blog posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : initialBlogPosts;
  });

  // Save to localStorage whenever blogPosts changes
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  // Add a new blog post
  const addBlogPost = (newPost) => {
    // Ensure the post has a date in the correct format
    const postWithDate = {
      ...newPost,
      date: 'March 4, 2025' // Use a consistent date format for all posts
    };
    
    // Format the content to ensure consistent styling
    const formattedContent = formatPostContent(postWithDate.content);
    
    // Update the post with formatted content
    const finalPost = {
      ...postWithDate,
      content: formattedContent
    };
    
    setBlogPosts([...blogPosts, finalPost]);
  };

  // Get a blog post by ID
  const getBlogPost = (id) => {
    return blogPosts.find(post => post.id === parseInt(id));
  };

  // Delete a blog post
  const deleteBlogPost = (id) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  // Update a blog post
  const updateBlogPost = (updatedPost) => {
    // Format the content to ensure consistent styling
    const formattedContent = formatPostContent(updatedPost.content);
    
    // Update the post with formatted content
    const finalUpdatedPost = {
      ...updatedPost,
      content: formattedContent
    };
    
    setBlogPosts(blogPosts.map(post => 
      post.id === finalUpdatedPost.id ? finalUpdatedPost : post
    ));
  };
  
  // Reset blog posts to initial state
  const resetBlogPosts = () => {
    localStorage.removeItem('blogPosts');
    setBlogPosts(initialBlogPosts);
  };

  // Helper function to format post content with consistent styling
  const formatPostContent = (content) => {
    if (!content) return '';
    
    let formattedContent = content;
    
    // Ensure content has proper styling classes
    if (!formattedContent.includes('text-2xl font-bold text-white')) {
      // Add proper heading classes
      formattedContent = formattedContent.replace(
        /<h2(?!\s+class=)/g, 
        '<h2 class="text-2xl font-bold text-white mt-8 mb-4"'
      );
      
      formattedContent = formattedContent.replace(
        /<h3(?!\s+class=)/g, 
        '<h3 class="text-xl font-bold text-white mt-6 mb-3"'
      );
    }
    
    // Ensure lists have proper styling
    if (!formattedContent.includes('list-disc pl-6 my-4 space-y-2')) {
      formattedContent = formattedContent.replace(
        /<ul(?!\s+class=)/g, 
        '<ul class="list-disc pl-6 my-4 space-y-2"'
      );
      
      formattedContent = formattedContent.replace(
        /<ol(?!\s+class=)/g, 
        '<ol class="list-decimal pl-6 my-4 space-y-2"'
      );
    }
    
    // Ensure code blocks have proper styling
    if (!formattedContent.includes('bg-gray-800 p-4 rounded-md')) {
      // Replace standalone pre tags with styled div>pre
      formattedContent = formattedContent.replace(
        /<pre>(?!<\/div>)/g, 
        '<div class="bg-gray-800 p-4 rounded-md my-4 overflow-x-auto"><pre>'
      );
      
      formattedContent = formattedContent.replace(
        /<\/pre>(?!<\/div>)/g, 
        '</pre></div>'
      );
    }
    
    // Ensure the first paragraph has lead styling
    if (!formattedContent.includes('class="lead"')) {
      formattedContent = formattedContent.replace(
        /<p>(?!.*?class=)/,
        '<p class="lead">'
      );
    }
    
    return formattedContent;
  };

  // Value to be provided by the context
  const value = {
    blogPosts,
    addBlogPost,
    getBlogPost,
    deleteBlogPost,
    updateBlogPost,
    resetBlogPosts
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}; 