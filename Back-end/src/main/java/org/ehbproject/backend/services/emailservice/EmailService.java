package org.ehbproject.backend.services.emailservice;

import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Reservatie;
import org.ehbproject.backend.services.verificatie.ProductReservationVerifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void SendMail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
        }
        catch (Exception e){
            LoggerFactory.getLogger(EmailService.class).error("Error sending email", e);}
    }


    @Autowired
    ReservatieCrudRepository repoReservatie;
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    @Scheduled(cron = "0 0 6 ? * SAT", zone = "Europe/Brussels")
    public void findGebruikersWhoAreLate() {
        EmailService emailService = new EmailService();
        List<Reservatie> reservaties = repoReservatie.findByStatus("te laat");
        List<String> TeLateGebruikers = new ArrayList<>();
        for (Reservatie reservatie : reservaties) {
            TeLateGebruikers.add(reservatie.getGebruiker().getEmail());
            logger.info(TeLateGebruikers.getFirst());
        }
        logger.info("hello");


        for (String gebruikerEmail : TeLateGebruikers) {
            String Subject = "Te laat";
            String body = "U bent te laat met het inleveren van uw producten, zie de website voor meer info over uw reservatie.";
            emailService.SendMail(gebruikerEmail, Subject, body);
            logger.info("mail successvol verzonden");

        }
    }
        @Scheduled(cron = "0 0 18 ? * THU", zone = "Europe/Brussels")
        public void findGebruikersWhoHaveAreservation() {
            EmailService emailService = new EmailService();
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
                        " Zie de website voor meer info over uw reservatie.";
                emailService.SendMail(gebruikerEmail, Subject, body);
                logger.info("mail successvol verzonden");

            }

        }

}
