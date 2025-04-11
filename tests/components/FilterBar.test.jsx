import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';


import { renderWithProviders } from '../renderWithProviders';
import FilterBar from '../../src/layouts/filterbar/FilterBar';
import * as filterbarSlice from '../../src/layouts/filterbar/filterbarSlice';





describe('FilterBar', () => {
  it('should not render locations link if FilterBar recived no locations data', () => {
    renderWithProviders(<FilterBar />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });


  it('should render locations link if FilterBar recived locations data', () => {
    const allLocations = {
      filterbar: {
        allLocations: ['Taipei', 'Kaohsiung']
      }
    }

    renderWithProviders(<FilterBar />, { preloadedState: allLocations });

    
    allLocations.filterbar.allLocations.forEach( location => {
      const link = screen.getByRole('link', { name: location })

      expect(link).toHaveTextContent(location)
      expect(link).toHaveAttribute('href', `/${location}`)
    });
    
    expect(screen.getByText('Taipei')).toBeInTheDocument();
    expect(screen.getByText('Kaohsiung')).toBeInTheDocument();
  })


  it('should dispatch function fetchAllLocations when mount', () => {
    const mockThunkAction = {type: 'filterbar/fetchAllLocations/pending'};
    
    const mockFetch = vi.spyOn(filterbarSlice, 'fetchAllLocations')
    .mockReturnValue(mockThunkAction);
    
    
    renderWithProviders(<FilterBar />);

    expect(mockFetch).toHaveBeenCalled();
  })
})