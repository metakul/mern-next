import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoursesState, ICourse, ITopic } from '../../../Datatypes/interfaces/interface';

const initialState: CoursesState = {
  courses: [] as ICourse[],
  loading: false,
};

const coursesSlice = createSlice({
  name: 'coursesCollection',
  initialState,
  reducers: {
    setLoadedCourses: (state, action: PayloadAction<{ courseData?: ICourse[], loading: boolean }>) => {
      const loadedCourses = action.payload.courseData;
      loadedCourses && loadedCourses.forEach(course => {
        if (!state.courses.some(existingCourse => existingCourse.id === course.id)) {
          state.courses.push(course);
        }
      });
      state.loading = action.payload.loading;
    },
    addCourse: (state, action: PayloadAction<ICourse>) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<ICourse>) => {
      const updatedCourse = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === updatedCourse.id);
      if (courseIndex !== -1) {
        state.courses[courseIndex] = updatedCourse;
      }
    },
    addTopicsToCourse: (state, action: PayloadAction<{ id: string, topics: ITopic[] }>) => {
      const { id, topics } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === id);
      if (courseIndex !== -1) {
        state.courses[courseIndex].topics.push(...topics);
      }
    },
    deleteTopicFromCourse: (state, action: PayloadAction<{ courseId: string, topicId: string }>) => {
      const { courseId, topicId } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === courseId);
      if (courseIndex !== -1) {
        state.courses[courseIndex].topics = state.courses[courseIndex].topics.filter(topic => topic.id !== Number(topicId));
      }
    },
    updateTopicInCourse: (state, action: PayloadAction<{ courseId: string, topicId: string, title: string, content: string }>) => {
      const { courseId, topicId, title, content } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === courseId);
      if (courseIndex !== -1) {
        const topicIndex = state.courses[courseIndex].topics.findIndex(topic => topic.id === Number(topicId));
        if (topicIndex !== -1) {
          state.courses[courseIndex].topics[topicIndex] = { ...state.courses[courseIndex].topics[topicIndex], title, content };
        }
      }
    },
  },
});

export const { setLoadedCourses, addCourse, updateCourse, addTopicsToCourse, deleteTopicFromCourse, updateTopicInCourse } = coursesSlice.actions;

export default coursesSlice.reducer;

export const selectedCourses = (state: { coursesCollection: CoursesState }) => state.coursesCollection;

export const useSelectedCourse = (id: string | undefined) => (state: { coursesCollection: CoursesState }) => {
  return state.coursesCollection.courses.find(course => course.id === id);
};