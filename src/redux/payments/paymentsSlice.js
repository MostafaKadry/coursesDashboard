import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addPayment: (state, action) => {
      state.payments.push(action.payload);
    },
    deletePayment: (state, action) => {
      state.payments = state.payments.filter(
        (payment) => payment.transaction_id !== action.payload
      );
    },
  },
});

export const { addPayment, deletePayment } = paymentsSlice.actions;

export default paymentsSlice.reducer;