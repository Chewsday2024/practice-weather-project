import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';


import { renderWithProviders } from '../renderWithProviders';
import FilterBar from '../../src/layouts/filterbar/FilterBar';
import * as filterbarSlice from '../../src/layouts/filterbar/filterbarSlice';





describe('FilterBar', () => {
  it('should not render locations link if fetchAllLocations function is not dispatch', () => {
    renderWithProviders(<FilterBar />);

    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();    
  });


  it('should render locations link if fetchAllLocations function is dispatch', async () => {
    const mockThunkAction = {type: 'filterbar/fetchAllLocations/pending'};

    const mockFetch = vi.spyOn(filterbarSlice, 'fetchAllLocations')
      .mockReturnValue(mockThunkAction);

    vi.spyOn(filterbarSlice, 'selectAllLocations')
      .mockImplementation(state => state.filterbar.allLocations);

      

    const allLocations = {
      filterbar: {
        allLocations: ['Taipei', 'Kaohsiung']
      }
    }

    renderWithProviders(<FilterBar />, { preloadedState: allLocations });



    expect(mockFetch).toHaveBeenCalled();

    allLocations.filterbar.allLocations.forEach( location => {
      const link = screen.getByRole('link', { name: location })

      expect(link).toBeInTheDocument();
    });
  })
})