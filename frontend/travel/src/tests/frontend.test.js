import { render, screen, fireEvent, within } from "@testing-library/react";
import { act } from "react";
import App from "../App";
import PotovanjaDodaj from "../components/Potovanja/dodajPotovanja";
import PotovanjaVrni from "../components/Potovanja/vrniPotovanja";
import Znamenitosti from "../components/Znamenitosti/Znamenitosti";
import Fotografija from "../components/Fotografije/Fotografije";
import Avtentikacija from "../components/Avtentikacija/Auth";
import PotIzbrisi from "../components/Pot/izbrisiPot";
import PotDodaj from "../components/Pot/dodajPot";
import axios from "axios";

// ✅ Globalni mock za axios
jest.mock("axios");

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: {} });
  axios.delete.mockResolvedValue({ data: {} });
  axios.put.mockResolvedValue({ data: {} });
});

//
// ✅ 1. Test: App rendera gumb Dodaj Fotografijo
//
test("prikaže gumb Dodaj Fotografijo", async () => {
  await act(async () => {
    render(<App />);
  });

  expect(
    screen.getByRole("button", { name: /Dodaj Fotografijo/i })
  ).toBeInTheDocument();
});

//
// ✅ 2. Test: Znamenitosti – mock axios GET
//
test("prikaže mockano znamenitost", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Test znamenitost" }],
  });

  render(<Znamenitosti />);

  const item = await screen.findByText(/Znamenitost/i);
  expect(item).toBeInTheDocument();
});

//
// ✅ 3. Test: PotovanjaDodaj vsebuje gumb
//
test("PotovanjaDodaj vsebuje gumb Dodaj potovanje", () => {
  render(<PotovanjaDodaj />);
  expect(
    screen.getByRole("button", { name: /Dodaj potovanje/i })
  ).toBeInTheDocument();
});

//
// ✅ 4. Test: PotovanjaDodaj – vnos podatkov
//
test("vnos podatkov v formo za dodajanje potovanja", () => {
  render(<PotovanjaDodaj />);

  // dobimo vse inpute z placeholder "Besedilo"
  const besediloInputs = screen.getAllByPlaceholderText(/Besedilo/i);

  const imeInput = besediloInputs[0]; // prvi input je "Ime"
  const opisInput = besediloInputs[1]; // drugi input je "Opis"

  fireEvent.change(imeInput, { target: { value: "Test potovanje" } });
  fireEvent.change(opisInput, { target: { value: "Opis test" } });

  expect(imeInput.value).toBe("Test potovanje");
  expect(opisInput.value).toBe("Opis test");
});

//
// ✅ 5. Test: Avtentikacija – preveri polja
//
test("Avtentikacija vsebuje polja za prijavo", () => {
  render(<Avtentikacija />);

  // Če so label brez htmlFor, uporabimo getAllByLabelText in vzamemo prvi input
  const uporabniskoImeInput = screen.getAllByLabelText(/Uporabniško ime/i)[0];
  const gesloInput = screen.getAllByLabelText(/Geslo/i)[0];

  expect(uporabniskoImeInput).toBeInTheDocument();
  expect(gesloInput).toBeInTheDocument();
});

//
// ✅ 6. Test: Fotografija – preveri input za datoteko
//
test("Fotografija vsebuje input za sliko", () => {
  render(<Fotografija />);
  expect(screen.getByLabelText(/Izberi sliko/i)).toBeInTheDocument();
});

//
// ✅ 7. Test: PotIzbrisi – render dropdown
//
test("PotIzbrisi vsebuje select element", () => {
  render(<PotIzbrisi />);
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

//
// ✅ 8. Test: PotDodaj – vnos razdalje
//
test("PotDodaj omogoča vnos razdalje", () => {
  render(<PotDodaj />);

  const input = screen.getByPlaceholderText(/Razdalja poti/i);
  fireEvent.change(input, { target: { value: "42" } });

  expect(input.value).toBe("42");
});

//
// ✅ 9. Test: PotovanjaVrni – mock axios + async render
//
test("PotovanjaVrni prikaže mockano potovanje", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Test potovanje", opis: "Opis" }],
  });

  render(<PotovanjaVrni />);

  const item = await screen.findByText(/Test potovanje/i);
  expect(item).toBeInTheDocument();
});

//
// ✅ 10. Test: Pošlji E-pošto gumb pokliče fetch
//
test("klik na Pošlji E-pošto sproži fetch", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ ok: true }) })
  );

  await act(async () => {
    render(<App />);
  });

  fireEvent.click(screen.getByRole("button", { name: /Pošlji E-pošto/i }));

  expect(global.fetch).toHaveBeenCalledTimes(1);
});