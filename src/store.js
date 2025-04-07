import { configureStore } from "@reduxjs/toolkit";


import filterbarReducer from './layouts/filterbar/filterbarSlice';



const store = configureStore({
  reducer: {
    filterbar: filterbarReducer,
  }
});



export default store;