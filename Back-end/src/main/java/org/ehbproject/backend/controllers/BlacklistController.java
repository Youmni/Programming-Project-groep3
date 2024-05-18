package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.BlacklistCrudRepository;
import org.ehbproject.backend.dao.CategorieCrudRepository;
import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.modellen.Blacklists;
import org.ehbproject.backend.modellen.Categorie;
import org.ehbproject.backend.modellen.Gebruiker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/blacklist")
public class BlacklistController {

    @Autowired
    BlacklistCrudRepository repoBlacklist;
    @Autowired
    GebruikerCrudRepository repoGebruiker;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Blacklists> getAllBlacklists(){
        ArrayList<Blacklists> blacklistMandje = new ArrayList<>();
        repoBlacklist.findAll().forEach(blacklistMandje::add);
        return blacklistMandje;
    }

    @CrossOrigin
    @GetMapping("/gebruikerId={id}")
    public List<Blacklists> getAllBlacklistsByGebruikerId(@PathVariable int id) {
        List<Gebruiker> gebruiker = repoGebruiker.findByGebruikerID(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        return repoBlacklist.findByGebruiker(gebruikerObject);
    }
    @CrossOrigin
    @GetMapping("/blacklistDatum={datum}")
    public List<Blacklists> getAllBlacklistsByBlacklistDatum(@PathVariable LocalDate datum) {
        return repoBlacklist.findByBlacklistDatum(datum);
    }
}
