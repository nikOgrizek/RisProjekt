package com.primer.ris.dao;

import com.primer.ris.models.Znamenitost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ZnamenitostRepository extends JpaRepository<Znamenitost, Long> {
    List<Znamenitost> findByIme(String ime);

    List<Znamenitost> findByLokacija(String lokacija);

    // Primer dodatne poizvedbe po imenu in lokaciji
    List<Znamenitost> findByImeAndLokacija(String ime, String lokacija);
}
