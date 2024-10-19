// CodeBlock.tsx
import React from 'react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="relative my-4 p-4 border rounded bg-gray-100">
      <pre className="whitespace-pre-wrap break-words">{code}</pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
      >
        Copy
      </button>
    </div>
  );
};

export default CodeBlock;
