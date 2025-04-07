import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_CODE = import.meta.env.VITE_AUTH_CODE;
 
 
 
const initialState = { 
  allLocations: [],
  status: 'idle',
  error: null
};
 
 
 
const filterbarSlice = createSlice({
  name: 'filterbar',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(fetchAllLocation.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllLocation.fulfilled, (state, action) => {
        state.status = 'succeed';

        console.log(action.payload.map( item => item.LocationName));

        state.allLocations = action.payload.map( item => item.LocationName);
      })
      .addCase(fetchAllLocation.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const fetchAllLocation = createAsyncThunk('filterbar/fetchAllLocation', async ( location = '') => {
  const res = await axios.get(`${BASE_URL}?Authorization=${AUTH_CODE}&ElementName=天氣現象&LocationName=${location}`);

  return res.data.records.Locations[0].Location;
});




export const selectAllLocations = state => state.filterbar.allLocations;



export default filterbarSlice.reducer;