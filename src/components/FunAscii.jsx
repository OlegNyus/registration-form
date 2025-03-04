import React, { useState } from 'react';

const FunAscii = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Fun ASCII Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert any text to its binary ASCII representation with this simple tool.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <label htmlFor="phraseInput" className="block text-lg font-medium text-gray-700 mb-3">
                Enter a phrase
              </label>
              <input
                id="phraseInput"
                type="text"
                maxLength={256}
                value={inputPhrase}
                onChange={(e) => setInputPhrase(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                placeholder="Type your phrase here..."
              />
            </div>
            
            <button
              onClick={convertToAscii}
              className="w-full sm:w-auto bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Convert
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <label htmlFor="asciiOutput" className="block text-lg font-medium text-gray-700 mb-3">
              ASCII result
            </label>
            <textarea
              id="asciiOutput"
              readOnly
              value={asciiResult}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm h-32 font-mono"
            />
            
            {asciiResult && (
              <div className="mt-4 text-sm text-gray-600">
                <p>Each character is represented by its 8-bit binary ASCII code, separated by spaces.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This tool converts each character of your input text to its ASCII code, then represents that code in binary (base-2) format.
            Each character is displayed as an 8-bit binary number, making it easy to see the underlying binary representation of your text.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunAscii; 