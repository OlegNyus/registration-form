import React from 'react';

const PageLinks = () => {
  const handleMdViewerClick = (e) => {
    e.preventDefault();
    window.location.hash = 'mdviewer';
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
      <a
        data-cy="test-lab-link"
        href="https://thetestlab.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white underline transition-colors duration-200"
      >
        The Test Lab
      </a>
      <a
        data-cy="md-viewer-link"
        href="#mdviewer"
        onClick={handleMdViewerClick}
        className="opacity-0 h-6 cursor-pointer hover:cursor-pointer"
        style={{ textShadow: 'none' }}
        aria-hidden="false"
      >
        MD viewer
      </a>
    </div>
  );
};

export default PageLinks;