package org.ehbproject.backend.controllers;


import org.ehbproject.backend.config.JwtUtil;
import org.ehbproject.backend.dto.TitelDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.dto.AuthRequestDTO;
import org.ehbproject.backend.modellen.Gebruiker;
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
    @Autowired
    private JwtUtil jwtUtil;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Gebruiker> getAllGebruikers(){
        ArrayList<Gebruiker> gebruikerMandje = new ArrayList<>();
        repo.findAll().forEach(gebruikerMandje::add);
        return gebruikerMandje;
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> createAuthenticationToken(@RequestBody AuthRequestDTO authRequest) {
        try {
            List<Gebruiker> gebruikerOpt = repo.findByEmail(authRequest.getEmail());
            if (gebruikerOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User does not exist");
            }
            Gebruiker gebruikerObject = gebruikerOpt.getFirst();
            if(passwordEncoder.matches(authRequest.getWachtwoord(), gebruikerObject.getWachtwoord())){
                int gebruikerID = gebruikerObject.getGebruikerID();
                final String jwt = jwtUtil.generateToken(gebruikerID);
                return ResponseEntity.ok(jwt);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("An error occurred: " + e.getMessage());
        }
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
    @GetMapping(value = "/titel/id={id}")
    public ResponseEntity<TitelDTO> getGebruikerTitelById(@PathVariable(name = "id") int id){
        List<Gebruiker> gebruiker = repo.findByGebruikerID(id);
        Gebruiker gebruikerObject = gebruiker.getFirst();
        if (!gebruiker.isEmpty()) {
            TitelDTO titelDTO = new TitelDTO(gebruikerObject.getTitel());
            return ResponseEntity.ok(titelDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<Gebruiker> getAllGebruikersById(@PathVariable(name = "id") int id){

        return repo.findByGebruikerID(id);
    }

}
