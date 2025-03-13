import React from 'react';

const PageLinks = () => {
  const handleMdViewerClick = (e) => {
    e.preventDefault();
    window.location.hash = 'mdviewer';
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
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