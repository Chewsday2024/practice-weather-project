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

      <div className="vh-100" style={{backgroundColor: 'rgb(32, 0, 77)'}}>
        <Outlet />
      </div>

      <Footer />
    </>
  )
}

export default App
