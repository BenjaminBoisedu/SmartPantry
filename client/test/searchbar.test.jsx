import { render, screen } from '@testing-library/react'
import MyPantry from '../src/Pages/Mypantry/mypantry.jsx'
import { expect, expectTypeOf } from 'vitest'

describe('SearchBar', () => {
  it('checks if searchbar exists', () => {
    render(<MyPantry />)
    expectTypeOf(MyPantry).toBeFunction();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    //screen.debug(); // prints out the jsx in the App component unto the command line
  })
})