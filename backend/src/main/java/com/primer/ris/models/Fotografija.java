package com.primer.ris.models;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.*;

@Entity
public class Fotografija {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String naslov;

    private String opis;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] slika;

    @ManyToOne
    @JoinColumn(name = "potovanje_id")
    private Potovanje potovanje;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public byte[] getSlika() {
        return slika;
    }

    public void setSlika(byte[] slika) {
        this.slika = slika;
    }

    public Potovanje getPotovanje() {
        return potovanje;
    }

    public void setPotovanje(Potovanje potovanje) {
        this.potovanje = potovanje;
    }
}
