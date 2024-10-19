package com.primer.ris.dao;

import com.primer.ris.models.Potovanje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PotovanjeRepository extends JpaRepository<Potovanje, Long> {
    List<Potovanje> findByDatumZacetka(LocalDate datum);
    List<Potovanje> findByDrzava(Potovanje.Drzava drzava);
    List<Potovanje> findByDatumZacetkaAndDrzava(LocalDate datum, Potovanje.Drzava drzava);
    List<Potovanje> findByDatumZacetkaAndDrzavaAndSteviloPotiBetween(LocalDate datum, Potovanje.Drzava drzava, int minSteviloPoti, int maxSteviloPoti);
    List<Potovanje> findBySteviloPotiBetween(Integer minPathsCount, Integer maxPathsCount);
}


