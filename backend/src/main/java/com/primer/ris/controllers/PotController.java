package com.primer.ris.controllers;
import com.primer.ris.dao.PotRepository;
import com.primer.ris.dao.PotovanjeRepository;
import com.primer.ris.models.Pot;
import com.primer.ris.models.Potovanje;
import com.primer.ris.controllers.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pot")
@CrossOrigin(origins = "http://localhost:3000/")
public class PotController {
    private final PotRepository potDao;
    private final PotovanjeRepository potovanjeRepository;

    @Autowired
    public PotController(PotRepository potDao, PotovanjeRepository potovanjeRepository) {
        this.potDao = potDao;
        this.potovanjeRepository = potovanjeRepository;
    }


    @GetMapping("/hello")
    public String hello(){
        return "Hello";
    }

    /*@GetMapping("/vrniPoti")
    public Iterable<Pot> vrniPoti(){
        return potDao.findAll();
    }*/

    @GetMapping("/vrniPoti")
    public Iterable<Map<String, Object>> vrniPoti(){
        List<Pot> poti = potDao.findAll();
        List<Map<String, Object>> formattedPoti = new ArrayList<>();

        for (Pot pot : poti) {
            Map<String, Object> formattedPotovanjeMap = new HashMap<>();
            formattedPotovanjeMap.put("id", pot.getId());
            formattedPotovanjeMap.put("ime", pot.getIme());
            formattedPotovanjeMap.put("opis", pot.getOpis());
            formattedPotovanjeMap.put("potovanje_id", pot.getPotovanje().getId());
            formattedPotovanjeMap.put("razdalja", pot.getRazdalja());


            formattedPoti.add(formattedPotovanjeMap);
        }

        return formattedPoti;
    }

    @PostMapping("/dodajPot")
    public Pot dodajPot(@RequestBody Pot pot){
        return potDao.save(pot);
    }


    @GetMapping("/")
    public String index() {
        return "Dobrodošli v aplikaciji Potovanje!";
    }

    @Autowired
    private EmailService emailService;

    @GetMapping("/sendEmail")
    public String sendEmail() {
        emailService.sendEmail("pekkamerku@gufum.com", "Test Subject", "Test Body");
        return "Email sent successfully!";
    }
}
