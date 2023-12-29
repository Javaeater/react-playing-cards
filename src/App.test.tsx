import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

test('Test title and card count render', () => {
  render(<App />);
  const title = screen.getByTestId('title');
  const cardCount = screen.getByTestId('cardCount');
  expect(title).toHaveTextContent('Deal a Hand');
  expect(cardCount).toHaveTextContent('52 cards remaining');
});

test('Test deck count updates after hand is delt', () => {
  render(<App />);
  const cardCount = screen.getByTestId('cardCount');
  const dealButton = screen.getByTestId('dealButton');

  userEvent.click(dealButton);
  expect(cardCount).toHaveTextContent('47 cards remaining');
});

test('Test deck resets after reset button is pressed', () => {
  render(<App />);
  const cardCount = screen.getByTestId('cardCount');
  const dealButton = screen.getByTestId('dealButton');
  const resetButton = screen.getByTestId('resetButton');

  userEvent.click(dealButton);
  expect(cardCount).toHaveTextContent('47 cards remaining');
  userEvent.click(resetButton);
  expect(cardCount).toHaveTextContent('52 cards remaining');
});
