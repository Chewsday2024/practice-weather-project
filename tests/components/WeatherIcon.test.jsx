import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";


import WeatherIcon from "../../src/pages/weather-report/WeatherIcon";




describe('WeatherIcon', () => {
  it('should not has icon when recive no report', () => {
    const { container } = render(<WeatherIcon report={{}} />)

    expect(container).toBeEmptyDOMElement();
  })

  it('should has icon when recive report', () => {
    const Weather = '多雲';

    const { container } = render(<WeatherIcon report={Weather} />)

    const icon = container.querySelector('.bi-clouds-fill')

    expect(icon).toBeTruthy();
  })
})