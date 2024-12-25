import ChatGPTClone from '@/Projects/ChatGpt/ChatGpt';
import { Helmet } from 'react-helmet';

const ChatGPT = () => {
  return (
    <>
      <Helmet>
        <title>ChatGPT AI | Metakul</title> 
        <meta 
          name="description" 
          content="Experience the power of ChatGPT AI with Metakul. Engage in insightful conversations, generate creative text, and explore the possibilities of advanced AI. Try it now!" 
        />
        <meta 
          name="keywords" 
          content="ChatGPT, AI, Artificial Intelligence, Language Model, Chatbot, Conversational AI, Metakul, AI Chat, AI Assistant" 
        />
        <meta property="og:title" content="ChatGPT AI | Metakul" />
        <meta 
          property="og:description" 
          content="Experience the power of ChatGPT AI with Metakul. Engage in insightful conversations, generate creative text, and explore the possibilities of advanced AI. Try it now!" 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metakul.com/chatgpt" /> 
        <meta property="og:image" content="https://metakul.com/logo.svg" /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChatGPT AI | Metakul" />
        <meta 
          name="twitter:description" 
          content="Experience the power of ChatGPT AI with Metakul. Engage in insightful conversations, generate creative text, and explore the possibilities of advanced AI. Try it now!" 
        />
        <meta name="twitter:image" content="https://metakul.com/logo.svg" />
      </Helmet>
      <ChatGPTClone /> 
    </>
  );
};

export default ChatGPT;