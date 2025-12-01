import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// avtomatsko mockaj axios
jest.mock('axios');

test('renders Dodaj Fotografijo button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /Dodaj Fotografijo/i });
  expect(buttonElement).toBeInTheDocument();
});

test('mock axios call for znamenitosti', async () => {
  // pripravi mock odgovor
  axios.get.mockResolvedValue({ data: [{ id: 1, ime: 'Test znamenitost' }] });

  render(<App />);

  // počakaj, da se mockani podatki prikažejo
  const znamenitostElement = await screen.findByText(/Test znamenitost/i);
  expect(znamenitostElement).toBeInTheDocument();
});
