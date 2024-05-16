package org.ehbproject.backend.services.emailservice;

import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Reservatie;
import org.ehbproject.backend.services.verificatie.IsProductGereserveerd;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TerugBrengHerinneringService {
    @Autowired
    private EmailService emailService;
    @Autowired
    ReservatieCrudRepository repoReservatie;
    private static final Logger logger = LoggerFactory.getLogger(IsProductGereserveerd.class);
    @Scheduled(cron = "0 0 18 ? * THU", zone = "Europe/Brussels")
    public void findGebruikersWhoHaveAreservation() {
        List<Reservatie> reservaties = repoReservatie.findByStatus("Bezig");
        List<String> GebruikersMetReservatie = new ArrayList<>();
        for (Reservatie reservatie : reservaties) {
            GebruikersMetReservatie.add(reservatie.getGebruiker().getEmail());
            logger.info(GebruikersMetReservatie.getFirst());
        }
        logger.info("hello");


        for (String gebruikerEmail : GebruikersMetReservatie){
            String Subject = "Vergeet niet terug te brengen";
            String body = "U heb producten uitgeleend die tegen morgen binnen moeten worden gebracht. " +
                    " Vergeet niet langs Gwendoline Van den Putten te gaan. " +
                    " Zie de website voor meer  info over uw reservatie.";
            emailService.SendMail(gebruikerEmail, Subject, body);
            logger.info("mail successvol verzonden");

        }

    }

}
