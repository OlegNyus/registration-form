import React, { useState } from 'react';
import { Code, Copy, RefreshCw } from 'lucide-react';
import PageLinks from './PageLinks';

const FunAscii = ({ onBack }) => {
  const [inputPhrase, setInputPhrase] = useState('');
  const [asciiResult, setAsciiResult] = useState('');

  const convertToAscii = () => {
    const result = inputPhrase
      .split('')
      .map(char => {
        const binary = char.charCodeAt(0).toString(2);
        // Pad with leading zeros to ensure 8 bits
        return binary.padStart(8, '0');
      })
      .join(' ');
    
    setAsciiResult(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiResult);
  };

  const handleReset = () => {
    setInputPhrase('');
    setAsciiResult('');
  };

  // Replace the rainbow style with a text-stroke animation
  const rainbowTextStyle = {
    color: 'white',
    WebkitTextStroke: '1px',
    WebkitTextStrokeColor: 'red',
    animation: 'rainbow-stroke 6s linear infinite',
  };

  // Update the keyframes animation to animate the text-stroke-color
  const rainbowAnimation = `
    @keyframes rainbow-stroke {
      0% { -webkit-text-stroke-color: red; }
      16% { -webkit-text-stroke-color: orange; }
      32% { -webkit-text-stroke-color: yellow; }
      48% { -webkit-text-stroke-color: green; }
      64% { -webkit-text-stroke-color: blue; }
      80% { -webkit-text-stroke-color: indigo; }
      100% { -webkit-text-stroke-color: violet; }
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            ASCII Binary Converter
          </h1>
          <p className="text-xl text-white/80">
            Convert your text to binary ASCII representation
          </p>
        </div>
        
        {/* ASCII Art */}
        <div className="text-center mb-16">
          <style>{rainbowAnimation}</style>
          <pre 
            className="font-mono text-sm inline-block text-left" 
            style={rainbowTextStyle}
          >
            {`    __    ___  ______ ______     ___  _____     _____  ____   ____  ____ 
   / /   /  _|/ ____// ____/    /  _|/ ___/    / ____// __ \\ / __ \\/ __ \\
  / /    / / / /_   / __/       / /  \\__ \\    / / __ / / / // / / / / / /
 / /____/ / / __/  / /___     _/ /  ___/ /   / /_/ // /_/ // /_/ / /_/ / 
/_____/___//_/    /_____/    /___/ /____/    \\____/ \\____/ \\____/\\____/  
                                                                         `}
          </pre>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 mb-16 shadow-xl">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="inputPhrase" className="flex items-center text-yellow-300 font-medium text-lg">
                <span className="mr-2">⚡</span> Enter your text:
              </label>
              <button
                onClick={handleReset}
                className="flex items-center text-yellow-300 hover:text-yellow-200 transition-colors duration-200"
                data-cy="reset-button"
                title="Reset"
              >
                <RefreshCw className="w-5 h-5 mr-1" />
                <span className="font-medium">Reset</span>
              </button>
            </div>
            <div className="flex">
              <input
                id="inputPhrase"
                type="text"
                value={inputPhrase}
                onChange={(e) => setInputPhrase(e.target.value)}
                placeholder="Type something here..."
                className="flex-grow p-4 bg-indigo-700/50 border border-indigo-600 rounded-l-md text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200"
                data-cy="ascii-input"
              />
              <button
                onClick={convertToAscii}
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-r-md transition-colors duration-200 flex items-center gap-2"
                data-cy="convert-button"
              >
                <Code className="w-5 h-5" />
                <span>Convert</span>
              </button>
            </div>
          </div>
          
          {asciiResult && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">
                  Binary ASCII Result:
                </label>
                <button
                  onClick={handleCopy}
                  className="text-indigo-300 hover:text-white flex items-center gap-1 transition-colors duration-200"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <div 
                className="w-full p-4 bg-gray-900 border border-indigo-700 rounded-md text-green-400 font-mono text-sm overflow-x-auto"
                data-cy="ascii-result"
              >
                {asciiResult}
              </div>
              
              <div className="mt-4 text-sm text-white/60">
                <p>Each character is represented by its 8-bit binary ASCII code, separated by spaces.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            This tool converts each character of your input text to its ASCII code, then represents that code in binary (base-2) format.
            Each character is displayed as an 8-bit binary number, making it easy to see the underlying binary representation of your text.
          </p>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default FunAscii; 