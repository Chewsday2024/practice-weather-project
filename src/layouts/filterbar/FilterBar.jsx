import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";



import { fetchAllLocations, selectAllLocations } from "./filterbarSlice";





function FilterBar () {
  const dispatch = useDispatch();

  const allLocations = useSelector(selectAllLocations);


  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="row row-cols-2 row-cols-md-6 g-3 py-3">
          {allLocations.map( location => (
            <div className="col" key={location}>
              <Link to={`${location}`} className="btn btn-dark w-100">
                {location}
              </Link>
            </div>
          ))}
        </div>
      </div>
      

      <Outlet />
    </>
  );
};

export default FilterBar;