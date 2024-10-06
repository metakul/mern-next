import { RequestOptions } from '@/Datatypes/interfaces/interface';
import { toast } from 'react-toastify';
import { ApiEndpoint } from '@/Datatypes/enums';
import Cookies from 'js-cookie';

const Request = async ({ endpointId, slug, data, isFormData }: RequestOptions) => {
  const storedAccessToken = Cookies.get('access');  // Retrieve stored access token
  const endpoint = ApiEndpoint[endpointId];

  if (!endpoint) {
    throw new Error(`Invalid API endpoint: ${endpointId}`);
  }

  let fullUrl = endpoint.url;
  if (slug) {
    fullUrl += `${slug}`;  // Append additional slug to URL if provided
  }

  const requestOptions: RequestInit = {
    method: endpoint.method,
    headers: {
      ...endpoint.headers,
      Authorization: endpoint.withAuth ? `Bearer ${storedAccessToken}` : ""
    }
  };

  // Check and set appropriate body for non-GET requests
  if (endpoint.method !== 'GET') {
    requestOptions.body = (isFormData && data instanceof FormData) ? data : JSON.stringify(data);
  }

  try {
    const response = await fetch(fullUrl, requestOptions);
    const responseData = await response.json();

    // Log response data for debugging
    console.log("Response:", response);
    console.log("Response Data:", responseData);

    // Handle unsuccessful response
    if (!response.ok) {
      const errorText = responseData?.error || responseData?.message || endpoint.errorMessage || "Unexpected error occurred.";
      toast.error(errorText);  // Display error notification
      throw new Error(errorText);
    }

    toast.success(endpoint.successMessage); // Show success message
    return responseData;  // Return the response data for further processing
  } catch (error) {
    console.error("Request error:", error);
    toast.error("An error occurred while processing your request.");
    throw error;  // Re-throw the error for further handling
  }
};

export default Request;