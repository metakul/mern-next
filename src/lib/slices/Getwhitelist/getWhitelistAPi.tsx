import Request from "@/Backend/axiosCall/apiCall";
import { ApiError, ApiSuccess } from "@/Datatypes/interfaces/interface";

export const getWhitelistApiCall = 
    async ({ address,setAddress }: { address: string,setAddress:any}) => {
      try {
  
        const response = await Request({
          endpointId: "getWhitelist",
          data: {address},
        });
    
  
        const apiSuccess: ApiSuccess = {
          statusCode: response.status,
          message: 'Blog Updated Successfully',
          data: response.data,
        };
        setAddress('')
        return apiSuccess;
  
      } catch (error) {
        const castedError = error as ApiError;
        console.error('Error Adding Blog:', error);
        return castedError
        // return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
      }
    }