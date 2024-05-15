package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Categorie;
import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.Reservatie;
import org.ehbproject.backend.services.emailservice.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/gebruiker")
public class GebruikerController {


    @Autowired
    GebruikerCrudRepository repo;
    @Autowired
    ReservatieCrudRepository reservatierepo;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Gebruiker> getAllGebruikers(){
        ArrayList<Gebruiker> gebruikerMandje = new ArrayList<>();
        repo.findAll().forEach(gebruikerMandje::add);
        return gebruikerMandje;
    }

    @CrossOrigin
    @PostMapping("/toevoegen")
    public ResponseEntity<String> toevoegenGebruiker(@Validated @RequestBody Gebruiker gebruiker) {
        try {
            repo.save(gebruiker);
            return ResponseEntity.status(HttpStatus.CREATED).body("Gebruiker succesvol toegevoegd");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Er is een fout opgetreden bij het toevoegen van de gebruiker: " + e.getMessage());
        }
    }
    @CrossOrigin
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteGebruiker(@PathVariable int id) {
        List<Gebruiker> gebruiker = repo.findByGebruikerID(id);
        if (!gebruiker.isEmpty()) {
            repo.deleteById(id);
            return ResponseEntity.ok("Gebruiker met ID " + id + " is succesvol verwijderd");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gebruiker met ID " + id + " niet gevonden");
        }
    }

    @CrossOrigin
    @GetMapping(value = "/email={email}")
    public List<Gebruiker> getAllGebruikersByEmail(@PathVariable(name = "email") String email){

        return repo.findByEmailContainingIgnoreCase(email);
    }

    @CrossOrigin
    @GetMapping(value = "/studentaantal")
    public int getAllStudententenNumber(){
        Iterable<Gebruiker> aantalStudenten = repo.findByTitel("student");
        int aantal = 0;
        for(Gebruiker student: aantalStudenten){
            aantal++;
        }
        return aantal;
    }

    @CrossOrigin
    @GetMapping(value = "/docentaantal")
    public int getAllDocentenNumber(){
        Iterable<Gebruiker> aantalDocenten = repo.findByTitel("docent");
        int aantal = 0;
        for(Gebruiker docent: aantalDocenten){
            aantal++;
        }
        return aantal;
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikersaantal")
    public int getAllGebruikersNumber(){
        Iterable<Gebruiker> aantalGebruikers = repo.findAll();
        int aantal = 0;
        for(Gebruiker gebruik: aantalGebruikers){
            aantal++;
        }
        return aantal;
    }

    @CrossOrigin
    @GetMapping(value = "/voornaam={voornaam}")
    public List<Gebruiker> getAllGebruikersByVoornaam(@PathVariable(name = "voornaam") String voornaam){

        return repo.findByEmailContainingIgnoreCase(voornaam);
    }

    @CrossOrigin
    @GetMapping(value = "/achternaam={achternaam}")
    public List<Gebruiker> getAllGebruikersByAchternaam(@PathVariable(name = "achternaam") String achternaam){

        return repo.findByEmailContainingIgnoreCase(achternaam);
    }

    @CrossOrigin
    @GetMapping(value = "/naam={naam}")
    public List<Gebruiker> getAllGebruikersByName(@PathVariable(name = "naam") String naam){

        return repo.findByEmail(naam);
    }

    @CrossOrigin
    @GetMapping(value = "/titel={titel}")
    public List<Gebruiker> getAllGebruikersByTitel(@PathVariable(name = "titel") String titel){

        return repo.findByTitel(titel);
    }

    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<Gebruiker> getAllGebruikersById(@PathVariable(name = "id") int id){

        return repo.findByGebruikerID(id);
    }

}
