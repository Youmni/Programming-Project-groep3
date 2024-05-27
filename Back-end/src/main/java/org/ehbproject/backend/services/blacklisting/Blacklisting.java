package org.ehbproject.backend.services.blacklisting;


import org.ehbproject.backend.dao.BlacklistCrudRepository;
import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.modellen.Blacklists;
import org.ehbproject.backend.modellen.Gebruiker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class Blacklisting {

    @Autowired
    GebruikerCrudRepository repoGebruiker;
    @Autowired
    BlacklistCrudRepository repoBlacklist;



    @Scheduled(cron = "0 0 2 * * *")
    public void blacklisting() {
        Iterable<Gebruiker> gebruikers = repoGebruiker.findByIsGeblacklist("False");
        for (Gebruiker gebruiker : gebruikers) {
            if (gebruiker.getOvertreding() % 2 == 0 && gebruiker.getOvertreding() != 0) {
                gebruiker.setIsGeblacklist("True");
                Blacklists blacklist = new Blacklists(
                        gebruiker,
                        "Automatische blacklist wegens te laat u reservatie te hebben binnen gedaan.",
                        LocalDate.now(),
                        "Actief"
                );

                repoGebruiker.save(gebruiker);
                repoBlacklist.save(blacklist);
            }
        }
    }
    @Scheduled(cron = "0 0 2 * * *")
    public void removeBlacklisting() {
        List<Blacklists> blacklists = repoBlacklist.findByBlacklistStatus("Actief");
        if(blacklists.isEmpty()){
            return;
        }

        for(Blacklists blacklist : blacklists){

            LocalDate blacklistDatumAfter3Months = blacklist.getBlacklistDatum().plusMonths(3);
            if (blacklist.getBlacklistDatum().equals(blacklistDatumAfter3Months)) {
                Gebruiker gebruiker = blacklist.getGebruiker();

                gebruiker.setIsGeblacklist("False");
                blacklist.setBlacklistStatus("Niet Actief");
                repoGebruiker.save(gebruiker);
                repoBlacklist.save(blacklist);
            }
        }
    }
}