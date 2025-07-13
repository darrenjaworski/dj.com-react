import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from './App'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('App', () => {
  beforeEach(() => {
    // Reset document attributes before each test
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders the home page by default', () => {
    render(<App />)
    
    expect(screen.getByRole('heading', { name: 'home' })).toBeInTheDocument()
    expect(screen.getByText(/Welcome. This is my home on the web/)).toBeInTheDocument()
    expect(screen.getByText(/darrenjaworski@gmail.com/)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<App />)
    
    const homeLink = screen.getByRole('link', { name: 'home' })
    const journalismLink = screen.getByRole('link', { name: 'journalism' })
    
    expect(homeLink).toBeInTheDocument()
    expect(journalismLink).toBeInTheDocument()
  })

  it('navigates to journalism page when link is clicked', () => {
    render(<App />)
    
    const journalismLink = screen.getByRole('link', { name: 'journalism' })
    fireEvent.click(journalismLink)
    
    expect(screen.getByRole('heading', { name: 'journalism' })).toBeInTheDocument()
    expect(screen.getByText('oklahoma watch')).toBeInTheDocument()
  })

  it('navigates back to home page when home link is clicked', () => {
    render(<App />)
    
    // Go to journalism page first
    const journalismLink = screen.getByRole('link', { name: 'journalism' })
    fireEvent.click(journalismLink)
    
    // Then go back to home
    const homeLink = screen.getByRole('link', { name: 'home' })
    fireEvent.click(homeLink)
    
    expect(screen.getByRole('heading', { name: 'home' })).toBeInTheDocument()
    expect(screen.getByText(/Welcome. This is my home on the web/)).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<App />)
    
    const themeButton = screen.getByRole('button', { name: 'Toggle theme' })
    expect(themeButton).toBeInTheDocument()
  })

  it('toggles theme when button is clicked', () => {
    render(<App />)
    
    const themeButton = screen.getByRole('button', { name: 'Toggle theme' })
    
    // Initial state should have no data-theme attribute
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
    
    // Click to toggle theme
    fireEvent.click(themeButton)
    
    // Should now have a data-theme attribute
    expect(document.documentElement.getAttribute('data-theme')).toBeTruthy()
  })

  it('renders social media links on home page', () => {
    render(<App />)
    
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Github' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Strava' })).toBeInTheDocument()
  })

  it('renders journalism sections and articles', () => {
    render(<App />)
    
    // Navigate to journalism page
    const journalismLink = screen.getByRole('link', { name: 'journalism' })
    fireEvent.click(journalismLink)
    
    // Check for section headings
    expect(screen.getByText('oklahoma watch')).toBeInTheDocument()
    expect(screen.getByText('routes')).toBeInTheDocument()
    expect(screen.getByText("journalism master's research")).toBeInTheDocument()
    
    // Check for some article links
    expect(screen.getByRole('link', { name: 'Oklahoma Correctional Facilities' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Online Science Communication and Public Science Literacy' })).toBeInTheDocument()
  })

  it('renders email link with correct href', () => {
    render(<App />)
    
    const emailLink = screen.getByRole('link', { name: 'darrenjaworski@gmail.com' })
    expect(emailLink).toHaveAttribute('href', 'mailto:darrenjaworski@gmail.com')
  })

  it('renders resume link', () => {
    render(<App />)
    
    const resumeLink = screen.getByRole('link', { name: 'résumé' })
    expect(resumeLink).toBeInTheDocument()
    expect(resumeLink).toHaveAttribute('href', 'https://docs.google.com/document/d/19L1W3PXUyboaUWB0shDedjKwzRPsqiBw0VxsAir45EU/edit?usp=sharing')
  })
})