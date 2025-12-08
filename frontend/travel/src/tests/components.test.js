import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

// Components
import UserRegistrationLogin from '../components/Avtentikacija/Auth';
import FotografijaForm from '../components/Fotografije/Fotografije';
import Navbar from '../components/Navbar/Navbar';
import PotComponent from '../components/Pot/dodajPot';
import TravelList from '../components/Potovanja/vrniPotovanja';

describe('Frontend component smoke tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Avtentikacija renders registration and login sections and handles fetch', async () => {
    // Mock global.fetch responses
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: async () => ({ message: 'Registracija uspešna' }) })
      .mockResolvedValueOnce({ json: async () => ({ message: 'Prijava uspešna', user_id: 1 }) });

    render(<UserRegistrationLogin />);

    // Check presence of registration fields
    expect(screen.getByLabelText(/Uporabniško ime:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Geslo:/i)).toBeInTheDocument();

    // Fill registration
    fireEvent.change(screen.getByLabelText('Uporabniško ime:'), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText('Geslo:'), { target: { value: 'pw' } });
    fireEvent.click(screen.getByText(/Registriraj se/i));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText(/Registracija uspešna/i)).toBeInTheDocument();

    // Fill login
    fireEvent.change(screen.getByLabelText('Uporabniško ime:'), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText('Geslo:'), { target: { value: 'pw' } });
    fireEvent.click(screen.getByText(/Prijava/i));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(screen.getByText(/Prijava uspešna/i)).toBeInTheDocument();
  });

  test('Fotografije form has file input and submits using axios', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'ok' } });

    render(<FotografijaForm />);

    const fileInput = screen.getByLabelText(/Izberi sliko/i);
    expect(fileInput).toBeInTheDocument();

    // Simulate selecting a file
    const file = new File(['abc'], 'photo.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Fill other fields
    fireEvent.change(screen.getByLabelText(/Naslov:/i), { target: { value: 'Naslov' } });
    fireEvent.change(screen.getByLabelText(/Opis:/i), { target: { value: 'Opis' } });
    fireEvent.change(screen.getByLabelText(/ID Potovanja:/i), { target: { value: '3' } });

    fireEvent.click(screen.getByText(/Dodaj Fotografijo/i));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  test('Navbar renders Home link (wrapped in router)', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('Pot component adds new pot via axios.post and shows it in the list', async () => {
    const newPot = { id: 123, ime: 'TestPot', opis: 'Opis', razdalja: 10, potovanje_id: 5 };
    axios.post.mockResolvedValueOnce({ data: newPot });

    render(<PotComponent />);

    // Fill the form
    fireEvent.change(screen.getByPlaceholderText(/Ime poti/i), { target: { value: 'TestPot' } });
    fireEvent.change(screen.getByPlaceholderText(/Opis poti/i), { target: { value: 'Opis' } });
    fireEvent.change(screen.getByPlaceholderText(/Razdalja poti/i), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText(/Vnesite potovanje ID/i), { target: { value: '5' } });

    fireEvent.click(screen.getByText(/Dodaj pot/i));

    // After axios resolves, the new pot should be rendered
    const added = await screen.findByText(/TestPot/i);
    expect(added).toBeInTheDocument();
  });

  test('vrniPotovanja fetches and displays travel items and handles PDF/photo actions', async () => {
    // Mock initial travel list
    const travelData = [
      { id: 1, ime: 'Potovanje A', opis: 'Opis A', datum_zacetka: null, datum_konca: null, drzava: 'SI' },
    ];
    axios.get.mockImplementation((url) => {
      if (url.includes('/potovanje/vrniPotovanja')) {
        return Promise.resolve({ data: travelData });
      }
      // For PDF and photo calls return ArrayBuffer-like data
      return Promise.resolve({ data: new ArrayBuffer(1) });
    });

    // Mock window.open
    window.open = jest.fn();

    render(<TravelList />);

    expect(await screen.findByText(/Seznam Potovanj/i)).toBeInTheDocument();
    expect(await screen.findByText(/Potovanje A/i)).toBeInTheDocument();

    // Click generate PDF button
    fireEvent.click(screen.getByText(/Generiraj PDF/i));
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    expect(window.open).toHaveBeenCalled();

    // Click get photo (button text 'Pridobi fotografijo')
    fireEvent.click(screen.getByText(/Pridobi fotografijo/i));
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    expect(window.open).toHaveBeenCalled();
  });
});
