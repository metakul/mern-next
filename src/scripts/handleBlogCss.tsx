import React from "react";
import "./blogdescription.css"
import CodeBlock from "@/components/CodeBlock/CodeBlock";
export const renderCustomStyles = (node: any, index: number) => {
  if (node.nodeType === 1) { // Node.ELEMENT_NODE

    switch (node.nodeName.toLowerCase()) {
      case 'blockquote':
        const blockquoteContent = Array.from(node.childNodes)
          .map((childNode, idx) => renderCustomStyles(childNode, idx))
          .join('');

        // Check for code blocks within blockquote
        const codeMatch = blockquoteContent.match(/```(.*?)```/s);
        if (codeMatch) {
          const codeBlock = codeMatch[1].trim();
          return <CodeBlock key={index} code={codeBlock} />; // Use CodeBlock for code
        }

        return <blockquote key={index}>{blockquoteContent}</blockquote>;


      case 'b':
      case 'strong':
        return (
          <span key={index} className="font-bold underline text-md">
            {Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}
          </span>
        );
      case 'a':
        return (
          <a key={index} className="underline text-blue-600 hover:text-blue-800 text-md" href={node.getAttribute('href')} target="_blank" rel="noopener noreferrer">
            {Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}
          </a>
        );
      case 'code': // New case for code blocks
        const code = Array.from(node.childNodes).map((childNode: any, idx: number) =>
          renderCustomStyles(childNode, idx)
        ).join(''); // Join to get the complete code string
        return <CodeBlock key={index} code={code} />; // Use CodeBlock component
      case 'pre':
      case 'code':
        const codeText = Array.from(node.childNodes)
          .map((childNode: any, idx: number) => renderCustomStyles(childNode, idx))
          .join('');

        const codeTextMatch = codeText.match(/```(.*?)```/s);
        if (codeTextMatch) {
          const extractedCode = codeTextMatch[1].trim();
          return <CodeBlock key={index} code={extractedCode} />; // Use CodeBlock for code
        }

        return null; case 'img':
        return (
          <img
            key={index}
            src={node.getAttribute('src')}
            alt={node.getAttribute('alt') || 'Image'}
            className="max-w-full h-auto my-4"
          />
        );
      case 'i':
      case 'em':
        return <em key={index} className="italic">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</em>;
      case 'ul':
        return <ul key={index} className="list-disc list-inside my-4">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</ul>;
      case 'li':
        return <li key={index} className="ml-4 mb-2">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</li>;
      case 'p':
        return <p key={index} className="mb-6 text-md leading-relaxed">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</p>;
      case 'h1':
        return <h1 key={index} className="mb-6 text-md leading-relaxed">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</h1>;
      case 'h2':
        return <h2 key={index} className="mb-6 text-md leading-relaxed">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</h2>;

      // Handle iframes
      case 'iframe':
        return (
          <div key={index} className="iframe-container mb-6">
            <iframe
              src={node.getAttribute('src')}
              title={node.getAttribute('title') || 'Embedded Content'}
              width={node.getAttribute('width') || '100%'}
              height={node.getAttribute('height') || '315'}
              frameBorder="0"
              allowFullScreen
              className="w-full"
            />
          </div>
        );

      default:
        return <React.Fragment key={index}>{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</React.Fragment>;
    }
  } else if (node.nodeType === 3) { // Node.TEXT_NODE
    const textContent = node.textContent || '';
    if (textContent.trim() === '') return null; // Ignore empty text nodes
    return handleSpecialCharacters(textContent);
  }
  return null;
};

// Handle special characters, more extensible in case of other markup.
const handleSpecialCharacters = (text: string) => {
  // Currently handling underscores, you can extend this logic
  return text.replace(/_/g, '');
};

// Parse HTML string into nodes
export const parseHTML = (html: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return Array.from(tempDiv.childNodes);
};

// Calculate reading time based on 120 words per minute
export const calculateReadingTime = (description: string) => {
  const wordsPerMinute = 120;
  const words = description.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Handle share functionality
export const handleShare = (link: string) => {
  const fullLink = `https://yourwebsite.com${link}`;

  if (navigator.share) {
    navigator.share({
      title: 'Check this out!',
      text: 'Here’s an interesting blog you might enjoy.',
      url: fullLink
    })
      .catch((error) => console.error('Error sharing', error));
  } else {
    navigator.clipboard.writeText(fullLink)
      .then(() => {
        alert('Link copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying link', error);
        alert('Failed to copy the link');
      });
  }
};

const codeBlockRegex = /```(.*?)```/gs;


export const parseMessageContent = (content: string) => {
  const parts = [];
  let lastIndex = 0;

  content.replace(codeBlockRegex, (match, codeBlock, index) => {
    // Add the text before the code block
    if (lastIndex < index) {
      parts.push(content.slice(lastIndex, index));
    }
    
    // Add the code block as a CodeBlock component
    parts.push(<CodeBlock key={index} code={codeBlock.trim()} />);
    
    lastIndex = index + match.length; // Update last index
    return match;
  });

  // Add any remaining text after the last code block
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts;
};
