package org.ehbproject.backend.dao;

import org.ehbproject.backend.modellen.Gebruiker;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GebruikerCrudRepository extends CrudRepository<Gebruiker, Integer> {

    public List<Gebruiker> findByGebruikerID(int gebruikerID);
    public List<Gebruiker> findByEmail(String email);
    public List<Gebruiker> findByEmailContainingIgnoreCase(String email);
    public List<Gebruiker> findByTitel(String titel);
    public List<Gebruiker> findByOvertredingen(int aantal);
    public List<Gebruiker> findByBlacklist(String Blacklist);


}
