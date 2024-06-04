package org.ehbproject.backend.dao;

import org.ehbproject.backend.modellen.Blacklists;
import org.ehbproject.backend.modellen.Gebruiker;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface BlacklistCrudRepository extends CrudRepository<Blacklists, Integer> {

    public List<Blacklists> findByBlacklistDatum(LocalDate date);
    public List<Blacklists> findByGebruiker(Gebruiker gebruiker);
    public List<Blacklists> findByGebruikerAndBlacklistStatus(Gebruiker gebruiker, String status);
    public List<Blacklists> findBlacklistsByBlacklistId(int id);
    public List<Blacklists> findByBlacklistStatus(String status);
}
