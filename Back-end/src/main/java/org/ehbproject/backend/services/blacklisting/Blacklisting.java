package org.ehbproject.backend.services.blacklisting;


import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.modellen.Gebruiker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Blacklisting {

    @Autowired
    GebruikerCrudRepository repoGebruiker;

    @Scheduled(cron = "0 0 2 * * *")
    public void blacklisting(){
        Iterable<Gebruiker> gebruikers = repoGebruiker.findByBlacklist("nee");
        for(Gebruiker gebruiker : gebruikers){
            if(gebruiker.getOvertredingen()%2==0){
                gebruiker.setBlacklist("ja");
                gebruiker.setBlacklistReden("Auto blacklist wegens te veel keer te laat");
                repoGebruiker.save(gebruiker);
            }
        }
    }
}
