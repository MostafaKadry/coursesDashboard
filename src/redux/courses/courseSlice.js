import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [
    {
      id: 1,
      name: 'JavaScript for Beginners',
      description: 'An introductory course to JavaScript programming.',
      price: 100,
      duration: '4 weeks',
    },
    {
      id: 2,
      name: 'Advanced React',
      description: 'Deep dive into React.js with advanced concepts.',
      price: 150,
      duration: '6 weeks',
    },
    {
      id: 3,
      name: 'Data Science with Python',
      description: 'Learn data science concepts and Python programming.',
      price: 200,
      duration: '8 weeks',
    },
    {
      id: 4,
      name: 'Introduction to Machine Learning',
      description: 'Basic concepts of machine learning with practical examples.',
      price: 250,
      duration: '10 weeks',
    },
    {
      id: 5,
      name: 'UI/UX Design for Beginners',
      description: 'Learn the fundamentals of UI/UX design and wireframing.',
      price: 120,
      duration: '5 weeks',
    },
  ],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) state.courses[index] = action.payload;
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },
  },
});

export const { setCourses, addCourse, updateCourse, deleteCourse } = coursesSlice.actions;
const coursesReducer =  coursesSlice.reducer
export default coursesReducer;
