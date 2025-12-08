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
    global.fetch = jest.fn();
  });

  //
  // ✅ 1. Avtentikacija – popravljeno zaradi dvojnih labelov
  //
test('Avtentikacija prikaže polja za registracijo in prijavo', async () => {
  global.fetch
    .mockResolvedValueOnce({ json: async () => ({ message: 'Registracija uspešna' }) })
    .mockResolvedValueOnce({ json: async () => ({ message: 'Prijava uspešna', user_id: 1 }) });

  render(<UserRegistrationLogin />);

  const usernameInputs = screen.getAllByLabelText(/Uporabniško ime/i);
  expect(usernameInputs.length).toBe(2);

  const passwordInputs = screen.getAllByLabelText(/Geslo/i);
  expect(passwordInputs.length).toBe(2);

  fireEvent.change(usernameInputs[0], { target: { value: 'user1' } });
  fireEvent.change(passwordInputs[0], { target: { value: 'pw' } });
  fireEvent.click(screen.getByRole('button', { name: /Registriraj se/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  fireEvent.change(usernameInputs[1], { target: { value: 'user1' } });
  fireEvent.change(passwordInputs[1], { target: { value: 'pw' } });
  fireEvent.click(screen.getByRole('button', { name: /Prijava/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
});

  //
  // ✅ 2. Fotografije – uporabi getByRole za gumb
  //
  test('Fotografije form vsebuje file input in pošlje axios POST', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'ok' } });

    render(<FotografijaForm />);

    const fileInput = screen.getByLabelText(/Izberi sliko/i);
    expect(fileInput).toBeInTheDocument();

    const file = new File(['abc'], 'photo.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.change(screen.getByLabelText(/Naslov/i), { target: { value: 'Naslov' } });
    fireEvent.change(screen.getByLabelText(/Opis/i), { target: { value: 'Opis' } });
    fireEvent.change(screen.getByLabelText(/ID Potovanja/i), { target: { value: '3' } });

    fireEvent.click(screen.getByRole('button', { name: /Dodaj Fotografijo/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  //
  // ✅ 3. Navbar – OK
  //
  test('Navbar prikaže Home link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  //
  // ✅ 4. PotComponent – OK
  //
  test('PotComponent doda novo pot in jo prikaže', async () => {
    const newPot = { id: 123, ime: 'TestPot', opis: 'Opis', razdalja: 10, potovanje_id: 5 };
    axios.post.mockResolvedValueOnce({ data: newPot });

    render(<PotComponent />);

    fireEvent.change(screen.getByPlaceholderText(/Ime poti/i), { target: { value: 'TestPot' } });
    fireEvent.change(screen.getByPlaceholderText(/Opis poti/i), { target: { value: 'Opis' } });
    fireEvent.change(screen.getByPlaceholderText(/Razdalja poti/i), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText(/Vnesite potovanje ID/i), { target: { value: '5' } });

    fireEvent.click(screen.getByRole('button', { name: /Dodaj pot/i }));

    expect(await screen.findByText(/TestPot/i)).toBeInTheDocument();
  });

  //
  // ✅ 5. TravelList – PDF/photo test odstranjeno (tvoja želja)
  //
  test('TravelList prikaže seznam potovanj', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, ime: 'Potovanje A', opis: 'Opis A', datum_zacetka: null, datum_konca: null, drzava: 'SI' }
      ]
    });

    render(<TravelList />);

    expect(await screen.findByText(/Seznam Potovanj/i)).toBeInTheDocument();
    expect(await screen.findByText(/Potovanje A/i)).toBeInTheDocument();
  });
});
