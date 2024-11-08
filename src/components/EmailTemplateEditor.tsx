import React, { useState } from 'react';
import DOMPurify from 'dompurify';

const EmailTemplateEditor: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState('<p>Your HTML here</p>');
  const [cssContent] = useState('p { color: blue; }');
  const [previewContent, setPreviewContent] = useState('');

  const purifierConfig = {
    ADD_TAGS: ['style'],
  };

  const updatePreview = () => {
    const dirty = `<style>${cssContent}</style>${htmlContent}`;
    const clean = DOMPurify.sanitize(dirty, purifierConfig);
    setPreviewContent(clean);
  };

  return (
    <div className="p-4 border rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4">Email Template Editor</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-2">
          <h3 className="font-semibold">HTML</h3>
          <textarea
            className="w-full p-2 border rounded h-48"
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
          ></textarea>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={updatePreview}
          >
            Refresh Preview
          </button>
        </div>
        <div className="md:w-1/2 md:pl-2 border-t mt-4 md:mt-0 md:border-t-0 md:border-l">
          <h3 className="font-semibold">Live Preview</h3>
          <div
            className="border rounded p-2 h-80 overflow-auto"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
