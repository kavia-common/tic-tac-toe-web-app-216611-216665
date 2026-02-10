import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.jsx';

test('renders game title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /tic tac toe/i })
  ).toBeInTheDocument();
});
