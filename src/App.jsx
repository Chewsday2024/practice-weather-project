import { Outlet, useNavigate } from "react-router-dom"


import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import { useEffect } from "react";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('weather')
  }, [navigate]);
  return (
    <>
      <Header />

      <div className="bg-light">
        <Outlet />
      </div>

      <Footer />
    </>
  )
}

export default App
