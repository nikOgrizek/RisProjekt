package com.primer.ris.dao;

import com.primer.ris.models.Porocilo;
import com.primer.ris.models.Potovanje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PorociloRepository extends JpaRepository<Porocilo, Long> {
   /* @Query("SELECT new com.example.Porocilo(p.ime, p.datumZacetka, p.datumZakljucka, p.opis, p.drzava, pt) " +
            "FROM Potovanje p JOIN p.poti pt WHERE p.id = :potovanjeId")
    Porocilo generirajPorocilo(@Param("potovanjeId") Long potovanjeId);*/
}
