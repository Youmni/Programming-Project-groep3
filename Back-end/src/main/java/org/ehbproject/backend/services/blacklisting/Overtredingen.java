package org.ehbproject.backend.services.blacklisting;


import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.Reservatie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Overtredingen {

    @Autowired
    GebruikerCrudRepository repoGebruiker;
    @Autowired
    ReservatieCrudRepository repoReservatie;

    @Scheduled(cron = "0 0 0 * * TUE")
    public void overtreding(){
        List<Reservatie> reservaties = repoReservatie.findByStatus("te laat");
        for(Reservatie reservatie : reservaties){
            Gebruiker gebruiker = reservatie.getGebruiker();
            int aantalOvertredingen = gebruiker.getOvertreding();
            gebruiker.setOvertreding(aantalOvertredingen+1);
            repoGebruiker.save(gebruiker);
        }
    }
}
