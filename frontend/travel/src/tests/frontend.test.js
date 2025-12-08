import { render, screen, fireEvent } from "@testing-library/react";
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

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: {} });
  axios.delete.mockResolvedValue({ data: {} });
  axios.put.mockResolvedValue({ data: {} });
});

//
// ✅ 1. Test: App sanity check
//
test("App se rendera brez napak", () => {
  render(<App />);
  expect(screen.getByText(/Pošlji E-pošto/i)).toBeInTheDocument();
});

//
// ✅ 2. Test: App vsebuje gumb Dodaj Fotografijo
//
test("App prikaže gumb Dodaj Fotografijo", async () => {
  render(<App />);
  const button = await screen.findByRole("button", { name: /Dodaj Fotografijo/i });
  expect(button).toBeInTheDocument();
});

//
// ✅ 3. Test: Pošlji E-pošto sproži fetch
//
test("klik na Pošlji E-pošto sproži fetch", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ ok: true }),
    })
  );

  render(<App />);

  const sendButton = await screen.findByRole("button", { name: /Pošlji E-pošto/i });
  fireEvent.click(sendButton);

  expect(global.fetch).toHaveBeenCalledTimes(1);
});

//
// ✅ 4. Znamenitosti
//
test("Znamenitosti prikaže mockano znamenitost", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Test znamenitost" }],
  });

  render(<Znamenitosti />);

  expect(await screen.findByText(/Test znamenitost/i)).toBeInTheDocument();
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
// ✅ 6. Avtentikacija
//
test("Avtentikacija vsebuje polja za prijavo", () => {
  render(<Avtentikacija />);
  expect(screen.getAllByLabelText(/Uporabniško ime/i)[0]).toBeInTheDocument();
  expect(screen.getAllByLabelText(/Geslo/i)[0]).toBeInTheDocument();
});

//
// ✅ 7. Fotografija
//
test("Fotografija vsebuje input za sliko", () => {
  render(<Fotografija />);
  expect(screen.getByLabelText(/Izberi sliko/i)).toBeInTheDocument();
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
// ✅ 10. PotovanjaVrni
//
test("PotovanjaVrni prikaže mockano potovanje", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Test potovanje", opis: "Opis" }],
  });

  render(<PotovanjaVrni />);
  expect(await screen.findByText(/Test potovanje/i)).toBeInTheDocument();
});

//
// ✅ 11. VrniPoti
//
test("VrniPoti prikaže mockane poti", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Pot 1" }],
  });

  render(<VrniPoti />);
  expect(await screen.findByText(/Pot 1/i)).toBeInTheDocument();
});

//
// ✅ 12. PotUredi
//
test("PotUredi se rendera", () => {
  render(<PotUredi />);
  expect(screen.getByText(/Uredi pot/i)).toBeInTheDocument();
});
