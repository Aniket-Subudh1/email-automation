import React, { useState } from 'react';
import EmailInputMethod from './components/EmailInputMethod';
import RecipientFields from './components/RecipientFields';
import EmailTemplateEditor from './components/EmailTemplateEditor';
import NormalEmailEditor from './components/NormalEmailEditor';
import Navbar from './components/Navbar';

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
    <div className="custom-bg min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 pt-20">
        <div className="flex flex-col md:flex-row mt-8 md:space-x-4">
          

          <div className="card mb-4 md:mb-0 transform transition-transform duration-300 hover:scale-105 hover:border-blue-500 border-2 border-transparent">
            <div className="tools">
              <div className="circle">
                <span className="red box" />
              </div>
              <div className="circle">
                <span className="yellow box" />
              </div>
              <div className="circle">
                <span className="green box" />
              </div>
            </div>
            <EmailInputMethod setEmails={setEmails} />
          </div>

   
          <div className="card transform transition-transform duration-300 hover:scale-105 hover:border-blue-500 border-2 border-transparent">
            <div className="tools">
              <div className="circle">
                <span className="red box" />
              </div>
              <div className="circle">
                <span className="yellow box" />
              </div>
              <div className="circle">
                <span className="green box" />
              </div>
            </div>
            <RecipientFields recipients={recipients} setRecipients={setRecipients} />
          </div>
        </div>

        <div className="card mt-4 transform transition-transform duration-300 hover:scale-105 hover:border-blue-500 border-2 border-transparent">
          <div className="tools">
            <div className="circle">
              <span className="red box" />
            </div>
            <div className="circle">
              <span className="yellow box" />
            </div>
            <div className="circle">
              <span className="green box" />
            </div>
          </div>

          <div className="mb-4 flex justify-center items-center">
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

          <div className="flex justify-center">
            <button
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSendEmail}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
