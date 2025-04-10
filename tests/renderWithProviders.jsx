import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";


import { storeForTest } from "./storeForTest";
import { MemoryRouter } from "react-router-dom";




export function renderWithProviders ( 
  testComponent,
  {
    preloadedState = {},
    store = storeForTest( preloadedState ),
    ...renderOptions
  } = {}
) {
  
  function Wrapper ({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </Provider>
    )
  }


  return {
    store,
    ...render( testComponent, { wrapper: Wrapper, ...renderOptions })
  }
}