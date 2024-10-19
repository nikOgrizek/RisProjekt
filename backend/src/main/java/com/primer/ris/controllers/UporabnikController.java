package com.primer.ris.controllers;

import com.primer.ris.dao.UporabnikRepository;
import com.primer.ris.models.Uporabnik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/uporabnik")
@CrossOrigin(origins = "http://localhost:3000/")
public class UporabnikController {

    @Autowired
    private UporabnikRepository uporabnikRepository;

    @PostMapping("/registracija")
    public String registracija(@RequestBody Uporabnik uporabnik) {
        // Add registration logic
        uporabnikRepository.save(uporabnik);
        return "Registracija uspešna!";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Uporabnik loginRequest) {
        Uporabnik uporabnik = uporabnikRepository.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());

        Map<String, String> response = new HashMap<>();

        if (uporabnik != null) {
            response.put("message", "Prijava uspešna.");
            response.put("user_id", String.valueOf(uporabnik.getId()));
            response.put("name", uporabnik.getName());
        } else {
            response.put("message", "Napačen username ali geslo.");
        }

        return response;
    }
}
