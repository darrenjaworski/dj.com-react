import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the app with initial count of 0', () => {
    render(<App />)
    
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
    expect(screen.getByText('count is 0')).toBeInTheDocument()
  })

  it('increments count when button is clicked', () => {
    render(<App />)
    
    const button = screen.getByRole('button', { name: /count is/i })
    
    fireEvent.click(button)
    expect(screen.getByText('count is 1')).toBeInTheDocument()
    
    fireEvent.click(button)
    expect(screen.getByText('count is 2')).toBeInTheDocument()
  })

  it('renders both logo links', () => {
    render(<App />)
    
    const viteLink = screen.getByRole('link', { name: /vite logo/i })
    const reactLink = screen.getByRole('link', { name: /react logo/i })
    
    expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
  })
})