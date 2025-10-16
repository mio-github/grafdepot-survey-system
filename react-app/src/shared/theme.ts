export const theme = {
  colors: {
    primary: {
      main: '#005BAC',
      light: '#0070D6',
      dark: '#003D73',
    },
    secondary: {
      main: '#FFC400',
      dark: '#E6B000',
    },
    status: {
      success: '#4CAF50',
      error: '#F44336',
      warning: '#FF9800',
      info: '#2196F3',
    },
    neutral: {
      white: '#FFFFFF',
      bg: '#F5F5F5',
      bgDark: '#E0E0E0',
      text: '#212121',
      textSecondary: '#757575',
      textLight: '#BDBDBD',
      border: '#E0E0E0',
    },
    phase: {
      phase1: '#005BAC',
      phase2: '#FF9800',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 2px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.12)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  transitions: {
    fast: '0.2s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  typography: {
    mobile: {
      h1: { size: '24px', weight: 700 },
      h2: { size: '20px', weight: 700 },
      h3: { size: '18px', weight: 600 },
      body: { size: '16px', weight: 400 },
      caption: { size: '14px', weight: 400 },
      small: { size: '12px', weight: 400 },
      button: { size: '16px', weight: 600 },
    },
    web: {
      h1: { size: '32px', weight: 700 },
      h2: { size: '24px', weight: 700 },
      h3: { size: '20px', weight: 600 },
      body: { size: '16px', weight: 400 },
      caption: { size: '14px', weight: 400 },
      small: { size: '12px', weight: 400 },
      button: { size: '16px', weight: 600 },
    },
  },
  breakpoints: {
    mobile: '600px',
    tablet: '960px',
    desktop: '1280px',
  },
} as const

export type Theme = typeof theme
