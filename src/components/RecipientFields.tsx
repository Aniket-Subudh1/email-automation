import React from 'react';

interface Recipients {
  to: string;
  cc: string;
  bcc: string;
}

interface RecipientFieldsProps {
  recipients: Recipients;
  setRecipients: (recipients: Recipients) => void;
}

const RecipientFields: React.FC<RecipientFieldsProps> = ({ recipients, setRecipients }) => {
  const handleChange = (field: keyof Recipients, value: string) => {
    setRecipients({ ...recipients, [field]: value });
  };

  return (
    <div className="p-4 border rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4">Enter Recipients</h2>
      {(['to', 'cc', 'bcc'] as Array<keyof Recipients>).map((field) => (
        <div key={field} className="mb-2">
          <label className="block mb-1">{field.toUpperCase()}:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder={`Enter ${field.toUpperCase()} emails separated by commas`}
            value={recipients[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipientFields;
