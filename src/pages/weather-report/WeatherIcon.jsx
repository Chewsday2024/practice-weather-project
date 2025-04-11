import React from "react";

function WeatherIcon ({ report }) {
  let weatherIcon;

  switch (report) {
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
  return weatherIcon;
};

export default WeatherIcon;