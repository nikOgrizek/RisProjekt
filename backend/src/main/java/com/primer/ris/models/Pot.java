package com.primer.ris.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;
//import org.springframework.data.annotation.Id;

@Entity
public class Pot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ime;

    private String opis;

    private int razdalja;

    @ManyToOne
    @JoinColumn(name = "potovanje_id")
    private Potovanje potovanje;

    @OneToMany(mappedBy = "pot")
    @JsonIgnoreProperties("pot")
    private List<Znamenitost> znamenitosti;

    @ManyToOne
    @JoinColumn(name = "porocilo_id")
    @JsonIgnoreProperties("poti")
    private Porocilo porocilo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public int getRazdalja() {
        return razdalja;
    }

    public void setRazdalja(int razdalja) {
        this.razdalja = razdalja;
    }

    public Potovanje getPotovanje() {
        return potovanje;
    }

    public void setPotovanje(Potovanje potovanje) {
        this.potovanje = potovanje;
    }

    public void dodajZnamenitost(Znamenitost znamenitost) {
        if (znamenitosti == null) {
            znamenitosti = new ArrayList<>();
        }
        znamenitosti.add(znamenitost);
        znamenitost.setPot(this);
    }

    // Dodajte druge metode glede na potrebe vaše aplikacije
}
