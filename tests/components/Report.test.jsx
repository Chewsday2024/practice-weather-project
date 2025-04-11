import React from "react";
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import * as reactRouterDom from 'react-router-dom';


import { renderWithProviders } from "../renderWithProviders";
import Report from "../../src/pages/weather-report/Report";



vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(), 
  };
})

describe('Report', () => {
  it('should not render <h1> if Report recived no location param', () => {
    
    reactRouterDom.useParams.mockReturnValue({});

    renderWithProviders(<Report />);

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });
  

  it('should render <h1> if Report recived location param', () => {
    
    reactRouterDom.useParams.mockReturnValue({ location: 'Taipei'});

    renderWithProviders(<Report />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Taipei');
  })


  it('should not render swiper-slide if Report recived no weatherReport data', () => {
    const { container } = renderWithProviders(<Report />);

    const swiperSlide = container.querySelector('.swiper-slide')

    expect(swiperSlide).toBeFalsy();
  });


  it('should render swiper-slide if Report recived weatherReport data', () => {
    const fakeState = {
      filterbar: {
        weatherReport: [
          {
            StartTime: new Date().toISOString(),
            EndTime: new Date().toISOString(),
            ElementValue: [{ Weather: '晴時多雲' }]
          },
          {
            StartTime: new Date().toISOString(),
            EndTime: new Date().toISOString(),
            ElementValue: [{ Weather: '陰天' }]
          }
        ]
      }
    };
    
    renderWithProviders(<Report />, { preloadedState: fakeState });

    expect(screen.getByText('晴時多雲')).toBeInTheDocument();
    expect(screen.getByText('陰天')).toBeInTheDocument();
  })
})