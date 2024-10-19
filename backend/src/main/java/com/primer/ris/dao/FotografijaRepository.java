package com.primer.ris.dao;

import com.primer.ris.models.Fotografija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FotografijaRepository extends JpaRepository<Fotografija, Long> {
    // Dodatne metode po potrebi
}
