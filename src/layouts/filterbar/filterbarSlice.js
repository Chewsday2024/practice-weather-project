import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_CODE = import.meta.env.VITE_AUTH_CODE;
 
 
 
const initialState = { 
  allLocations: [],
  weatherReport: {},
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
      .addCase(fetchAllLocations.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.allLocations = action.payload.map( item => item.LocationName);
      })
      .addCase(fetchAllLocations.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(fetchLoactionWeatherReport.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLoactionWeatherReport.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.weatherReport = action.payload;
      })
      .addCase(fetchLoactionWeatherReport.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const fetchAllLocations = createAsyncThunk('filterbar/fetchAllLocation', async () => {
  const res = await axios.get(`${BASE_URL}?Authorization=${AUTH_CODE}&ElementName=天氣現象`);

  return res.data.records.Locations[0].Location;
});



export const fetchLoactionWeatherReport = createAsyncThunk('filterbar/fetchLocationWeatherReport', async ( location = null ) => {
  const res = await axios.get(`${BASE_URL}?Authorization=${AUTH_CODE}&ElementName=天氣現象&LocationName=${location}`);

  return res.data.records.Locations[0].Location[0].WeatherElement[0].Time;
})




export const selectAllLocations = state => state.filterbar.allLocations;

export const selectWeatherReport = state => state.filterbar.weatherReport;



export default filterbarSlice.reducer;