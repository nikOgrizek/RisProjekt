package com.primer.ris;

import com.primer.ris.controllers.PotController;
import com.primer.ris.controllers.PotovanjeController;
import com.primer.ris.controllers.UporabnikController;
import com.primer.ris.dao.PotRepository;
import com.primer.ris.dao.PotovanjeRepository;
import com.primer.ris.dao.UporabnikRepository;
import com.primer.ris.models.Pot;
import com.primer.ris.models.Potovanje;
import com.primer.ris.models.Uporabnik;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

@SpringBootTest
class RisApplicationTests {
	// Potovanje tests
	@Autowired
	private PotovanjeRepository potovanjeRepository;

	@Autowired
	private PotovanjeController potovanjeController;

	@BeforeEach
	void initPotovanje() {
		potovanjeRepository.deleteAll();
	}

	@Test
	void testPotovanjeCreation() {
		Potovanje potovanje = new Potovanje();
		potovanje.setIme("Testno potovanje");
		potovanje.setOpis("Opis testnega potovanja");
		potovanje.setDatumZacetka(LocalDate.now());
		potovanje.setDatumKonca(LocalDate.now().plusDays(5));
		potovanje.setSteviloPoti(3);
		potovanjeRepository.save(potovanje);
		Assertions.assertEquals(1, potovanjeRepository.count());
	}

	@Test
	void testPotovanjeUpdate() {
		Potovanje potovanje = new Potovanje();
		potovanje.setIme("Originalno potovanje");
		potovanje.setOpis("Opis");
		potovanjeRepository.save(potovanje);

		potovanje.setIme("Posodobljeno potovanje");
		potovanjeController.posodobiPotovanje(potovanje.getId(), potovanje);

		Potovanje updated = potovanjeRepository.findById(potovanje.getId()).orElse(null);
		Assertions.assertNotNull(updated);
		Assertions.assertEquals("Posodobljeno potovanje", updated.getIme());
	}

	// Pot tests
	@Autowired
	private PotRepository potRepository;

	@Autowired
	private PotController potController;

	@BeforeEach
	void initPot() {
		potRepository.deleteAll();
	}

	@Test
	void testPotCreation() {
		Pot pot = new Pot();
		pot.setIme("Testna pot");
		pot.setOpis("Opis testne poti");
		pot.setRazdalja(100);
		potRepository.save(pot);
		Assertions.assertEquals(1, potRepository.count());
	}

	@Test
	void testRetrievePot() {
		Pot pot = new Pot();
		pot.setIme("Testna pot");
		pot.setOpis("Opis poti");
		potRepository.save(pot);

		List<Pot> pots = potRepository.findAll();
		Assertions.assertEquals(1, pots.size());
		Assertions.assertEquals("Testna pot", pots.get(0).getIme());
	}

	// Uporabnik tests
	@Autowired
	private UporabnikRepository uporabnikRepository;

	@Autowired
	private UporabnikController uporabnikController;

	@BeforeEach
	void initUporabnik() {
		uporabnikRepository.deleteAll();
	}

	@Test
	void testUserRegistration() {
		Uporabnik uporabnik = new Uporabnik();
		uporabnik.setUsername("testUser");
		uporabnik.setPassword("password");
		uporabnik.setName("Testni Uporabnik");
		uporabnikRepository.save(uporabnik);
		Assertions.assertEquals(1, uporabnikRepository.count());
	}

	@Test
	void testUserLogin() {
		Uporabnik uporabnik = new Uporabnik();
		uporabnik.setUsername("testUser");
		uporabnik.setPassword("password");
		uporabnik.setName("Testni Uporabnik");
		uporabnikRepository.save(uporabnik);

		Uporabnik loginRequest = new Uporabnik();
		loginRequest.setUsername("testUser");
		loginRequest.setPassword("password");

		var response = uporabnikController.login(loginRequest);
		Assertions.assertEquals("Prijava uspešna.", response.get("message"));
		Assertions.assertEquals(uporabnik.getName(), response.get("name"));
	}
}
