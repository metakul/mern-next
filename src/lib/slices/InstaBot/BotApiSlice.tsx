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

    const transformFormData = () => {
      const formData = new FormData();
     
      // Append the botFile and other data fields to the formData
      formData.append('botFile', data.newBotData.botFile); // Attach the file (ensure data.botFile is a file or valid URL)
      formData.append('_alias', data.newBotData._alias);
      formData.append('episode', data.newBotData.episode);
      formData.append('videoNumber', data.newBotData.videoNumber);
      formData.append('videoDuration', data.newBotData.videoDuration);
      formData.append('accessToken', data.newBotData.accessToken);
      formData.append('location', data.newBotData.location);
      formData.append('hashtags', data.newBotData.hashtags);
      formData.append('caption', data.newBotData.caption);

      return formData;
    };

    const dataT = await transformFormData();

    const response = await Request({
      endpointId: 'create_bot',
      data: dataT,
    });

    const apiSuccess: ApiSuccess = {
      statusCode: response.status,
      message: 'Bots Added successfully.',
      data: response.data, 
    };

    data.setDialogOpen()

    // Dispatch success action with the fetched data
    // dispatch(fetchBotsSuccess({ data: response.data as BotData[], message: apiSuccess.message }));
 // Dispatch request action to update state after the async call
    // dispatch(fetchBotsRequest());

    return apiSuccess
  } catch (error) {
    const castedError = error as ApiError;

    // Dispatch failure action with the error message
    dispatch(fetchBotsFailure(castedError?.error === "string" ? castedError?.error : 'Unknown Error'));
  }
};
