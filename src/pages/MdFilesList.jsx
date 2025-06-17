import React, { useCallback } from 'react';
import { ArrowLeft, FileText, Upload, Loader, Clock } from 'lucide-react';
import { useMdFiles } from '../context/MdFilesContext';
import PageLinks from '../components/PageLinks';

const MdFilesList = ({ category, onBack }) => {
  const { getFilesByCategory, uploadFile, loading, error } = useMdFiles();
  const files = getFilesByCategory(category);

  const handleFileUpload = useCallback(async (event) => {
    // Coming Soon - disable file upload
    event.preventDefault();
    alert('📤 File upload feature is coming soon! We\'re working on it.');
    return;
    
    /* Original upload functionality - commented out for static deployment
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
    */
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
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Coming Soon</span>
            </div>
            <label className="cursor-pointer text-white/50 flex items-center gap-2 px-4 py-2 rounded bg-white/10 transition-colors duration-200 opacity-50 cursor-not-allowed">
              <Upload className="w-4 h-4" />
              <span>Upload MD</span>
              <input
                type="file"
                accept=".md"
                onChange={handleFileUpload}
                className="hidden"
                data-cy="file-upload-input"
                disabled
              />
            </label>
          </div>
        </div>

        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-200 mb-2">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">File Management Coming Soon!</h3>
          </div>
          <p className="text-yellow-100/80 text-sm">
            We're building an amazing file management system where you'll be able to upload, organize, and view your markdown files. This feature will be available in the next update!
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : error ? (
          <div className="text-yellow-400 text-center p-4 bg-yellow-500/10 rounded-lg">
            📄 {error}
          </div>
        ) : (
          <div className="space-y-4">
            {files.length === 0 ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                </div>
                <p className="text-white/80">
                  File viewing will be available soon!
                </p>
                <p className="text-white/60 text-sm mt-2">
                  We're working on bringing you a powerful markdown file viewer.
                </p>
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.name}
                  className="p-4 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 transition-colors duration-200 flex items-center gap-3 opacity-50"
                  data-cy={`md-file-${file.name}`}
                >
                  <FileText className="w-5 h-5 text-white/80" />
                  <span className="text-white">{file.name}</span>
                  <span className="ml-auto text-yellow-200 text-xs">Coming Soon</span>
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