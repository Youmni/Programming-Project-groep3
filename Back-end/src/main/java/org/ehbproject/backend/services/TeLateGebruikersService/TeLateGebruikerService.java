package org.ehbproject.backend.services.TeLateGebruikersService;

import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.Reservatie;
import org.ehbproject.backend.services.emailservice.EmailService;
import org.ehbproject.backend.services.verificatie.IsProductGereserveerd;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class TeLateGebruikerService {
    @Autowired
    private EmailService emailService;
    @Autowired
    ReservatieCrudRepository repoReservatie;
    private static final Logger logger = LoggerFactory.getLogger(IsProductGereserveerd.class);
    @Scheduled(cron = "0 0 6 ? * SAT", zone = "Europe/Brussels")
    public void findGebruikersWhoAreLate() {
        List<Reservatie> reservaties = repoReservatie.findByStatus("te laat");
        List<String> TeLateGebruikers = new ArrayList<>();
        for (Reservatie reservatie : reservaties) {
//            Gebruiker gebruiker = reservatie.getGebruiker();
            TeLateGebruikers.add(reservatie.getGebruiker().getEmail());
            logger.info(TeLateGebruikers.getFirst());
        }
        logger.info("hello");


        for (String gebruikerEmail : TeLateGebruikers){
            String Subject = "Te laat";
            String body = "U bent te laat met het inleveren van uw producten, zie de website voor meer  info over uw reservatie.";
            emailService.SendMail(gebruikerEmail, Subject, body);
            logger.info("mail successvol verzonden");

        }

    }
}
