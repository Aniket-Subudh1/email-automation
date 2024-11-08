
import React from 'react';

interface ExcelTableViewerProps {
  data: (string | number)[][]; 
}

const ExcelTableViewer: React.FC<ExcelTableViewerProps> = ({ data }) => {
  if (data.length === 0) {
    return null;
  }

  const headers = data[0];
  const rows = data.slice(1);

  return (
    <div className="overflow-auto max-h-64 border rounded">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {headers.map((header: string | number, index: number) => (
              <th key={index} className="px-4 py-2 font-medium">
                {header || `Column ${index + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: (string | number)[], rowIndex: number) => (
            <tr key={rowIndex} className="border-t">
              {row.map((cell: string | number, cellIndex: number) => (
                <td key={cellIndex} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelTableViewer;
