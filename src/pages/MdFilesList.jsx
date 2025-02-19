import React, { useCallback } from 'react';
import { ArrowLeft, FileText, Upload, Loader } from 'lucide-react';
import { useMdFiles } from '../context/MdFilesContext';
import PageLinks from '../components/PageLinks';

const MdFilesList = ({ category, onBack }) => {
  const { getFilesByCategory, uploadFile, loading, error } = useMdFiles();
  const files = getFilesByCategory(category);

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith('.md')) {
      alert('Please upload only .md files');
      return;
    }

    try {
      await uploadFile(category, file);
    } catch (err) {
      alert('Failed to upload file');
    }
  }, [category, uploadFile]);

  const getCategoryTitle = (cat) => {
    switch(cat) {
      case 'kids':
        return 'Kids Stories';
      case 'tutorials':
        return 'Tutorials';
      case 'blog':
        return 'Blog Posts';
      default:
        return 'Files';
    }
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
          <h2 className="text-2xl font-bold text-white">{getCategoryTitle(category)}</h2>
          <label className="cursor-pointer text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200">
            <Upload className="w-4 h-4" />
            <span>Upload MD</span>
            <input
              type="file"
              accept=".md"
              onChange={handleFileUpload}
              className="hidden"
              data-cy="file-upload-input"
            />
          </label>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : error ? (
          <div className="text-red-400 text-center p-4">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {files.length === 0 ? (
              <p className="text-white/80 text-center py-8">
                No files yet. Upload your first MD file!
              </p>
            ) : (
              files.map((file) => (
                <div
                  key={file.name}
                  className="p-4 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer flex items-center gap-3"
                  data-cy={`md-file-${file.name}`}
                >
                  <FileText className="w-5 h-5 text-white/80" />
                  <span className="text-white">{file.name}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <PageLinks />
    </div>
  );
};

export default MdFilesList;