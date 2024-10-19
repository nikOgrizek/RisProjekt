package com.primer.ris.dao;
import com.primer.ris.models.Vloga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VlogaRepository extends JpaRepository<Vloga, Long> {
    Vloga findByImeVloge(String imeVloge);
}
