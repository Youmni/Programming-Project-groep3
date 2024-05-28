package org.ehbproject.backend.dao;

import org.ehbproject.backend.modellen.Beschadiging;
import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.Product;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface BeschadigingCrudRepository extends CrudRepository<Beschadiging, Integer> {
    public  List<Beschadiging> findBeschadigingByBeschadigingId(int beschadigingId);
    public List<Beschadiging> findByGebruiker(Gebruiker gebruiker);
    public List<Beschadiging> findByProduct(Product product);
    public List<Beschadiging> findBeschadigingByBeschadigingsdatum(LocalDate beschadigingsdatum);
}
