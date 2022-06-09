import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShareText from './ShareText'

it('copies text into clipboard', () => {
  render(<ShareText text="Test text to share" />)

  const copyButton = screen.getByRole('button', { name: /copy text/i })
  Object.assign(window.navigator, {
    clipboard: {
      writeText: jest.fn().mockImplementation(() => Promise.resolve())
    }
  })

  userEvent.click(copyButton)
  expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
    'Test text to share'
  )
})
