import { Dispatch } from '@reduxjs/toolkit';
import Request from '@/Backend/axiosCall/apiCall';
import { ApiSuccess, ApiError } from '../../../Datatypes/interfaces/interface';
import { fetchBotsRequest, fetchBotsSuccess, fetchBotsFailure } from './BotSlice';

// Interface for Bot Data
export interface BotData {
  id: string;
  alias: string;
  userId: string;
  filePath: string;
  episode: string;
  mediaName: string;
  videoDuration: number;
  videoQuantity: number;
  videoTocut: number;
  accessToken: string;
  location: string;
  hashtags: string;
  caption: string;
  status: string;
  cronSchedule: string | null;
  isPaused: boolean;
  nextRun: string | null;
}
// Thunk to fetch bots
export const fetchBotsDispatcher = () => async (dispatch: Dispatch) => {
  try {
    // Dispatch request action to update state before the async call
    dispatch(fetchBotsRequest());

    console.log("Fetching bots");

    const response = await Request({
      endpointId: "GetBot",
    });

    const apiSuccess: ApiSuccess = {
      statusCode: response.status,
      message: 'Bots retrieved successfully.',
      data: response.data,  // Assuming the response contains `data`
    };

    // Dispatch success action with the fetched data
    dispatch(fetchBotsSuccess({ data: apiSuccess.data as BotData[], message: apiSuccess.message }));

  } catch (error) {
    const castedError = error as ApiError;

    // Dispatch failure action with the error message
    dispatch(fetchBotsFailure(castedError?.error === "string" ? castedError?.error : 'Unknown Error'));
  }
};
export const createBotDispatcher = (data:any) => async (dispatch: Dispatch) => {
  try {
    // Dispatch request action to update state before the async call
    dispatch(fetchBotsRequest());
    const isFormData = data instanceof FormData;

    const response = await Request({
      endpointId: "create_bot",
      data: data,
      isFormData: isFormData  // Pass whether data is FormData
    });

    const apiSuccess: ApiSuccess = {
      statusCode: response.status,
      message: 'Bots Added successfully.',
      data: response.data, 
    };

    // Dispatch success action with the fetched data
    dispatch(fetchBotsSuccess({ data: response.data as BotData[], message: apiSuccess.message }));

  } catch (error) {
    const castedError = error as ApiError;

    // Dispatch failure action with the error message
    dispatch(fetchBotsFailure(castedError?.error === "string" ? castedError?.error : 'Unknown Error'));
  }
};
