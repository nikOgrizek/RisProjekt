import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
});

test('App prikaže gumb Dodaj Fotografijo', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /Dodaj Fotografijo/i })).toBeInTheDocument();
});

test('App prikaže naslov Znamenitosti (čeprav je seznam prazen)', () => {
  render(<App />);
  expect(screen.getByText(/Znamenitosti/i)).toBeInTheDocument();
});
