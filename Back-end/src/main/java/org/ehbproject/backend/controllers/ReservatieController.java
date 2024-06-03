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
import org.ehbproject.backend.services.verificatie.DateValidator;
import org.ehbproject.backend.services.verificatie.ProductReservationVerifier;
import org.ehbproject.backend.services.verificatie.ReservatieLimiet;
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

    @Autowired
    ReservatieCrudRepository repoReservatie;
    @Autowired
    GebruikerCrudRepository repoGebruiker;
    @Autowired
    ProductCrudRepository repoProduct;
    @Autowired
    ProductReservatieCrudRepository repoProductReservatie;
    @Autowired
    private ReservatieLimiet studentLimiet;
    @Autowired
    private ProductReservationVerifier beschikbaar;
    @Autowired
    private DateValidator isDatumCorrect;

    public ReservatieController(EmailService emailService) {
        this.emailService = emailService;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Reservatie> getAllReservaties() {
        ArrayList<Reservatie> reservatieMandje = new ArrayList<>();
        repoReservatie.findAll().forEach(reservatieMandje::add);
        return reservatieMandje;
    }

    @CrossOrigin
    @PostMapping(value="/toevoegen")
    public ResponseEntity<String> addReservatie(@Validated @RequestBody ReservatieDTO reservatieDTO) {
        try {
            List<Gebruiker> gebruikers = repoGebruiker.findByGebruikerId(reservatieDTO.getGebruikerId());
            if (gebruikers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gebruiker met ID " + reservatieDTO.getGebruikerId() + " niet gevonden.");
            }
            Gebruiker gebruiker = gebruikers.getFirst();
            int aantalProductenDezeWeek = studentLimiet.checkAantalReservatiesDezeWeek(reservatieDTO.getGebruikerId());

            WeekFields weekFields = WeekFields.of(Locale.getDefault());
            int weekAfhaalDatum = reservatieDTO.getAfhaalDatum().get(weekFields.weekOfWeekBasedYear());
            int weekRetourDatum = reservatieDTO.getRetourDatum().get(weekFields.weekOfWeekBasedYear());

            int wekenTussen = weekRetourDatum - weekAfhaalDatum + 1;

            boolean beschikbaarheidsControle = beschikbaar.isProductGereserveerd(reservatieDTO.getAfhaalDatum(),reservatieDTO.getRetourDatum(),reservatieDTO.getProducten());
            boolean isProductNietBeschikbaar = beschikbaar.isProductGereserveerd(reservatieDTO.getAfhaalDatum(),reservatieDTO.getRetourDatum(),reservatieDTO.getProducten());
            boolean isStudentEnOnderLimiet = gebruiker.getTitel().equalsIgnoreCase("Student") && (aantalProductenDezeWeek+reservatieDTO.getProducten().length) <= 12;
            boolean isDocentOfAdmin = !gebruiker.getTitel().equalsIgnoreCase("Student");
            boolean isNietGeblacklist = gebruiker.getIsGeblacklist().equalsIgnoreCase("False");

            if(!(isDatumCorrect.validateDates(reservatieDTO.getAfhaalDatum(), reservatieDTO.getBoekingDatum(), reservatieDTO.getRetourDatum(), gebruiker.getTitel()))){
                return  ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE ).body("De datums die zijn geselecteerd zijn niet correct volgens de regels");
            }

            if (!(reservatieDTO.getStatus().equalsIgnoreCase("voorboeking") || reservatieDTO.getStatus().equalsIgnoreCase("bezig"))) {
                return  ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE ).body("De status die is meegegeven is niet correct!");
            }

            if((isStudentEnOnderLimiet || isDocentOfAdmin) && isNietGeblacklist){
                if(beschikbaarheidsControle){
                    if(isProductNietBeschikbaar){
                        return  ResponseEntity.status(HttpStatus.CONFLICT).body("Er liep iets mis bij het reserveren van het product. Het lijkt erop dat het product niet beschikbaar is");
                    }
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
                repoReservatie.save(reservatie);
                List<Reservatie> reservatieObject = repoReservatie.findByReservatieNr(reservatie.getReservatieNr());
                Reservatie reservatieObjectResult = reservatieObject.getFirst();
                ProductReservatie productReservatie = null;
                for(int product: reservatieDTO.getProducten()){
                    List<Product> productObject = repoProduct.findByProductId(product);
                    Product productObjectResult = productObject.getFirst();
                    productReservatie = new ProductReservatie(productObjectResult, reservatieObjectResult);
                    repoProductReservatie.save(productReservatie);
                }

                ArrayList<String> productnaam = new ArrayList<>();
                List<ProductReservatie> productReservaties = repoProductReservatie.findByReservatie_ReservatieNr(reservatie.getReservatieNr());
                for(ProductReservatie productReservatieproducten : productReservaties) {
                    Product product = productReservatieproducten.getProduct();
                    productnaam.add(product.getProductNaam());
                }

                String to = reservatie.getGebruiker().getEmail();
                String subject = "Bevestiging van uw nieuwe reservering";
                String body = "Geachte " + reservatie.getGebruiker().getEmail().split("\\.")[0] + "\n\n" +
                        "Wij willen u informeren dat uw nieuwe reservering succesvol is verwerkt. U heeft de volgende producten gereserveerd:\n\n" +
                        String.join(", ", productnaam) + "\n\n" +
                        "Wij verzoeken u vriendelijk om deze producten op te halen op " + reservatie.getAfhaalDatum() + ".\n\n" +
                        "Mocht u nog vragen hebben, aarzel dan niet om contact met ons op te nemen.\n\n" +
                        "Met vriendelijke groeten,\n" +
                        "Het medialab";

                emailService.SendMail(to, subject, body);

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
    public ResponseEntity<String> updateOpmerking(@PathVariable int id, @RequestBody String opmerking) {
        List<Reservatie> reservaties = repoReservatie.findByReservatieNr(id);

        if (!reservaties.isEmpty()) {
            Reservatie reservatie = reservaties.getFirst();
            reservatie.setOpmerking(opmerking);
            repoReservatie.save(reservatie);

            return ResponseEntity.ok("Opmerking van de reservatie met ID " + id + " is succesvol bijgewerkt naar " + opmerking);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID " + id + " niet gevonden");
        }
    }

    @CrossOrigin
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable int id, @RequestParam String newStatus) {
        List<Reservatie> reservaties = repoReservatie.findByReservatieNr(id);
        String[] statussen = {"Te laat", "Bezig", "Onvolledig", "In orde", "Voorboeking"};


        if (!reservaties.isEmpty()) {
            boolean geldigeStatus = Arrays.asList(statussen).contains(newStatus);

            if (geldigeStatus) {
                Reservatie reservatie = reservaties.getFirst();
                reservatie.setStatus(newStatus);
                repoReservatie.save(reservatie);
                return ResponseEntity.ok("Status van de reservatie met ID " + id + " is succesvol bijgewerkt naar " + newStatus);
            } else {
                return ResponseEntity.badRequest().body("Ongeldige status: " + newStatus);

            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservatie met ID " + id + " niet gevonden");
        }

    }




    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<Reservatie> getReservatieByReservatieId(@PathVariable(name = "id") int id) {
        return repoReservatie.findByReservatieNr(id);
    }

    @CrossOrigin
    @GetMapping(value = "/niet-beschikbare-datums/{id}")
    public List<LocalDate> getProductenByProductId(@PathVariable(name = "id") int id) {
        Set<Product> product = repoProduct.findProductByProductId(id);
        if(product.isEmpty()){
            return List.of();
        }

        List<Reservatie> reservatiesVoorProduct = repoReservatie.findByProducten(product);


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
        List<Gebruiker> gebruiker = repoGebruiker.findByGebruikerId(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        return repoReservatie.findByGebruiker(gebruikerObject);
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikerId={id}/status={status}")
    public List<Reservatie> getReservatiesByGebruikerIdAndStatus(@PathVariable(name = "id") int id, @PathVariable(name = "status") String status) {
        List<Gebruiker> gebruiker = repoGebruiker.findByGebruikerId(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        return repoReservatie.findByGebruikerAndStatus(gebruikerObject, status);
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikerId={id}/actief")
    public List<Reservatie> getReservatiesByGebruikerIdAndActief(@PathVariable(name = "id") int id) {
        List<Gebruiker> gebruiker = repoGebruiker.findByGebruikerId(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        return repoReservatie.findByGebruikerAndStatusIn(gebruikerObject, List.of(new String[]{"Te laat", "Bezig", "Onvolledig", "Voorboeking"}));
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikerId={id}/TelaatOnvolledig")
    public List<Reservatie> getReservatiesByGebruikerIdAndStatus(@PathVariable(name = "id") int id) {
        List<Gebruiker> gebruikerList = repoGebruiker.findByGebruikerId(id);

        if (gebruikerList.isEmpty()) {
            return new ArrayList<>();
        }

        Gebruiker gebruiker = gebruikerList.getFirst();
        return repoReservatie.findByGebruikerAndStatusIn(gebruiker, Arrays.asList("Te laat", "Onvolledig"));
    }



    @CrossOrigin
    @GetMapping(value = "/afhaaldatum={date}")
    public List<Reservatie> getProductenByAfhaalDatum(@PathVariable(name = "date") LocalDate date) {
        return repoReservatie.findByAfhaalDatum(date);
    }

    @CrossOrigin
    @GetMapping(value = "/afhaaldatum={date}/status={status}")
    public List<Reservatie> getProductenByAfhaalDatumAndStatus(@PathVariable(name = "date") LocalDate date, @PathVariable(name = "status") String status) {
        return repoReservatie.findByAfhaalDatumAndStatus(date, "Voorboeking");
    }

    @CrossOrigin
    @GetMapping(value = "/retourdatum={date}/status={status}")
    public List<Reservatie> getProductenByRetourDatumAndStatus(@PathVariable(name = "date") LocalDate date, @PathVariable(name = "status") String status) {
        return repoReservatie.findByRetourDatumAndStatus(date, "Bezig");
    }

    @CrossOrigin
    @GetMapping(value = "/retourDatum={date}")
    public List<Reservatie> getReservatiesByRetourDatum(@PathVariable(name = "date") LocalDate date) {
        return repoReservatie.findByRetourDatum(date);
    }

    @CrossOrigin
    @GetMapping(value = "/status")
    public List<Reservatie> getReservatiesByStatus(@RequestParam List<String> status) {
        return repoReservatie.findByStatusIn(status);
    }
    @CrossOrigin
    @GetMapping(value = "/boekingDatum={date}")
    public List<Reservatie> getReservatieByBoekingDatum(@PathVariable(name = "date") LocalDate date) {
        return repoReservatie.findByBoekingDatum(date);
    }


    @CrossOrigin
    @GetMapping(value = "/in-orde")
    public int getAllInOrde(){
        Iterable<Reservatie> aantalInOrde = repoReservatie.findByStatus("in orde");
        int aantal = 0;
        for(Reservatie inOrde: aantalInOrde){
            aantal++;
        }
        return aantal;
    }

    @CrossOrigin
    @GetMapping(value = "/te-laat")
    public int getAllTeLaat(){
        Iterable<Reservatie> aantalTeLaat = repoReservatie.findByStatus("te laat");
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

        statusAantallen.add(new StatusAantalDTO("Te laat", repoReservatie.findByStatus("Te laat").size()));
        statusAantallen.add(new StatusAantalDTO("In orde", repoReservatie.findByStatus("In orde").size()));
        statusAantallen.add(new StatusAantalDTO("Bezig", repoReservatie.findByStatus("Bezig").size()));
        statusAantallen.add(new StatusAantalDTO("Voorboeking", repoReservatie.findByStatus("Voorboeking").size()));

        return statusAantallen;
    }
}
