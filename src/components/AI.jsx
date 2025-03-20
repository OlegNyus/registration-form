import React, { useState } from 'react';
import { ArrowLeft, Send, RefreshCw, Bot } from 'lucide-react';
import PageLinks from './PageLinks';

const AI = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    // Add user message to conversation history
    const userMessage = { role: 'user', content: prompt };
    setConversationHistory(prev => [...prev, userMessage]);
    
    try {
      // Call the real Claude API through our proxy server
      const apiUrl = 'http://localhost:3001/api/claude';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Claude API response:', data);
      
      let claudeResponse = '';
      if (data.content && Array.isArray(data.content) && data.content.length > 0) {
        claudeResponse = data.content[0].text;
      } else {
        claudeResponse = "Sorry, I couldn't generate a proper response.";
      }
      
      // Add assistant response to conversation history
      const assistantMessage = { role: 'assistant', content: claudeResponse };
      setConversationHistory(prev => [...prev, assistantMessage]);
      
    } catch (err) {
      console.error('Error calling Claude API:', err);
      setError('Sorry, I encountered an error while processing your request. Please try again later.');
    } finally {
      setIsLoading(false);
      setPrompt(''); // Clear input after sending
    }
  };

  // Add keydown handler for Enter key submission
  const handleKeyDown = (e) => {
    // Check if Enter was pressed without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (new line)
      if (prompt.trim() && !isLoading) {
        handleSubmit(e); // Submit the form
      }
    }
  };

  const handleReset = () => {
    setPrompt('');
    setError(null);
    setConversationHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            data-cy="back-button"
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h2 className="text-2xl font-bold text-white">Claude AI Assistant</h2>
        </div>
        
        <div className="text-center mb-8">
          <Bot className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
          <p className="text-white/80 max-w-2xl mx-auto">
            Ask Claude anything and it will do its best to help you. Claude can assist with information, creative tasks, and more.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6 border border-white/10 shadow-lg mb-6">
          {/* Conversation history */}
          <div className="mb-6 space-y-4 max-h-96 overflow-y-auto">
            {conversationHistory.length > 0 ? (
              conversationHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-indigo-600/30 border border-indigo-500/30 ml-12' 
                      : 'bg-indigo-900/50 border border-indigo-700/50 mr-12'
                  }`}
                >
                  <p className="text-white whitespace-pre-wrap">{message.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-white/50 py-8">
                <p>No conversation yet. Ask Claude a question to get started!</p>
              </div>
            )}
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 rounded-lg border border-red-700/50">
              <p className="text-white">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label htmlFor="prompt" className="text-white font-medium">
                Your question for Claude:
              </label>
              <button
                type="button"
                onClick={handleReset}
                className="text-indigo-300 hover:text-white flex items-center gap-1 transition-colors duration-200"
                data-cy="reset-button"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
            
            <div className="flex">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question for Claude here... (Press Enter to send, Shift+Enter for new line)"
                className="flex-grow p-3 bg-white/5 border border-white/20 rounded-l-md text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200 h-20 resize-none"
                data-cy="ai-prompt"
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className={`px-4 ${
                  !prompt.trim() || isLoading
                    ? 'bg-indigo-600/50 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white rounded-r-md transition-colors duration-200 flex items-center justify-center`}
                data-cy="submit-button"
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">About Claude</h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Claude is an AI assistant created by Anthropic, designed to be helpful, harmless, and honest.
            It can understand complex questions and provide thoughtful, nuanced responses on a wide range of topics.
          </p>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default AI; 