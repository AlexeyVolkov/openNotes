import React from 'react'
import { render, screen } from '@testing-library/react'
import Navigation from './Navigation'

it('renders top navigation links', () => {
  render(<Navigation text="Test text to share" />)

  const copyLink = screen.getByText(/copy text/i)
  const githubLink = screen.getByText(/github page/i)

  expect(copyLink).toBeInTheDocument()
  expect(githubLink).toBeInTheDocument()
})
