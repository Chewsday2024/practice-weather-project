import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoactionWeatherReport, selectWeatherReport } from "../layouts/filterbar/filterbarSlice";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";








function Report () {
  const dispatch = useDispatch();

  const weatherReport = useSelector(selectWeatherReport);

  const { location } = useParams();

  console.log(weatherReport);


  useEffect(() => {
    dispatch(fetchLoactionWeatherReport(location));
  }, [dispatch, location]);


  return (
    <div className="container py-5">
      <Swiper
        slidesPerView={3}
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
                weatherIcon = <FontAwesomeIcon icon={faCloudSun} />
                break;
            
              default:
                break;
            }
            

            return (
              <SwiperSlide key={index}>
                <div className="d-flex flex-column justify-content-center align-items-center">
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