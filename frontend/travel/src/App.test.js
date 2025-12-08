import { render, screen, within, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-url');
global.open = jest.fn();

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
  global.URL.createObjectURL.mockClear();
  global.open.mockClear();
});

test('renders Dodaj Fotografijo button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /Dodaj Fotografijo/i })).toBeInTheDocument();
});

test('mock axios call for znamenitosti', async () => {
  axios.get.mockResolvedValueOnce({ data: [{ id: 1, ime: 'Test znamenitost' }] });

  render(<App />);

  // prvi UL pod naslovom Znamenitosti
  const list = await waitFor(() => screen.getAllByRole('list')[0]);

  const item = within(list).getByText(/Test znamenitost/i);
  expect(item).toBeInTheDocument();
});
