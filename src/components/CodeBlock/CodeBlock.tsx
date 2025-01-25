import { getColors } from '@/layout/Theme/themes';
import React from 'react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const colors = getColors(); // Retrieve theme colors

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div
      className="relative my-4 p-4 border rounded"
      style={{
        backgroundColor: colors.grey[800], // Adjust background based on theme
        borderColor: colors.grey[900], // Border based on theme
      }}
    >
      <pre
        className="whitespace-pre-wrap break-words"
        style={{
          color: colors.grey[200], // Adjust text color based on theme
        }}
      >
        {code}
      </pre>
      <button
        onClick={copyToClipboard}
        style={{
          backgroundColor: colors.blueAccent[500],
          color: colors.grey[100],
        }}
        className={`absolute top-2 right-2 px-2 py-1 rounded hover:bg-blue-600`}
      >
        Copy
      </button>
    </div>
  );
};

export default CodeBlock;
