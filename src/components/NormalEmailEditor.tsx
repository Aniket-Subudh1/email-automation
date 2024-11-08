import React from 'react';

interface NormalEmailEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const NormalEmailEditor: React.FC<NormalEmailEditorProps> = ({ content, setContent }) => {
  return (
    <div className="p-4  rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4">Normal Email Editor</h2>
      <textarea
        className="w-full p-2 border rounded h-48"
        placeholder="Enter your email content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
};

export default NormalEmailEditor;
