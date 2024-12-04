import { fireEvent, render, screen } from '@testing-library/react'
import MyPantry from '../src/Pages/Mypantry/mypantry.jsx'
import { expect, expectTypeOf, vi } from 'vitest'
import { act } from 'react'
import axios from 'axios'


describe('SearchBar', () => {
  it('checks if searchbar exists', () => {
    render(<MyPantry />)
    expectTypeOf(MyPantry).toBeFunction();
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    //screen.debug(); // prints out the jsx in the App component unto the command line
  })
})

describe('SearchBar', () => {
  it('when searching with empty ingredients, no calls to axios', () => {
    const ingredientsMock = [{}]
    
    const {container} = render(<MyPantry />)
    fireEvent.click(screen.getByText('Search'))
    expect(axios.get).not.toHaveBeenCalled() // not called cause nothing in ingredients
    
    //screen.debug(); // prints out the jsx in the App component unto the command line
  })
})
/*
describe('SearchBar', () => {
  it('when searching ingredients, calls axios', () => {
    const ingredientsMock = [
      {
        id: 0,
        Name: "Soup",
        Quantity: 7,
        Unit: "gramme"
      },
      {
        id: 1,
        Name: "Soup2",
        Quantity: 2,
        Unit: "L"
      }
    ]

    axios.post.mockResolvedValueOnce({
      data: ingredientsMock,
    });
    const {container} = render(<MyPantry />)
    screen.debug(); // prints out the jsx in the App component unto the command line
    fireEvent.click(screen.getByText('Search'))
    expect(axios.get).toHaveBeenCalled() // not called cause still nothing in ingredients??
    
  })
})*/