import { RequestOptions } from '@/Datatypes/interfaces/interface';
import { toast } from 'react-toastify';
import { ApiEndpoint } from '@/Datatypes/enums';
import Cookies from 'js-cookie';

const Request = async ({ endpointId, slug, data }:RequestOptions) => {
  const storedAccessToken = Cookies.get('access');
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
        Authorization: endpoint.withAuth ? `Bearer ${storedAccessToken}` : ""
      },
      // Include body for non-GET requests
      ...(endpoint.method !== 'GET' && { body: data ? JSON.stringify(data) : undefined })
    };

    // Make the HTTP request using fetch
    const response = await
      fetch(fullUrl, requestOptions);
    console.log(response);
    

    // Parse response
    const responseData = await response.json();

    console.log("responseData",responseData);
    
    // Check if response is ok
    if (!response.ok) {
      toast.error(responseData?.error || responseData?.message || endpoint.errorMessage)
      throw new Error(responseData.message || 'Request failed');
    }
    toast.success(endpoint.successMessage)

    // Return the parsed response data
    return responseData;
  } catch (error) {
    // Handle errors gracefully, providing more informative messages if possible
    throw error;
  }
};

export default Request;
