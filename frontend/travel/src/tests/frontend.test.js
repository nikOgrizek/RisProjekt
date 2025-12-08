import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: {} });
  axios.delete.mockResolvedValue({ data: {} });
  axios.put.mockResolvedValue({ data: {} });
  global.fetch = jest.fn();
});

//
// ✅ 1. App sanity check
//
test("App se rendera brez napak", async () => {
  await act(async () => render(<App />));
  expect(screen.getByText(/Pošlji E-pošto/i)).toBeInTheDocument();
});

//
// ✅ 2. App vsebuje gumb Dodaj Fotografijo
//
test("App prikaže gumb Dodaj Fotografijo", async () => {
  await act(async () => render(<App />));
  expect(screen.getByRole("button", { name: /Dodaj Fotografijo/i })).toBeInTheDocument();
});

//
// ✅ 3. Pošlji E-pošto sproži fetch
//
test("klik na Pošlji E-pošto sproži fetch", async () => {
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({ ok: true }),
  });

  await act(async () => render(<App />));

  fireEvent.click(screen.getByRole("button", { name: /Pošlji E-pošto/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
});

//
// ✅ 4. Znamenitosti – NI seznama, ker NI primerkov
//
test("Znamenitosti ne prikaže nobenega elementa, če ni podatkov", async () => {
  axios.get.mockResolvedValueOnce({ data: [] });

  await act(async () => render(<Znamenitosti />));

  expect(screen.queryByRole("listitem")).toBeNull();
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
// ✅ 6. Avtentikacija – robustna rešitev
//
test("Avtentikacija vsebuje polja za prijavo in registracijo", () => {
  render(<Avtentikacija />);

  // preveri, da obstajata 2 polji
  const usernames = screen.getAllByLabelText(/Uporabniško ime/i);
  expect(usernames.length).toBe(2);

  // preveri, da lahko targetiraš po ID
  expect(screen.getByLabelText(/Uporabniško ime/i, { selector: "#reg-username" })).toBeInTheDocument();
  expect(screen.getByLabelText(/Uporabniško ime/i, { selector: "#login-username" })).toBeInTheDocument();
});

//
// ✅ 7. Fotografija – uporabi button
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
// ✅ 10. VrniPoti
//
test("VrniPoti prikaže mockane poti", async () => {
  axios.get.mockResolvedValueOnce({ data: [{ id: 1, ime: "Pot 1" }] });

  await act(async () => render(<VrniPoti />));

  await waitFor(() => expect(screen.getByText(/Pot 1/i)).toBeInTheDocument());
});

//
// ✅ 11. PotUredi – popravljeno na “Posodobi poti”
//
test("PotUredi se rendera", async () => {
  await act(async () => render(<PotUredi />));
  expect(screen.getByText(/Posodobi poti/i)).toBeInTheDocument();
});
