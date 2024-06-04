package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.BlacklistCrudRepository;
import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.modellen.Blacklists;
import org.ehbproject.backend.modellen.Gebruiker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/blacklist")
public class BlacklistController {

    @Autowired
    BlacklistCrudRepository blacklistRepo;
    @Autowired
    GebruikerCrudRepository gebruikerRepo;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Blacklists> getAllBlacklists(){
        ArrayList<Blacklists> blacklistMandje = new ArrayList<>();
        blacklistRepo.findAll().forEach(blacklistMandje::add);
        return blacklistMandje;
    }

    @CrossOrigin
    @GetMapping("/gebruikerId={id}")
    public List<Blacklists> getAllBlacklistsByGebruikerId(@PathVariable int id) {
        List<Gebruiker> gebruiker = gebruikerRepo.findByGebruikerId(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        return blacklistRepo.findByGebruiker(gebruikerObject);
    }
    @CrossOrigin
    @GetMapping("/blacklistDatum={datum}")
    public List<Blacklists> getAllBlacklistsByBlacklistDatum(@PathVariable LocalDate datum) {
        return blacklistRepo.findByBlacklistDatum(datum);
    }
}
