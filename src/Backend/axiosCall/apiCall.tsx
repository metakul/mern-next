import { RequestOptions } from '@/Datatypes/interfaces/interface';
import { toast } from 'react-toastify';

const Request = async (options: RequestOptions) => {
  const storedAccessToken = localStorage.getItem('access');

  if (options.loadingMessage) {
    console.log(options.loadingMessage);
  }
  let requestOptions
  try {
    // Construct the full request URL, prepending the API endpoint if necessary
    const fullUrl = `${options.url}`;

    // Check if the request method is GET or HEAD
    if (options.method === 'GET' || options.method === 'HEAD') {
      // Exclude body for GET and HEAD requests
      requestOptions = {
        method: options.method,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${storedAccessToken}`
        }
      };
    } else {
      // Include body for other request methods
      requestOptions = {
        method: options.method,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${storedAccessToken}`
        },
        body: options?.data ? JSON.stringify(options.data) : undefined
      };
    }

    // Make the HTTP request using fetch
    const response =  await toast.promise(
       fetch(fullUrl, requestOptions),{
          pending: options.loadingMessage ,
          success: options.successMessage ? options.successMessage : undefined,
          error: options.errorMessage ? options.errorMessage : undefined,
       })

    // Parse response
    const responseData = await response.json();

    // Check if response is ok
    // if (!response.ok) {
    //   throw new Error(responseData.message || 'Request failed');
    // }

    // Return the parsed response data
    console.log(responseData); // Accessing response data
    return responseData;
  } catch (error) {
    // Handle errors gracefully, providing more informative messages if possible
    console.error(`API request error: ${error}`);
    throw error;
  }
};


export default Request;
