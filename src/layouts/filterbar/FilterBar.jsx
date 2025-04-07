import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";



import { fetchAllLocation, selectAllLocations } from "./filterbarSlice";





function FilterBar () {
  const dispatch = useDispatch();

  const allLocations = useSelector(selectAllLocations);

  console.log(allLocations);


  useEffect(() => {
    dispatch(fetchAllLocation());
  }, [dispatch]);

  return (
    <>
      <div className="bg-light">
        <div className="container ">
          <div className="row row-cols-6">
            {allLocations.map( location => (
              <div className="col" key={location}>
                <button className="btn w-100">
                  {location}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default FilterBar;