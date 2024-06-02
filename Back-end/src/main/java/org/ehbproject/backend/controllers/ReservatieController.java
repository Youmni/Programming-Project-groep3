package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ProductReservatieCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.dto.StatusAantalDTO;
import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.ProductReservatie;
import org.ehbproject.backend.modellen.Reservatie;
import org.ehbproject.backend.dto.ReservatieDTO;
import org.ehbproject.backend.services.emailservice.EmailService;
import org.ehbproject.backend.services.exceptions.ProductUnavailableException;
import org.ehbproject.backend.services.verificatie.ProductReservationVerifier;
import org.ehbproject.backend.services.verificatie.ReservatieLimiet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.*;

import static org.ehbproject.backend.services.verificatie.ReservatieLimiet.getAlleDatumsTussen;

@RestController
@RequestMapping(value = "/reservatie")
public class ReservatieController {

    private EmailService emailService;
    public ReservatieController(EmailService emailService) {
        this.emailService = emailService;
    }

    @Autowired
    ReservatieCrudRepository reservatieRepo;
    @Autowired
    GebruikerCrudRepository gebruikerRepo;
    @Autowired
    ProductCrudRepository productRepo;
    @Autowired
    ProductReservatieCrudRepository productReservatieRepo;
    @Autowired
    private ReservatieLimiet studentLimiet;
    @Autowired
    private ProductReservationVerifier beschikbaar;

    private static final Logger logger = LoggerFactory.getLogger(ReservatieController.class);



    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Reservatie> getAllReservaties() {
        ArrayList<Reservatie> reservatieMandje = new ArrayList<>();
        reservatieRepo.findAll().forEach(reservatieMandje::add);
        return reservatieMandje;
    }

