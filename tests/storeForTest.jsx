import { combineReducers, configureStore } from "@reduxjs/toolkit";

import filterbarReducer from '../src/layouts/filterbar/filterbarSlice';


const allReducers = combineReducers({
  filterbar: filterbarReducer
})


export function storeForTest ( preloadedState ) {
  return configureStore({
    reducer: allReducers,
    preloadedState
  })
}