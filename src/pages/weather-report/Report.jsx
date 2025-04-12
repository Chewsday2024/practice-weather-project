import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Autoplay } from "swiper/modules";



import { fetchLoactionWeatherReport, selectWeatherReport } from "../../layouts/filterbar/filterbarSlice";
import WeatherIcon from "./WeatherIcon";


import './report.scss';



function Report () {
  const dispatch = useDispatch();

  const weatherReport = useSelector(selectWeatherReport);

  const { location } = useParams();

  const swiperRef = useRef(null);

  


  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(0, 1000);
    }
  }, [location])


  useEffect(() => {
    dispatch(fetchLoactionWeatherReport(location));
  }, [dispatch, location]);

  if (!location) return null;

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold ">{location}</h1>

      <hr className="my-5 " />
      {weatherReport.length > 0 && 
        <Swiper
          slidesPerView={2}
          modules={[Autoplay]}
          autoplay={{delay: 2000}}
          speed={2000}
          loop={true}

          breakpoints={{
            768: {slidesPerView: 3}
          }}

          ref={swiperRef}
        >
          {weatherReport.map( (report, index) => {
            const startTime = new Date(report.StartTime);
            const endTime = new Date(report.EndTime);

            

            const dateOptions = {
              month: '2-digit',
              day: '2-digit'
            };


            const reportDate = startTime.toLocaleDateString('zh-TW', dateOptions);



            const timeOptions = {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZone: 'Asia/Taipei'
            };

            const startHour = startTime.toLocaleTimeString('zh-TW', timeOptions);

            const endHour = endTime.toLocaleTimeString('zh-TW', timeOptions);
            

            return (
              <SwiperSlide key={index}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3 weather-card">
                  <h3>{reportDate}</h3>

                  <WeatherIcon report={report.ElementValue[0].Weather} />
                  
                  <p>{report.ElementValue[0].Weather}</p>

                  <p>{startHour}</p>
                  
                  <span>~</span>

                  <p>{endHour}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      }
    </div>
  );
};

export default Report;