'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainers: [
    { id: 1, fullName: 'John Doe', email: 'john@example.com', phone: '01000000000' },
    { id: 2, fullName: 'Jane Smith', email: 'jane@example.com',phone:'01111111111' },
  ],
};

const trainerSlice = createSlice({
  name: 'trainers',
  initialState,
  reducers: {
    addTrainer: (state, action) => {
      state.trainers.push(action.payload);
    },
    updateTrainer: (state, action) => {
      const index = state.trainers.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.trainers[index] = action.payload;
      }
    },
    deleteTrainer: (state, action) => {
      state.trainers = state.trainers.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTrainer, updateTrainer, deleteTrainer } = trainerSlice.actions;
const trainersReducer = trainerSlice.reducer
export default trainersReducer;
