import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { noteName } from '../../utils/constants'
import Textarea from './Textarea'

test('renders textarea', () => {
  render(<Textarea />)
  const textareaElement = screen.getByRole('textbox')
  expect(textareaElement).toBeInTheDocument()
})

test('saves text to localStorage', async () => {
  const str = 'Hello, my name is Mike and have Nike.'

  render(<Textarea />)
  const textareaElement = screen.getByRole('textbox')
  userEvent.type(textareaElement, str)

  await waitFor(() => {
    expect(localStorage.getItem(noteName)).toEqual(expect.stringContaining(str))
  })
})

test('saves text to localStorage and reads from it', async () => {
  const str = 'Hello, my name is Mike and have Nike.'

  const { rerender } = render(<Textarea />)
  const textareaElement = screen.getByRole('textbox')
  userEvent.type(textareaElement, str)

  await waitFor(() => {
    expect(localStorage.getItem(noteName)).toEqual(expect.stringContaining(str))
  })

  rerender(<Textarea />)
  expect(screen.getByRole('textbox').textContent).toEqual(
    expect.stringContaining(str)
  )
})
