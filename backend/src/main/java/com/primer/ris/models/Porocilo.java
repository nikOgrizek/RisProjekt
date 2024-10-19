package com.primer.ris.models;

import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class Porocilo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imePotovanja;

    @OneToMany(mappedBy = "porocilo", cascade = CascadeType.ALL)
    private List<Pot> poti;

    // getterji in setterji ter dodatne metode

    // Primer metode za izračun skupne razdalje
    public int getSkupnaRazdalja() {
        return poti.stream().mapToInt(Pot::getRazdalja).sum();
    }

    public Porocilo() {
        // default constructor
    }
}