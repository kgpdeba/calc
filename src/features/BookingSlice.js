import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postData = createAsyncThunk(
  "BookingSlice/postData",
  async (newData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/patients", newData);
      console.log("res", response);
      
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const BookingSlice = createSlice({
  name: "BookingSlice",
  initialState: {
    date: '',
    time:'12:00',
    docId:"",
    loading: false,
    error: null,
  },

  reducers: {
   setDate:(state,action)=>{
    state.date= action.payload
   },
   setTime:(state,action)=>{
    state.time= action.payload
   },
   setDocId:(state,action)=>{
    state.docId= action.payload
   }
  },

  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTime, setDate, setDocId} = BookingSlice.actions;

export default BookingSlice.reducer;