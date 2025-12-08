import { render, screen, within } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { act } from 'react';

jest.mock('axios');

beforeEach(() => {
  // default mock za VSE axios.get klice
  axios.get.mockResolvedValue({ data: [] });
});

test('renders Dodaj Fotografijo button', async () => {
  await act(async () => {
    render(<App />);
  });

  const buttonElement = screen.getByRole('button', { name: /Dodaj Fotografijo/i });
  expect(buttonElement).toBeInTheDocument();
});

test('mock axios call for znamenitosti', async () => {
  // override samo za prvi klic (znamenitosti)
  axios.get.mockResolvedValueOnce({ data: [{ id: 1, ime: 'Test znamenitost' }] });

  await act(async () => {
    render(<App />);
  });

  // poišči UL za znamenitosti
  const list = await screen.findByRole('list', { name: /znamenitosti/i });

  // poišči element znotraj UL
  const item = within(list).getByText(/Test znamenitost/i);

  expect(item).toBeInTheDocument();
});
