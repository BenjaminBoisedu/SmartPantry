import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import axios from 'axios';
import { act } from 'react';
vi.mock('axios', () =>{
  return {
    default: {
      post: vi.fn(),
      get: vi.fn()
    }
  }
})

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
})

beforeEach(() =>{
  axios.get.mockReset()
  axios.post.mockReset()
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
})