import React from "react";

export const renderCustomStyles = (node: any, index: number) => {
  if (node.nodeType === 1) { // Node.ELEMENT_NODE
    switch (node.nodeName.toLowerCase()) {
      case 'b':
      case 'strong':
        return (
          <span key={index} className="font-bold underline" style={{ fontSize: '20px' }}>
            {Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}
          </span>
        );
      case 'a':
        return (
          <a key={index} className="underline" style={{ fontSize: '10px', color: "blue" }} href={node.getAttribute('href')} target="_blank" rel="noopener noreferrer">
            {Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}
          </a>
        );
      case 'img':
        return <img key={index} src={node.getAttribute('src')} alt={node.getAttribute('alt')} className="max-w-full" />;
      case 'i':
      case 'em':
        return <em key={index}>{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</em>;
      case 'ul':
        return <ul key={index} className="list-disc list-inside mt-6 mb-6">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</ul>;
      case 'li':
        return <li key={index} className="mb-2">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</li>;
      case 'p':
        return <p key={index} className="mb-4 text-md">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</p>;

      // New case for handling iframes
      case 'iframe':
        return (
          <div key={index} className="iframe-container mb-4">
            <iframe
              src={node.getAttribute('src')}
              title={node.getAttribute('title') || 'iframe content'}
              width={node.getAttribute('width') || '100%'}
              height={node.getAttribute('height') || '300'}
              frameBorder="0"
              allowFullScreen
              className="w-full "
            />
          </div>
        );

      // Add any other cases for additional WYSIWYG editor nodes
      case 'blockquote':
        return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</blockquote>;

      // Default case for other elements
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


  const handleSpecialCharacters = (text: string) => {
    // Add logic to handle special characters like italics, etc.
    // For example:
    return text.replace(/_/g, ''); // Remove underscores (assuming underscores indicate italics)
  };

  
  export const parseHTML = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return Array.from(tempDiv.childNodes);
  };



  export const calculateReadingTime = (description: string) => {
    // Assuming an average reading speed of 200 words per minute
    const wordsPerMinute = 120;
    const words = description.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };


  export const handleShare = (link: string) => {
    // Fallback for browsers that do not support Web Share API
    navigator.clipboard.writeText(`https://localhost:3000${link}`)
      .then(() => {
        alert('Shareable link copied to clipboard');
      })
      .catch((error) => {
        console.error(error);
        
        alert('Error copying shareable link to clipboard');
      });
  };
  