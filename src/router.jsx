import { createHashRouter } from "react-router-dom";


import App from "./App";
import Index from "./pages/index";
import FilterBar from "./layouts/filterbar/FilterBar";



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
            element: <Index />
          }
        ]
      },
    ]
  }
]);



export default router;