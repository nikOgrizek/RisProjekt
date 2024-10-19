package com.primer.ris.controllers;
import com.primer.ris.dao.ZnamenitostRepository;
import com.primer.ris.models.Potovanje;
import com.primer.ris.models.Znamenitost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/znamenitost")
@CrossOrigin(origins = "http://localhost:3000/")
public class ZnamenitostController {

    @Autowired
    private ZnamenitostRepository znamenitostDao;

    @PostMapping("/dodajZnamenitost")
    public Znamenitost dodajZnamenitost(@RequestBody Znamenitost znamenitost) {
        return znamenitostDao.save(znamenitost);
    }

    @PutMapping("/posodobiZnamenitost/{id}")
    public Znamenitost urediZnamenitost(@PathVariable Long id, @RequestBody Znamenitost posodobljenaZnamenitost) {
        Znamenitost obstojecaZnamenitost = znamenitostDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Znamenitost z id " + id + " ni bila najdena"));

        // Posodobitev podatkov
        obstojecaZnamenitost.setIme(posodobljenaZnamenitost.getIme());
        obstojecaZnamenitost.setOpis(posodobljenaZnamenitost.getOpis());
        obstojecaZnamenitost.setLokacija(posodobljenaZnamenitost.getLokacija());
        //obstojecaZnamenitost.setPot(posodobljenaZnamenitost.getPot());

        return znamenitostDao.save(obstojecaZnamenitost);
    }

    @DeleteMapping("/izbrisZnamenitosti/{id}")
    public String izbrisiZnamenitost(@PathVariable Long id) {
       if (!znamenitostDao.existsById(id)){
           throw new RuntimeException("Znamenitost ni najdena: " + id);
       }

       znamenitostDao.deleteById(id);

       return "Znamenitost izbrisana";
    }

    @GetMapping("/vrniZnamenitost")
    public Iterable<Map<String, Object>> vrniZnamenitost(){
        List<Znamenitost> znamenitosti = znamenitostDao.findAll();
        List<Map<String, Object>> formattedZnamenitosti = new ArrayList<>();
        for (Znamenitost znamenitost : znamenitosti) {
            Map<String, Object> formattedZnamenitostMap = new HashMap<>();
            formattedZnamenitostMap.put("id", znamenitost.getId());
            formattedZnamenitostMap.put("ime", znamenitost.getIme());
            formattedZnamenitostMap.put("lokacija", znamenitost.getLokacija());
            formattedZnamenitostMap.put("opis", znamenitost.getOpis());
            if (znamenitost.getPot() != null) {
                formattedZnamenitostMap.put("pot", Map.of(
                        "id", znamenitost.getPot().getId(),
                        "ime", znamenitost.getPot().getIme(),
                        "opis", znamenitost.getPot().getOpis()
                ));
            }
            formattedZnamenitosti.add(formattedZnamenitostMap);
        }

        return formattedZnamenitosti;
    }

}
