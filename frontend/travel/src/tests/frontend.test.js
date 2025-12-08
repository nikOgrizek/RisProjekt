import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

import PotovanjaDodaj from "../components/Potovanja/dodajPotovanja";
import PotovanjaVrni from "../components/Potovanja/vrniPotovanja";
import Znamenitosti from "../components/Znamenitosti/Znamenitosti";
import Fotografija from "../components/Fotografije/Fotografije";
import Avtentikacija from "../components/Avtentikacija/Auth";
import PotIzbrisi from "../components/Pot/izbrisiPot";
import PotDodaj from "../components/Pot/dodajPot";
import VrniPoti from "../components/Pot/vrniPoti";
import PotUredi from "../components/Pot/urediPot";

import axios from "axios";

// ✅ Globalni mock za axios
jest.mock("axios");

// ✅ Mock window.URL.createObjectURL in window.open
global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/mock-url");
global.open = jest.fn();

// ✅ Suppress React Router future flag warnings
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn((...args) => {
    if (
      args[0]?.includes?.("Future Flag") ||
      args[0]?.includes?.("v7") ||
      args.join(" ").includes("Future Flag")
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
  jest.clearAllMocks();
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: {} });
  axios.delete.mockResolvedValue({ data: {} });
  axios.put.mockResolvedValue({ data: {} });
  global.fetch = jest.fn();
  global.URL.createObjectURL.mockClear();
  global.open.mockClear();
});

//
// ✅ 1. Test: App sanity check
//
test("App se rendera brez napak", async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByText(/Pošlji E-pošto/i)).toBeInTheDocument();
});

//
// ✅ 2. Test: App vsebuje gumb Dodaj Fotografijo
//
test("App prikaže gumb Dodaj Fotografijo", async () => {
  await act(async () => {
    render(<App />);
  });
  const button = screen.getByRole("button", { name: /Dodaj Fotografijo/i });
  expect(button).toBeInTheDocument();
});

//
// ✅ 3. Test: Pošlji E-pošto sproži fetch
//
test("klik na Pošlji E-pošto sproži fetch", async () => {
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({ ok: true }),
  });

  await act(async () => {
    render(<App />);
  });

  const sendButton = screen.getByRole("button", { name: /Pošlji E-pošto/i });
  
  await act(async () => {
    fireEvent.click(sendButton);
  });

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
});

//
// ✅ 4. Znamenitosti
//
test("Znamenitosti prikaže mockano znamenitost", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Test znamenitost" }],
  });

  await act(async () => {
    render(<Znamenitosti />);
  });

  await waitFor(() =>
    expect(screen.getByText(/Test znamenitost/i)).toBeInTheDocument()
  );
});

//
// ✅ 5. PotovanjaDodaj
//
test("PotovanjaDodaj vsebuje gumb Dodaj potovanje", () => {
  render(<PotovanjaDodaj />);
  expect(screen.getByRole("button", { name: /Dodaj potovanje/i })).toBeInTheDocument();
});

test("PotovanjaDodaj omogoča vnos podatkov", () => {
  render(<PotovanjaDodaj />);

  const inputs = screen.getAllByPlaceholderText(/Besedilo/i);

  fireEvent.change(inputs[0], { target: { value: "Test potovanje" } });
  fireEvent.change(inputs[1], { target: { value: "Opis test" } });

  expect(inputs[0].value).toBe("Test potovanje");
  expect(inputs[1].value).toBe("Opis test");
});

//
// ✅ 6. Avtentikacija (fix: use getAllByLabelText for duplicate labels)
//
test("Avtentikacija vsebuje polja za prijavo in registracijo", () => {
  render(<Avtentikacija />);
  // Two labels for "Uporabniško ime" (registration + login), use getAll
  const usernameLabels = screen.getAllByLabelText(/Uporabniško ime/i);
  expect(usernameLabels.length).toBeGreaterThanOrEqual(2);
  
  const passwordLabels = screen.getAllByLabelText(/Geslo/i);
  expect(passwordLabels.length).toBeGreaterThanOrEqual(2);
});

//
// ✅ 7. Fotografija (fix: use getByRole for button, not text)
//
test("Fotografija vsebuje input za sliko in gumb", () => {
  render(<Fotografija />);
  expect(screen.getByLabelText(/Izberi sliko/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Dodaj Fotografijo/i })).toBeInTheDocument();
});

//
// ✅ 8. PotIzbrisi
//
test("PotIzbrisi vsebuje select element", () => {
  render(<PotIzbrisi />);
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

//
// ✅ 9. PotDodaj
//
test("PotDodaj omogoča vnos razdalje", () => {
  render(<PotDodaj />);
  const input = screen.getByPlaceholderText(/Razdalja poti/i);
  fireEvent.change(input, { target: { value: "42" } });
  expect(input.value).toBe("42");
});

//
// ✅ 10. PotovanjaVrni (fix: wrap in act, mock window APIs)
//
test("PotovanjaVrni prikaže mockano potovanje in generira PDF", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Test potovanje", opis: "Opis", datum_zacetka: null, datum_konca: null, drzava: "SI" }],
  });
  // Mock PDF generation response
  axios.get.mockResolvedValueOnce({
    data: new ArrayBuffer(1),
  });

  await act(async () => {
    render(<PotovanjaVrni />);
  });

  await waitFor(() =>
    expect(screen.getByText(/Test potovanje/i)).toBeInTheDocument()
  );

  // Click "Generiraj PDF" button
  const pdfButton = screen.getByText(/Generiraj PDF/i);
  
  await act(async () => {
    fireEvent.click(pdfButton);
  });

  await waitFor(() => expect(global.URL.createObjectURL).toHaveBeenCalled());
  expect(global.open).toHaveBeenCalled();
});

//
// ✅ 11. VrniPoti
//
test("VrniPoti prikaže mockane poti", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Pot 1" }],
  });

  await act(async () => {
    render(<VrniPoti />);
  });

  await waitFor(() =>
    expect(screen.getByText(/Pot 1/i)).toBeInTheDocument()
  );
});

//
// ✅ 12. PotUredi
//
test("PotUredi se rendera", async () => {
  await act(async () => {
    render(<PotUredi />);
  });
  expect(screen.getByText(/Uredi pot/i)).toBeInTheDocument();
});