    @CrossOrigin
    @PostMapping(value="/toevoegen")
    public ResponseEntity<String> addReservatie(@Validated @RequestBody ReservatieDTO reservatieDTO) {
        try {
            List<Gebruiker> gebruikers = gebruikerRepo.findByGebruikerId(reservatieDTO.getGebruikerId());
            if (gebruikers.isEmpty()) {
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gebruiker met ID " + reservatieDTO.getGebruikerId() + " niet gevonden.");
            }
            Gebruiker gebruiker = gebruikers.getFirst();
            int aantalProductenDezeWeek = studentLimiet.checkAantalReservatiesDezeWeek(reservatieDTO.getGebruikerId());

            WeekFields weekFields = WeekFields.of(Locale.getDefault());
            int weekAfhaalDatum = reservatieDTO.getAfhaalDatum().get(weekFields.weekOfWeekBasedYear());
            int weekRetourDatum = reservatieDTO.getRetourDatum().get(weekFields.weekOfWeekBasedYear());

            int wekenTussen = weekRetourDatum - weekAfhaalDatum + 1;

            boolean beschikbaarheidsControle = beschikbaar.isProductGereserveerd(reservatieDTO.getAfhaalDatum(),reservatieDTO.getRetourDatum(),reservatieDTO.getProducten());
            if((gebruiker.getTitel().equalsIgnoreCase("Student") && (aantalProductenDezeWeek+reservatieDTO.getProducten().length) <= 12) && gebruiker.getIsGeblacklist().equalsIgnoreCase("False")){
            if(beschikbaarheidsControle){
                ResponseEntity.status(HttpStatus.CONFLICT).body("Er liep iets mis bij het reserveren van het product. Het lijkt erop dat het product niet beschikbaar is");
            }
                Reservatie reservatie = new Reservatie(
                        reservatieDTO.getAfhaalDatum(),
                        reservatieDTO.getRetourDatum(),
                        reservatieDTO.getBoekingDatum(),
                        reservatieDTO.getReden(),
                        reservatieDTO.getOpmerking(),
                        reservatieDTO.getStatus(),
                        gebruiker
                );
                logger.info("tot voor het opslaan");
                reservatieRepo.save(reservatie);
                String email = "vdborghtt2005@gmail.com";
                String subject = "Nieuwe reservatie";
                String body = "je hebt nieuwe producten gereserveerd. deze zijn: " + reservatie.getProducten();

                emailService.SendMail(email, subject, body);
                logger.info("tot na het opslaan");


                List<Reservatie> reservatieObject = reservatieRepo.findByReservatieNr(reservatie.getReservatieNr());
                Reservatie reservatieObjectResult = reservatieObject.getFirst();
                for(int product: reservatieDTO.getProducten()){
                    logger.info("tot hier");
                    List<Product> productObject = productRepo.findByProductId(product);
                    Product productObjectResult = productObject.getFirst();
                    ProductReservatie productReservatie = new ProductReservatie(productObjectResult, reservatieObjectResult);
                    logger.info("tot net voor hier");
                    productReservatieRepo.save(productReservatie);
                    logger.info("tot hier");
                }
                return ResponseEntity.status(HttpStatus.CREATED).body("Reservatie succesvol toegevoegd"+aantalProductenDezeWeek);
            }
            else{
                return ResponseEntity.status((HttpStatus.FORBIDDEN)).body("De student is of op de zwarte lijst of heeft deze week al meer dan vijf reserveringen gemaakt.");
            }

        } catch (ProductUnavailableException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fout bij toevoegen van reservatie: " + e.getTekst());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fout bij toevoegen van reservatie: " + e.getMessage());
        }
    }


    @CrossOrigin
    @PutMapping("/{id}/opmerking")
    public ResponseEntity<String> updateOpmerking(@PathVariable int id, @RequestParam String opmerking) {
        List<Reservatie> reservaties = reservatieRepo.findByReservatieNr(id);

        if(!reservaties.isEmpty()){
            Reservatie reservatie = reservaties.getFirst();
            reservatie.setOpmerking(opmerking);
            reservatieRepo.save(reservatie);

            return ResponseEntity.ok("Opmerking van de reservatie met ID " + id + " is succesvol bijgewerkt naar " + opmerking);

        } else{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID " + id + " niet gevonden");
    }
    }
    @CrossOrigin
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable int id, @RequestParam String newStatus) {
        List<Reservatie> reservaties = reservatieRepo.findByReservatieNr(id);
        String[] statussen = {"Te laat", "Bezig", "Onvolledig", "In orde", "Voorboeking"};


        if (!reservaties.isEmpty()) {
            boolean geldigeStatus = Arrays.asList(statussen).contains(newStatus);

            if (geldigeStatus) {
                Reservatie reservatie = reservaties.getFirst();
                reservatie.setStatus(newStatus);
                reservatieRepo.save(reservatie);
                return ResponseEntity.ok("Status van de reservatie met ID " + id + " is succesvol bijgewerkt naar " + newStatus);
            } else {
                logger.info("Ongeldige status: "+newStatus);
                return ResponseEntity.badRequest().body("Ongeldige status: " + newStatus);

            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservatie met ID " + id + " niet gevonden");
        }

    }




    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<Reservatie> getReservatieByReservatieId(@PathVariable(name = "id") int id) {
        return reservatieRepo.findByReservatieNr(id);
    }

    @CrossOrigin
    @GetMapping(value = "/niet-beschikbare-datums/{id}")
    public List<LocalDate> getProductenByProductId(@PathVariable(name = "id") int id) {
        Set<Product> product = productRepo.findProductByProductId(id);
        if(product.isEmpty()){
            return List.of();
        }

        List<Reservatie> reservatiesVoorProduct = reservatieRepo.findByProducten(product);


        List<LocalDate> nietBeschikbareDagen = new ArrayList<>();
        for(Reservatie reservatieProduct :  reservatiesVoorProduct){
            List<LocalDate> alleDatums = getAlleDatumsTussen(reservatieProduct.getAfhaalDatum(), reservatieProduct.getRetourDatum());
            nietBeschikbareDagen.addAll(alleDatums);
        }

        return nietBeschikbareDagen;
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikerId={id}")
    public List<Reservatie> getReservatiesByGebruikerId(@PathVariable(name = "id") int id) {
        List<Gebruiker> gebruiker = gebruikerRepo.findByGebruikerId(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        return reservatieRepo.findByGebruiker(gebruikerObject);
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikerId={id}/status={status}")
    public List<Reservatie> getReservatiesByGebruikerIdAndStatus(@PathVariable(name = "id") int id, @PathVariable(name = "status") String status) {
        List<Gebruiker> gebruiker = gebruikerRepo.findByGebruikerId(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        return reservatieRepo.findByGebruikerAndStatus(gebruikerObject, status);
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikerId={id}/actief")
    public List<Reservatie> getReservatiesByGebruikerIdAndActief(@PathVariable(name = "id") int id) {
        List<Gebruiker> gebruiker = gebruikerRepo.findByGebruikerId(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        return reservatieRepo.findByGebruikerAndStatusIn(gebruikerObject, List.of(new String[]{"Te laat", "Bezig", "Onvolledig", "Voorboeking"}));
    }

    @CrossOrigin
    @GetMapping(value = "/afhaaldatum={date}")
    public List<Reservatie> getProductenByAfhaalDatum(@PathVariable(name = "date") LocalDate date) {
        return reservatieRepo.findByAfhaalDatum(date);
    }

    @CrossOrigin
    @GetMapping(value = "/afhaaldatum={date}/status={status}")
    public List<Reservatie> getProductenByAfhaalDatumAndStatus(@PathVariable(name = "date") LocalDate date, @PathVariable(name = "status") String status) {
        return reservatieRepo.findByAfhaalDatumAndStatus(date, "Voorboeking");
    }

    @CrossOrigin
    @GetMapping(value = "/retourdatum={date}/status={status}")
    public List<Reservatie> getProductenByRetourDatumAndStatus(@PathVariable(name = "date") LocalDate date, @PathVariable(name = "status") String status) {
        return reservatieRepo.findByRetourDatumAndStatus(date, "Bezig");
    }

    @CrossOrigin
    @GetMapping(value = "/retourDatum={date}")
    public List<Reservatie> getReservatiesByRetourDatum(@PathVariable(name = "date") LocalDate date) {
        return reservatieRepo.findByRetourDatum(date);
    }

    @CrossOrigin
    @GetMapping(value = "/status")
    public List<Reservatie> getReservatiesByStatus(@RequestParam List<String> status) {
        return reservatieRepo.findByStatusIn(status);
    }
    @CrossOrigin
    @GetMapping(value = "/boekingDatum={date}")
    public List<Reservatie> getReservatieByBoekingDatum(@PathVariable(name = "date") LocalDate date) {
        return reservatieRepo.findByBoekingDatum(date);
    }


    @CrossOrigin
    @GetMapping(value = "/in-orde")
    public int getAllInOrde(){
        Iterable<Reservatie> aantalInOrde = reservatieRepo.findByStatus("in orde");
        int aantal = 0;
        for(Reservatie inOrde: aantalInOrde){
            aantal++;
        }
        return aantal;
    }

    @CrossOrigin
    @GetMapping(value = "/te-laat")
    public int getAllTeLaat(){
        Iterable<Reservatie> aantalTeLaat = reservatieRepo.findByStatus("te laat");
        int aantal = 0;
        for(Reservatie teLaat: aantalTeLaat){
            aantal++;
        }
        return aantal;
    }

    @CrossOrigin
    @GetMapping("/status-aantallen")
    public List<StatusAantalDTO> getAmountOfReservatiesByStatus() {
        List<StatusAantalDTO> statusAantallen = new ArrayList<>();

        statusAantallen.add(new StatusAantalDTO("Te laat", reservatieRepo.findByStatus("Te laat").size()));
        statusAantallen.add(new StatusAantalDTO("In orde", reservatieRepo.findByStatus("In orde").size()));
        statusAantallen.add(new StatusAantalDTO("Bezig", reservatieRepo.findByStatus("Bezig").size()));
        statusAantallen.add(new StatusAantalDTO("Voorboeking", reservatieRepo.findByStatus("Voorboeking").size()));

        return statusAantallen;
    }
}
