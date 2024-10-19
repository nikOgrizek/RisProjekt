package com.primer.ris.controllers;
import com.primer.ris.dao.PotovanjeRepository;
import com.primer.ris.models.Potovanje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/potovanje")
@CrossOrigin(origins = "http://localhost:3000/")
public class PotovanjeController {


    @Autowired
    private PotovanjeRepository potovanjeDao;

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }

    @GetMapping("/vrniPotovanja")
    public Iterable<Map<String, Object>> vrniPotovanja(
            @RequestParam(required = false) LocalDate datum,
            @RequestParam(required = false) Potovanje.Drzava drzava,
            @RequestParam(required = false) Integer minPathsCount,
            @RequestParam(required = false) Integer maxPathsCount
    ) {
        List<Potovanje> potovanja;

        if (datum != null && drzava != null && minPathsCount != null && maxPathsCount != null) {
            potovanja = potovanjeDao.findByDatumZacetkaAndDrzavaAndSteviloPotiBetween(datum, drzava, minPathsCount, maxPathsCount);
        } else if (datum != null && drzava != null) {
            potovanja = potovanjeDao.findByDatumZacetkaAndDrzava(datum, drzava);
        } else if (datum != null) {
            potovanja = potovanjeDao.findByDatumZacetka(datum);
        } else if (drzava != null) {
            potovanja = potovanjeDao.findByDrzava(drzava);
        } else if (minPathsCount != null && maxPathsCount != null) {
            potovanja = potovanjeDao.findBySteviloPotiBetween(minPathsCount, maxPathsCount);
        } else {
            potovanja = potovanjeDao.findAll();
        }

        List<Map<String, Object>> formattedPotovanja = new ArrayList<>();

        for (Potovanje potovanje : potovanja) {
            Map<String, Object> formattedPotovanjeMap = new HashMap<>();
            formattedPotovanjeMap.put("id", potovanje.getId());
            formattedPotovanjeMap.put("datum_zacetka", potovanje.getDatumZacetka());
            formattedPotovanjeMap.put("datum_konca", potovanje.getDatumKonca());
            formattedPotovanjeMap.put("ime", potovanje.getIme());
            formattedPotovanjeMap.put("opis", potovanje.getOpis());
            formattedPotovanjeMap.put("drzava", potovanje.getDrzava());
            formattedPotovanjeMap.put("steviloPoti", potovanje.getSteviloPoti()); // Dodaj število poti

            formattedPotovanja.add(formattedPotovanjeMap);
        }

        return formattedPotovanja;
    }

    @PostMapping("/dodajPotovanje")
    public Potovanje dodajPotovanje(@RequestBody Potovanje potovanje) {
        return potovanjeDao.save(potovanje);
    }

    @PutMapping("/posodobiPotovanje/{id}")
    public Potovanje posodobiPotovanje(@PathVariable Long id, @RequestBody Potovanje updatedPotovanje) {
        Potovanje existingPotovanje = potovanjeDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Potovanje ni najdeno: " + id));

        existingPotovanje.setDatumZacetka(updatedPotovanje.getDatumZacetka());
        existingPotovanje.setDatumKonca(updatedPotovanje.getDatumKonca());
        existingPotovanje.setIme(updatedPotovanje.getIme());
        existingPotovanje.setOpis(updatedPotovanje.getOpis());
        existingPotovanje.setDrzava(updatedPotovanje.getDrzava());
        existingPotovanje.setSteviloPoti(updatedPotovanje.getSteviloPoti());

        return potovanjeDao.save(existingPotovanje);
    }

    @DeleteMapping("/izbrisiPotovanje/{id}")
    public String izbrisiPotovanje(@PathVariable Long id) {
        if (!potovanjeDao.existsById(id)) {
            throw new RuntimeException("Potovanje ni najdeno: " + id);
        }

        potovanjeDao.deleteById(id);

        return "Potovanje uspešno izbrisano.";
    }

    @GetMapping("/")
    public String index() {
        return "Dobrodošli v aplikaciji Potovanje!";
    }


}
