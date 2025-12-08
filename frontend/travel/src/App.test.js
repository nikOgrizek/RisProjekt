import { render, screen, within, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { act } from 'react';

jest.mock('axios');

// ✅ Mock window APIs
global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-url');
global.open = jest.fn();

// ✅ Suppress React Router Future Flag warnings
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn((...args) => {
    if (
      args[0]?.includes?.('Future Flag') ||
      args[0]?.includes?.('v7') ||
      args.join(' ').includes('Future Flag')
    ) {
      return;
    }
    originalWarn(...args);
  });
});

afterAll(() => {
  console.warn = originalWarn;
});

beforeEach(() => {
  // default mock za VSE axios.get klice
  axios.get.mockResolvedValue({ data: [] });
  global.URL.createObjectURL.mockClear();
  global.open.mockClear();
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
  const list = await waitFor(() =>
    screen.getByRole('list', { name: /znamenitosti/i })
  );

  // poišči element znotraj UL
  const item = within(list).getByText(/Test znamenitost/i);

  expect(item).toBeInTheDocument();
});
