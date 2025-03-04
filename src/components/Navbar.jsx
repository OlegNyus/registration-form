import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">My App</div>
        <div className="space-x-4">
          <a href="#registration" className="text-white hover:text-gray-300">Home</a>
          <a href="#fun-ascii" className="text-white hover:text-gray-300">Fun ASCII</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 