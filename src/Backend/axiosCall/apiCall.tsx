import { RequestOptions } from '@/Datatypes/interfaces/interface';

const Request = async (options: RequestOptions) => {
  let toastId;
  const storedAccessToken = localStorage.getItem('access');

  if (options.loadingMessage) {
    console.log(options.loadingMessage);
  }

  try {
    // Construct the full request URL, prepending the API endpoint if necessary
    const fullUrl = `${options.url}`;

    // Make the HTTP request using fetch
    const response = await fetch(fullUrl, {
      method: options.method,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${storedAccessToken}`
      },
      body: options?.data ? JSON.stringify(options.data) : undefined
    });

    // Parse response
    const responseData = await response.json();

    // Check if response is ok
    if (!response.ok) {
      throw new Error(responseData.message || 'Request failed');
    }

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
