import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoadedCourses, addCourse, updateCourse, addTopicsToCourse, deleteTopicFromCourse, updateTopicInCourse } from './CoursesSlice';
import { ApiError, ApiSuccess, ICourse, ITopic } from '../../../Datatypes/interfaces/interface';
import Request from '@/Backend/axiosCall/apiCall';

export const fetchCoursesApiSlice = createAsyncThunk(
  'coursesCollection/setLoadedCourses',
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoadedCourses({ loading: true }));

    try {
      const response = await Request({
        endpointId: "GET_ALL_COURSES",
      });

      const courses: ICourse[] = response;
      const transformedCourses = courses.map(course => ({
        ...course,
        courseId: course.id,
      }));

      dispatch(setLoadedCourses({ courseData: transformedCourses, loading: false }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Courses Fetched Successfully',
        data: response,
      };

      return apiSuccess;

    } catch (error) {
      dispatch(setLoadedCourses({ loading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const addCourseApiSlice = createAsyncThunk(
  'coursesCollection/addCourse',
  async ({ newCourseData, closeDialog, clearForm, setIsSaving }: { newCourseData: ICourse, closeDialog: any, clearForm: any, setIsSaving: any }, { rejectWithValue, dispatch }) => {
    try {

      console.log(newCourseData);
      
      const response = await Request({
        endpointId: "ADD_COURSE",
        data: newCourseData,
      });

      clearForm();

      const newCourse: ICourse = response?.newCourse || response;
      const { id: id, ...rest } = newCourse;
      const updatedCourse = { id, ...rest };

      dispatch(addCourse(updatedCourse));

      const apiSuccess: ApiSuccess = {
        statusCode: response,
        message: 'Course Added Successfully',
        data: response,
      };

      closeDialog();
      setIsSaving(false);
      return apiSuccess;

    } catch (error) {
      setIsSaving(false);
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const addTopicsToCourseApiSlice = createAsyncThunk(
  'coursesCollection/addTopicsToCourse',
  async ({ courseId, topics }: { courseId: string, topics: ITopic[] }, { rejectWithValue, dispatch }) => {
    try {
      const response = await Request({
        endpointId: "ADD_TOPICS_TO_COURSE",
        slug: `/${courseId}/topics`,
        data: { topics },
      });

      dispatch(addTopicsToCourse({ id:courseId, topics }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Topics Added Successfully',
        data: response,
      };

      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const deleteTopicFromCourseApiSlice = createAsyncThunk(
  'coursesCollection/deleteTopicFromCourse',
  async ({ courseId, topicId }: { courseId: string, topicId: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await Request({
        endpointId: "DELETE_TOPIC_FROM_COURSE",
        slug: `/${courseId}/topics/${topicId}`,
      });

      dispatch(deleteTopicFromCourse({ courseId, topicId }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Topic Deleted Successfully',
        data: response,
      };

      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const updateTopicInCourseApiSlice = createAsyncThunk(
  'coursesCollection/updateTopicInCourse',
  async ({ courseId, topicId, title, content }: { courseId: string, topicId: string, title: string, content: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await Request({
        endpointId: "UPDATE_TOPIC_IN_COURSE",
        slug: `/${courseId}/topics/${topicId}`,
        data: { title, content },
      });

      dispatch(updateTopicInCourse({ courseId, topicId, title, content }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Topic Updated Successfully',
        data: response,
      };

      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);