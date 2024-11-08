import React, { useState } from 'react';
import EmailInputMethod from './components/EmailInputMethod';
import RecipientFields from './components/RecipientFields';
import EmailTemplateEditor from './components/EmailTemplateEditor';
import NormalEmailEditor from './components/NormalEmailEditor';

interface Recipients {
  to: string;
  cc: string;
  bcc: string;
}

const App: React.FC = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [recipients, setRecipients] = useState<Recipients>({ to: '', cc: '', bcc: '' });
  const [emailType, setEmailType] = useState<'template' | 'normal'>('template');
  const [content, setContent] = useState('');

  const handleSendEmail = () => {
    console.log('Emails:', emails);
    console.log('Recipients:', recipients);
    console.log('Email Type:', emailType);
    console.log('Content:', content);
    alert('Email sent!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Email Automation Tool</h1>
      <EmailInputMethod setEmails={setEmails} />
      <RecipientFields recipients={recipients} setRecipients={setRecipients} />
      <div className="mt-4">
        <label className="mr-4">
          <input
            type="radio"
            value="template"
            checked={emailType === 'template'}
            onChange={() => setEmailType('template')}
            className="mr-1"
          />
          Use Email Template
        </label>
        <label>
          <input
            type="radio"
            value="normal"
            checked={emailType === 'normal'}
            onChange={() => setEmailType('normal')}
            className="mr-1"
          />
          Send Normal Email
        </label>
      </div>
      {emailType === 'template' ? (
        <EmailTemplateEditor />
      ) : (
        <NormalEmailEditor content={content} setContent={setContent} />
      )}
      <button
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSendEmail}
      >
        Send Email
      </button>
    </div>
  );
};

export default App;
