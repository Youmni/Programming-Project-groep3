package org.ehbproject.backend.services.emailservice;

import org.ehbproject.backend.dao.ProductReservatieCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.ProductReservatie;
import org.ehbproject.backend.modellen.Reservatie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
        } catch (Exception e) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
        }
    }


    @Autowired
    ReservatieCrudRepository repoReservatie;
    @Autowired
    ProductReservatieCrudRepository repoProductReservatie;
    @Scheduled(cron = "0 0 6 ? * SAT", zone = "Europe/Brussels")
    public void findGebruikersWhoAreLate() {
        EmailService emailService = new EmailService();
        List<String> statussen = Arrays.asList("Te laat", "Onvolledig");
        List<Reservatie> reservaties = repoReservatie.findByStatusIn(statussen);
        List<String> TeLateGebruikers = new ArrayList<>();
        for (Reservatie reservatie : reservaties) {
            TeLateGebruikers.add(reservatie.getGebruiker().getEmail());
            ArrayList<String> productnaam = new ArrayList<>();
            List<ProductReservatie> productReservaties = repoProductReservatie.findByReservatie_ReservatieNr(reservatie.getReservatieNr());
            for (ProductReservatie productReservatieproducten : productReservaties) {
                Product product = productReservatieproducten.getProduct();
                productnaam.add(product.getProductNaam());
            }
            for (String gebruikerEmail : TeLateGebruikers) {
                String Subject = "Te laat";
                String body = "Geachte " + gebruikerEmail.split("\\.")[0] + "\n\n" +
                        "Wij willen u informeren dat uw reservering te laat binnen is gebracht of onvolledig binnen gebracht is. U heeft de volgende producten in bezit:\n\n" +
                        String.join(", ", productnaam) + "\n\n" +
                        "Wij verzoeken u vriendelijk om deze producten zo snel mogelijk terug te brengen.\n\n" +
                        "Doordat uw reservatie te laat of onvolledig is, heeft u een overtreding begaan. u heeft op het moment van de mail " + reservatie.getGebruiker().getOvertreding() + ".\n\n" +
                        "Mocht u nog vragen hebben, aarzel dan niet om contact met ons op te nemen.\n\n" +
                        "Met vriendelijke groeten,\n" +
                        "Het medialab";
                ;
                emailService.SendMail(gebruikerEmail, Subject, body);

            }
        }
    }
        @Scheduled(cron = "0 0 18 ? * THU", zone = "Europe/Brussels")
        public void findGebruikersWhoHaveAreservation() {
            EmailService emailService = new EmailService();
            List<Reservatie> reservaties = repoReservatie.findByStatus("Bezig");
            List<String> GebruikersMetReservatie = new ArrayList<>();
            for (Reservatie reservatie : reservaties) {
                GebruikersMetReservatie.add(reservatie.getGebruiker().getEmail());
                ArrayList<String> productnaam = new ArrayList<>();
                List<ProductReservatie> productReservaties = repoProductReservatie.findByReservatie_ReservatieNr(reservatie.getReservatieNr());
                for (ProductReservatie productReservatieproducten : productReservaties) {
                    Product product = productReservatieproducten.getProduct();
                    productnaam.add(product.getProductNaam());
                }
                for (String gebruikerEmail : GebruikersMetReservatie){
                    String Subject = "Vergeet niet terug te brengen";
                    String body = "Geachte " + gebruikerEmail.split("\\.")[0] + "\n\n" +
                            "Wij willen u informeren dat uw reservering ten einde loopt. U heeft de volgende producten in bezit:\n\n" +
                            String.join(", ", productnaam) + "\n\n" +
                            "Wij verzoeken u vriendelijk om deze producten op de volgende datum terug te brengen:" + reservatie.getRetourDatum() + ".\n\n" +
                            "Mocht u nog vragen hebben, aarzel dan niet om contact met ons op te nemen.\n\n" +
                            "Met vriendelijke groeten,\n" +
                            "Het medialab";
                    ;
                }
            }
        }

}
