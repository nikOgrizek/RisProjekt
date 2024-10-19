package com.primer.ris.models;

import jakarta.persistence.*;
import jakarta.persistence.Id;
//import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
public class Potovanje {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String ime;

    private String opis;

    private LocalDate datumZacetka;

    private LocalDate datumKonca;

    private int steviloPoti;


    @OneToMany(mappedBy = "potovanje", cascade = CascadeType.ALL)
    private Collection<Pot> poti;

    @OneToMany(mappedBy = "potovanje", cascade = CascadeType.ALL)
    private Collection<Fotografija> slike;

    @ElementCollection
    private Collection<String> seznamStvari;

   /* @OneToMany(mappedBy = "potovanje", cascade = CascadeType.ALL)
    private Collection<PdfDokument> dokumenti;

    @OneToMany(mappedBy = "potovanje", cascade = CascadeType.ALL)
    private Collection<Porocilo> porocila;*/


    public enum Drzava {
        SLOVENIA,
        CROATIA,
        AUSTRIA,
        ITALY,
        // Dodajte druge države po potrebi
    }

    @Enumerated(EnumType.STRING)
    private Drzava drzava;

    // Primer dodatnih metod za manipulacijo z podatki
    public void dodajPot(Pot pot) {
        this.poti.add(pot);
        pot.setPotovanje(this);
    }

    public void odstraniPot(Pot pot) {
        this.poti.remove(pot);
        pot.setPotovanje(null);
    }

    public void dodajFotografijo(Fotografija fotografija) {
        this.slike.add(fotografija);
        fotografija.setPotovanje(this);
    }

    public void odstraniFotografijo(Fotografija fotografija) {
        this.slike.remove(fotografija);
        fotografija.setPotovanje(null);
    }

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

    public LocalDate getDatumZacetka() {
        return datumZacetka;
    }

    public void setDatumZacetka(LocalDate datumZacetka) {
        this.datumZacetka = datumZacetka;
    }

    public LocalDate getDatumKonca() {
        return datumKonca;
    }

    public void setDatumKonca(LocalDate datumKonca) {
        this.datumKonca = datumKonca;
    }

    public Collection<Pot> getPoti() {
        return poti;
    }

    public void setPoti(Collection<Pot> poti) {
        this.poti = poti;
    }

    public Collection<Fotografija> getSlike() {
        return slike;
    }

    public void setSlike(Collection<Fotografija> slike) {
        this.slike = slike;
    }

    public Collection<String> getSeznamStvari() {
        return seznamStvari;
    }

    public void setSeznamStvari(Collection<String> seznamStvari) {
        this.seznamStvari = seznamStvari;
    }
/*
    public Collection<PdfDokument> getDokumenti() {
        return dokumenti;
    }

    public void setDokumenti(Collection<PdfDokument> dokumenti) {
        this.dokumenti = dokumenti;
    }

    public Collection<Porocilo> getPorocila() {
        return porocila;
    }

    public void setPorocila(Collection<Porocilo> porocila) {
        this.porocila = porocila;
    }*/

    public Drzava getDrzava() {
        return drzava;
    }

    public void setDrzava(Drzava drzava) {
        this.drzava = drzava;
    }
    // Dodajte to metodo za povečanje števila poti
    public void povecajSteviloPoti() {
        this.steviloPoti++;
    }

    public void zmanjsajSteviloPoti() {
        this.steviloPoti--;
    }


    public void setSteviloPoti(int steviloPoti) {
        this.steviloPoti = steviloPoti;
    }

    @Column(name = "stevilo_poti")
    public int getSteviloPoti() {
        return steviloPoti;
    }
}


 