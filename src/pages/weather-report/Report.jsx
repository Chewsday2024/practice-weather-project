import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";



import { fetchLoactionWeatherReport, selectWeatherReport } from "../../layouts/filterbar/filterbarSlice";


import './report.scss';
import { Autoplay } from "swiper/modules";



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


  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold ">{location}</h1>
      <hr className="my-5 " />
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
        {weatherReport.length > 0 && 
          weatherReport.map( (report, index) => {
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



            let weatherIcon;

            switch (report.ElementValue[0].Weather) {
              case '晴時多雲':
              case '多雲時晴':
                weatherIcon = <i className="bi bi-cloud-sun-fill" />
                break;

              
              case '陰時多雲':
              case '多雲時陰':
              case '多雲':
              case '陰天':
                weatherIcon = <i className="bi bi-clouds-fill" />
                break;
                
                
              case '多雲時陰短暫陣雨或雷雨':
              case '陰時多雲短暫陣雨或雷雨':
              case '多雲短暫陣雨或雷雨':
                weatherIcon = <i className="bi bi-cloud-lightning-rain-fill" />
                break;
                
                
              case '陰短暫陣雨或雷雨':
              case '多雲時陰短暫雨':
              case '多雲短暫雨':
              case '陰時多雲短暫雨':
                weatherIcon = <i className="bi bi-cloud-drizzle-fill" />
                break;

            }
            

            return (
              <SwiperSlide key={index}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3 weather-card">
                  <h3>{reportDate}</h3>

                  <i>{weatherIcon}</i>
                  <p>{report.ElementValue[0].Weather}</p>

                  <p>{startHour}</p>
                  <span>~</span>
                  <p>{endHour}</p>
                  
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  );
};

export default Report;