import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ExcelTableViewer from './ExcelTableViewer';

interface EmailInputMethodProps {
  setEmails: (emails: string[]) => void;
}

const EmailInputMethod: React.FC<EmailInputMethodProps> = ({ setEmails }) => {
  const [method, setMethod] = useState<'manual' | 'file'>('manual');
  const [manualEmails, setManualEmails] = useState('');
  const [excelData, setExcelData] = useState<string[][]>([]); 

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith('.json')) {
      reader.onload = (event) => {
        try {
          const emails = JSON.parse(event.target?.result as string);
          if (Array.isArray(emails)) {
            setEmails(emails);
          } else {
            alert('Invalid JSON format');
          }
        } catch {
          alert('Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });
          setExcelData(jsonData);

         
          const emailList = jsonData
            .slice(1) 
            .map((row) => row[0]) 
            .filter((email) => email);
          setEmails(emailList);
        } catch {
          alert('Error parsing Excel file');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Unsupported file format');
    }
  };

  const handleManualEmailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setManualEmails(value);
    const emails = value
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email);
    setEmails(emails);
  };

  return (
    <div className="p-4  rounded-md">
      <h2 className="text-xl font-bold mb-7 text-center">Select Email Input Method</h2>
      <div className="mb-4 text-center">
        <label className="mr-4">
          <input
            type="radio"
            value="manual"
            checked={method === 'manual'}
            onChange={() => setMethod('manual')}
            className="mr-1"
          />
          Manual Entry
        </label>
        <label>
          <input
            type="radio"
            value="file"
            checked={method === 'file'}
            onChange={() => setMethod('file')}
            className="mr-1"
          />
          Upload File
        </label>
      </div>
      {method === 'manual' ? (
        <textarea
          className="w-full p-2 border rounded"
          rows={5}
          placeholder="Enter emails separated by commas"
          value={manualEmails}
          onChange={handleManualEmailsChange}
        ></textarea>
      ) : (
        <div>
          <input
            type="file"
            accept=".json, .xls, .xlsx"
            onChange={handleFileUpload}
            className="p-2 border rounded"
          />
          {excelData.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Excel Data Preview:</h3>
              <ExcelTableViewer data={excelData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailInputMethod;
