import { createHashRouter } from "react-router-dom";


import App from "./App";
import Index from "./pages/Index";
import FilterBar from "./layouts/filterbar/FilterBar";
import Report from "./pages/weather-report/Report";



const router = createHashRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'weather',
        element: <FilterBar />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: ':location',
            element: <Report />
          }
        ]
      },
    ]
  }
]);



export default router;