package com.primer.ris.dao;

import com.primer.ris.models.Pot;
import com.primer.ris.models.Potovanje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PotRepository extends JpaRepository<Pot, Long> {
    List<Pot> findAll();
    List<Pot> findByPotovanjeId(Long id);
}
