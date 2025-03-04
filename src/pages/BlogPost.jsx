import React from 'react';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import PageLinks from '../components/PageLinks';

// Get current date in format: Month Day, Year
const getCurrentDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

const blogPostsData = {
  1: {
    id: 1,
    title: 'Getting Started with Our Platform',
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
      <div class="bg-white/10 p-4 rounded-lg my-4">
        <p class="font-semibold">Pro Tip:</p>
        <p>Use tags to categorize your customers for easier filtering and segmentation.</p>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Using the ASCII Converter</h2>
      <p>The ASCII converter is a powerful tool for developers. It allows you to quickly convert text to ASCII values, which can be useful for various programming tasks.</p>
      <p>To use the converter:</p>
      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li>Navigate to the ASCII Converter page</li>
        <li>Enter your text in the input field</li>
        <li>Click "Convert" to see the ASCII representation</li>
        <li>Copy the results or export them as needed</li>
      </ol>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Getting Help</h2>
      <p>If you ever need assistance, our support team is just a click away. You can also check our blog for tutorials, tips, and announcements about new features.</p>
      
      <div class="border-l-4 border-indigo-400 pl-4 my-6">
        <p class="italic">We're excited to have you on board and can't wait to see how you use our platform to achieve your goals!</p>
      </div>
    `,
    author: 'Admin',
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  2: {
    id: 2,
    title: 'Best Practices for Customer Management',
    content: `
      <p class="lead">Effective customer management is crucial for business success. Here are some best practices to help you manage your customer relationships more effectively.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Centralize Your Customer Data</h2>
      <p>Keep all your customer information in one place. Our platform allows you to store contact details, interaction history, and preferences in a single, accessible location.</p>
      <div class="bg-white/10 p-4 rounded-lg my-4">
        <p class="font-semibold">Benefits of centralized data:</p>
        <ul class="list-disc pl-6 mt-2 space-y-1">
          <li>Improved data accuracy</li>
          <li>Better team collaboration</li>
          <li>Faster customer service</li>
          <li>More consistent customer experience</li>
        </ul>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Segment Your Customers</h2>
      <p>Not all customers are the same. Segmenting your customers based on demographics, behavior, or purchase history can help you tailor your approach and improve engagement.</p>
      <p>Common segmentation criteria include:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Demographics (age, location, industry)</li>
        <li>Purchase behavior (frequency, value, products)</li>
        <li>Engagement level (active, dormant, at-risk)</li>
        <li>Customer lifecycle stage (new, established, loyal)</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Regular Communication</h2>
      <p>Stay in touch with your customers through regular, meaningful communication. This could be through newsletters, personalized emails, or social media interactions.</p>
      <div class="border-l-4 border-indigo-400 pl-4 my-6">
        <p class="italic">"The key is to set realistic customer expectations, and then not to just meet them, but to exceed them — preferably in unexpected and helpful ways." — Richard Branson</p>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Collect and Act on Feedback</h2>
      <p>Customer feedback is invaluable. Regularly collect feedback and use it to improve your products, services, and customer experience.</p>
      <p>Effective ways to collect feedback:</p>
      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li>Surveys and questionnaires</li>
        <li>Follow-up emails after purchases</li>
        <li>Social media monitoring</li>
        <li>Direct customer interviews</li>
      </ol>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Measure Customer Satisfaction</h2>
      <p>Use metrics like Net Promoter Score (NPS) or Customer Satisfaction Score (CSAT) to gauge how happy your customers are and identify areas for improvement.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Train Your Team</h2>
      <p>Ensure everyone in your organization understands the importance of customer management and is equipped with the skills and knowledge to provide excellent service.</p>
      
      <div class="bg-white/10 p-4 rounded-lg my-6">
        <p class="font-semibold text-center">By implementing these best practices, you can build stronger relationships with your customers, increase loyalty, and drive business growth.</p>
      </div>
    `,
    author: 'Support Team',
    category: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  3: {
    id: 3,
    title: 'Understanding ASCII Conversion',
    content: `
      <p class="lead">ASCII (American Standard Code for Information Interchange) is a character encoding standard that represents text in computers and other devices. This article explains how ASCII conversion works and why it's important.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">What is ASCII?</h2>
      <p>ASCII is a character encoding standard that assigns numerical values to letters, digits, punctuation marks, and control characters. It was developed in the 1960s and is still widely used today.</p>
      <div class="bg-white/10 p-4 rounded-lg my-4">
        <p class="font-semibold">Key Facts:</p>
        <ul class="list-disc pl-6 mt-2 space-y-1">
          <li>Developed in 1963</li>
          <li>Originally used in telegraphy</li>
          <li>Became the foundation for modern character encoding</li>
          <li>Uses values from 0 to 127</li>
        </ul>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">How ASCII Works</h2>
      <p>In ASCII, each character is represented by a number between 0 and 127. For example, the uppercase letter 'A' is represented by the decimal value 65, while the lowercase 'a' is 97.</p>
      <div class="overflow-x-auto my-4">
        <table class="w-full text-sm text-white/80 border-collapse">
          <thead>
            <tr class="bg-white/10">
              <th class="p-2 text-left">Character</th>
              <th class="p-2 text-left">ASCII Value (Decimal)</th>
              <th class="p-2 text-left">ASCII Value (Binary)</th>
              <th class="p-2 text-left">ASCII Value (Hex)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-white/10">
              <td class="p-2">A</td>
              <td class="p-2">65</td>
              <td class="p-2">01000001</td>
              <td class="p-2">41</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="p-2">B</td>
              <td class="p-2">66</td>
              <td class="p-2">01000010</td>
              <td class="p-2">42</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="p-2">a</td>
              <td class="p-2">97</td>
              <td class="p-2">01100001</td>
              <td class="p-2">61</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="p-2">b</td>
              <td class="p-2">98</td>
              <td class="p-2">01100010</td>
              <td class="p-2">62</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="p-2">1</td>
              <td class="p-2">49</td>
              <td class="p-2">00110001</td>
              <td class="p-2">31</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">ASCII vs. Extended ASCII</h2>
      <p>Standard ASCII uses 7 bits, allowing for 128 different characters. Extended ASCII uses 8 bits, which allows for an additional 128 characters (values 128-255) that include special symbols and characters from non-English languages.</p>
      
      <div class="flex flex-col md:flex-row gap-4 my-6">
        <div class="flex-1 bg-white/10 p-4 rounded-lg">
          <h3 class="font-bold mb-2">Standard ASCII (7-bit)</h3>
          <ul class="list-disc pl-6 space-y-1">
            <li>Values 0-127</li>
            <li>Basic Latin alphabet</li>
            <li>Numbers and punctuation</li>
            <li>Control characters</li>
          </ul>
        </div>
        <div class="flex-1 bg-white/10 p-4 rounded-lg">
          <h3 class="font-bold mb-2">Extended ASCII (8-bit)</h3>
          <ul class="list-disc pl-6 space-y-1">
            <li>Values 0-255</li>
            <li>Includes standard ASCII</li>
            <li>Additional symbols</li>
            <li>Non-English characters</li>
          </ul>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">ASCII in Programming</h2>
      <p>ASCII values are often used in programming for various purposes, such as:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Character manipulation</li>
        <li>Input validation</li>
        <li>Sorting and comparing strings</li>
        <li>Encryption and decryption</li>
      </ul>
      
      <div class="bg-white/10 p-4 rounded-lg my-4">
        <p class="font-semibold">Code Example (JavaScript):</p>
        <pre class="bg-gray-800 p-3 rounded mt-2 overflow-x-auto"><code>// Convert a string to ASCII values
const text = "Hello";
const asciiValues = [];

for (let i = 0; i < text.length; i++) {
  asciiValues.push(text.charCodeAt(i));
}

console.log(asciiValues); // [72, 101, 108, 108, 111]</code></pre>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Using Our ASCII Converter</h2>
      <p>Our platform includes an ASCII converter tool that allows you to quickly convert text to its ASCII representation. This can be useful for programming tasks, debugging, or educational purposes.</p>
      
      <div class="border-l-4 border-indigo-400 pl-4 my-6">
        <p class="italic">Understanding ASCII is fundamental for anyone working with text in a computing environment. It forms the basis for more complex character encoding schemes like Unicode, which supports a much wider range of characters from different languages and symbol systems.</p>
      </div>
    `,
    author: 'Tech Team',
    category: 'Technical',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  4: {
    id: 4,
    title: 'Upcoming Features and Improvements',
    content: `
      <p class="lead">We're constantly working to improve our platform and add new features that enhance your experience. Here's a sneak peek at what we're currently developing.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-white/10 p-5 rounded-lg">
          <h2 class="text-xl font-bold text-white mb-3">Enhanced Customer Analytics</h2>
          <p>We're building a comprehensive analytics dashboard that will provide deeper insights into your customer data. This will include visualizations, trend analysis, and predictive modeling to help you make more informed decisions.</p>
          <p class="text-indigo-300 mt-2">Expected release: Q1 2024</p>
        </div>
        
        <div class="bg-white/10 p-5 rounded-lg">
          <h2 class="text-xl font-bold text-white mb-3">Mobile Application</h2>
          <p>Soon, you'll be able to access our platform on the go with our new mobile application. Available for both iOS and Android, the app will include all the core features of the web platform, optimized for mobile use.</p>
          <p class="text-indigo-300 mt-2">Expected release: Q2 2024</p>
        </div>
        
        <div class="bg-white/10 p-5 rounded-lg">
          <h2 class="text-xl font-bold text-white mb-3">Integration Capabilities</h2>
          <p>We're expanding our integration options to allow seamless connection with popular CRM systems, marketing tools, and e-commerce platforms. This will help streamline your workflow and keep all your data in sync.</p>
          <p class="text-indigo-300 mt-2">Expected release: Q3 2024</p>
        </div>
        
        <div class="bg-white/10 p-5 rounded-lg">
          <h2 class="text-xl font-bold text-white mb-3">Advanced ASCII Tools</h2>
          <p>Our ASCII converter is getting an upgrade! The new version will include batch processing, more encoding options, and the ability to save and share your conversions.</p>
          <p class="text-indigo-300 mt-2">Expected release: Q4 2023</p>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Customizable Dashboards</h2>
      <p>We're introducing customizable dashboards that allow you to arrange and prioritize the information that matters most to you. You'll be able to create multiple dashboards for different purposes or team members.</p>
      
      <div class="my-6">
        <p class="font-semibold mb-2">Key features of the new dashboards:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Drag-and-drop interface for easy customization</li>
          <li>Wide range of widgets and data visualizations</li>
          <li>Ability to share dashboards with team members</li>
          <li>Real-time data updates</li>
          <li>Export options for reports and presentations</li>
        </ul>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Enhanced Security Features</h2>
      <p>We're implementing additional security measures, including two-factor authentication, enhanced encryption, and more detailed access controls to keep your data safe.</p>
      
      <div class="bg-indigo-900/50 p-6 rounded-lg my-8 text-center">
        <h3 class="text-xl font-bold mb-3">Want to be a beta tester?</h3>
        <p class="mb-4">We're looking for users to test our new features before they're released to the public.</p>
        <button class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors" onclick="alert('Beta testing program will be available soon!')">
          Join Beta Program
        </button>
      </div>
      
      <div class="border-l-4 border-indigo-400 pl-4 my-6">
        <p class="italic">We're excited about these upcoming features and can't wait to share them with you. Stay tuned for announcements about release dates and beta testing opportunities.</p>
      </div>
    `,
    author: 'Product Team',
    category: 'Announcements',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
};

const BlogPost = ({ onBack, postId }) => {
  const post = blogPostsData[postId];
  const currentDate = getCurrentDate();
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
          <button
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <button
          data-cy="blog-post-back-button"
          onClick={onBack}
          className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </button>
        
        <div className="mb-8">
          <div className="h-64 overflow-hidden rounded-lg mb-6">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-white/60 mb-6 text-sm space-x-4">
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
        </div>
        
        <article 
          className="text-white/90 blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-12 pt-6 border-t border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => alert('Share functionality coming soon!')}
            >
              Facebook
            </button>
            <button 
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
              onClick={() => alert('Share functionality coming soon!')}
            >
              Twitter
            </button>
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              onClick={() => alert('Share functionality coming soon!')}
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