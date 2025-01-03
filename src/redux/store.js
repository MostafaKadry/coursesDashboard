import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/courseSlice';
import trainersReducer from './trainers/trainersSlice';
import trainersInCoursesReducer from './trainersInCourses/trainersInCoursesSlice';
import paymentsReducer from './payments/paymentsSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      courses: coursesReducer,
      trainers: trainersReducer,
      trainersInCourses: trainersInCoursesReducer,
      payments: paymentsReducer,
    },
    
  });

export const store = makeStore();