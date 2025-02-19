import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFolderStructure, uploadFile } from '../utils/fileUtils';

const MdFilesContext = createContext();

export const MdFilesProvider = ({ children }) => {
  const [files, setFiles] = useState({
    kids: [],
    tutorials: [],
    blog: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshFiles = async () => {
    try {
      setLoading(true);
      const structure = await getFolderStructure();
      console.log('Loaded files:', structure); // Debug log
      setFiles(structure);
      setError(null);
    } catch (err) {
      console.error('Error loading files:', err);
      setError('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshFiles();
  }, []);

  const handleFileUpload = async (category, file) => {
    try {
      await uploadFile(category, file);
      await refreshFiles();
    } catch (err) {
      setError('Failed to upload file');
      throw err;
    }
  };

  const getFilesByCategory = (category) => {
    return files[category] || [];
  };

  return (
    <MdFilesContext.Provider value={{ 
      files, 
      loading, 
      error, 
      getFilesByCategory, 
      uploadFile: handleFileUpload,
      refreshFiles 
    }}>
      {children}
    </MdFilesContext.Provider>
  );
};

export const useMdFiles = () => useContext(MdFilesContext);