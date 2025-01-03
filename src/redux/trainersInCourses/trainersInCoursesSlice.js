// redux/trainersInCourses/trainersInCoursesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'; 
const initialState = {
  assignments: [], // Stores trainer-course mappings with dates
};

const trainersInCoursesSlice = createSlice({
  name: "trainersInCourses",
  initialState,
  reducers: {
    assignTrainerToCourse: (state, action) => {
      const { trainerId, courseId, startDate, endDate } = action.payload;
      state.assignments.push({
        id: uuidv4(),
        trainerId,
        courseId,
        startDate,
        endDate,
      });
    },
    removeTrainerFromCourse: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment.id !== action.payload
      );
    },
  },
});

export const { assignTrainerToCourse, removeTrainerFromCourse } =
  trainersInCoursesSlice.actions;
  const trainersInCoursesReducer = trainersInCoursesSlice.reducer
export default trainersInCoursesReducer;
