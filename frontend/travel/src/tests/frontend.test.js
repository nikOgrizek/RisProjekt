import { render, screen, fireEvent } from "@testing-library/react";
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
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Pošlji E-pošto/i)).toBeInTheDocument();
});

//
// ✅ 2. Test: App vsebuje gumb Dodaj Fotografijo
//
test("App prikaže gumb Dodaj Fotografijo", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const button = await screen.findByRole("button", {
    name: /Dodaj Fotografijo/i,
  });

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

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const sendButton = await screen.findByRole("button", {
    name: /Pošlji E-pošto/i,
  });

  fireEvent.click(sendButton);

  expect(global.fetch).toHaveBeenCalledTimes(1);
});

//
// ✅ 4. Test: Znamenitosti – mock axios GET
//
test("Znamenitosti prikaže mockano znamenitost", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Test znamenitost" }],
  });

  render(<Znamenitosti />);

  const addButton = await screen.findByRole("button", {
    name: /Dodaj znamenitost/i,
  });
  expect(addButton).toBeInTheDocument();

  const item = await screen.findByText(/Test znamenitost/i);
  expect(item).toBeInTheDocument();
});

//
// ✅ 5. Test: PotovanjaDodaj vsebuje gumb
//
test("PotovanjaDodaj vsebuje gumb Dodaj potovanje", () => {
  render(<PotovanjaDodaj />);
  expect(
    screen.getByRole("button", { name: /Dodaj potovanje/i })
  ).toBeInTheDocument();
});

//
// ✅ 6. Test: PotovanjaDodaj – vnos podatkov
//
test("PotovanjaDodaj omogoča vnos podatkov", () => {
  render(<PotovanjaDodaj />);

  const inputs = screen.getAllByPlaceholderText(/Besedilo/i);

  fireEvent.change(inputs[0], { target: { value: "Test potovanje" } });
  fireEvent.change(inputs[1], { target: { value: "Opis test" } });

  expect(inputs[0].value).toBe("Test potovanje");
  expect(inputs[1].value).toBe("Opis test");
});

//
// ✅ 7. Test: Avtentikacija vsebuje polja
//
test("Avtentikacija vsebuje polja za prijavo", () => {
  render(<Avtentikacija />);

  expect(screen.getAllByLabelText(/Uporabniško ime/i)[0]).toBeInTheDocument();
  expect(screen.getAllByLabelText(/Geslo/i)[0]).toBeInTheDocument();
});

//
// ✅ 8. Test: Fotografija vsebuje input
//
test("Fotografija vsebuje input za sliko", () => {
  render(<Fotografija />);
  expect(screen.getByLabelText(/Izberi sliko/i)).toBeInTheDocument();
});

//
// ✅ 9. Test: PotIzbrisi vsebuje select
//
test("PotIzbrisi vsebuje select element", () => {
  render(<PotIzbrisi />);
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

//
// ✅ 10. Test: PotDodaj omogoča vnos razdalje
//
test("PotDodaj omogoča vnos razdalje", () => {
  render(<PotDodaj />);

  const input = screen.getByPlaceholderText(/Razdalja poti/i);

  fireEvent.change(input, { target: { value: "42" } });

  expect(input.value).toBe("42");
});

//
// ✅ 11. Test: PotovanjaVrni – mock axios
//
test("PotovanjaVrni prikaže mockano potovanje", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Test potovanje", opis: "Opis" }],
  });

  render(<PotovanjaVrni />);

  expect(await screen.findByText(/Test potovanje/i)).toBeInTheDocument();
});

//
// ✅ 12. Test: VrniPoti – mock axios
//
test("VrniPoti prikaže mockane poti", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, ime: "Pot 1" }],
  });

  render(<VrniPoti />);

  expect(await screen.findByText(/Pot 1/i)).toBeInTheDocument();
});

//
// ✅ 13. Test: PotUredi se rendera
//
test("PotUredi se rendera", () => {
  render(<PotUredi />);
  expect(screen.getByText(/Uredi pot/i)).toBeInTheDocument();
});
