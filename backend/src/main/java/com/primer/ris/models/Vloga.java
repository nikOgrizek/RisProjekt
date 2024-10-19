package com.primer.ris.models;

import jakarta.persistence.*;

@Entity
public class Vloga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imeVloge;

    // Konstruktorji, getterji, setterji in druge metode

    public Vloga() {
        // privzeti prazen konstruktor, potreben za JPA
    }

    public Vloga(String imeVloge) {
        this.imeVloge = imeVloge;
    }

    // getterji in setterji

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImeVloge() {
        return imeVloge;
    }

    public void setImeVloge(String imeVloge) {
        this.imeVloge = imeVloge;
    }
}