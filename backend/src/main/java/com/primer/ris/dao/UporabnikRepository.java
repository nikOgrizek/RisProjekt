package com.primer.ris.dao;

import com.primer.ris.models.Uporabnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UporabnikRepository extends JpaRepository<Uporabnik, Long> {
    Uporabnik findByUsernameAndPassword(String username, String password);
}
