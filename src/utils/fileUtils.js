const API_URL = 'http://localhost:3001/api';

export const getFolderStructure = async () => {
  try {
    const response = await fetch(`${API_URL}/folders`);
    if (!response.ok) {
      throw new Error('Failed to fetch folders');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching folder structure:', error);
    return {
      kids: [],
      tutorials: [],
      blog: []
    };
  }
};

export const getFileContent = async (category, filename) => {
  try {
    const response = await fetch(`${API_URL}/files/${category}/${filename}`);
    if (!response.ok) {
      throw new Error('Failed to fetch file content');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching file content:', error);
    throw error;
  }
};

export const uploadFile = async (category, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};