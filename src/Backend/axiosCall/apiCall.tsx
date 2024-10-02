import { RequestOptions } from '@/Datatypes/interfaces/interface';
import { toast } from 'react-toastify';
import { ApiEndpoint } from '@/Datatypes/enums';

const Request = async ({ endpointId, slug, data }:RequestOptions) => {
  const storedAccessToken = localStorage.getItem('access');
  const endpoint = ApiEndpoint[endpointId];

  if (!endpoint) {
    throw new Error(`Invalid API endpoint: ${endpointId}`);
  }

  if (endpoint.loadingMessage) {
  }

  try {
    // Construct the full request URL, appending additional data if necessary
    let fullUrl = endpoint.url;
    if (slug) {
      fullUrl += slug;
    }

     // Set up request options
     const requestOptions = {
      method: endpoint.method,
      headers: {
        ...endpoint.headers,
        Authorization: `Bearer ${storedAccessToken}`
      },
      // Include body for non-GET requests
      ...(endpoint.method !== 'GET' && { body: data ? JSON.stringify(data) : undefined })
    };

    // Make the HTTP request using fetch
    const response = await toast.promise(
      fetch(fullUrl, requestOptions), {
        pending: endpoint.loadingMessage,
        success: endpoint.successMessage ? endpoint.successMessage : undefined,
        error: endpoint.errorMessage ? endpoint.errorMessage : undefined,
      }
    );
    console.log(response);
    

    // Parse response
    const responseData = await response.json();

    console.log("responseData",responseData);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(responseData.message || 'Request failed');
    }

    // Return the parsed response data
    return responseData;
  } catch (error) {
    // Handle errors gracefully, providing more informative messages if possible
    throw error;
  }
};

export default Request;
