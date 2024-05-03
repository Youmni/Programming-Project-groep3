package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.Reservatie;
import org.ehbproject.backend.dto.ReservatieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/reservatie")
public class ReservatieController {


    @Autowired
    ReservatieCrudRepository repoReservatie;
    GebruikerCrudRepository repoGebruiker;

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
            Gebruiker gebruiker = (Gebruiker) repoGebruiker.findByGebruikerID(reservatieDTO.getGebruikerId());

            if (gebruiker == null) {
                throw new RuntimeException("Gebruiker met ID " + reservatieDTO.getGebruikerId() + " niet gevonden.");
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

            return ResponseEntity.status(HttpStatus.CREATED).body("Reservatie succesvol toegevoegd");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fout bij toevoegen van reservatie: " + e.getMessage());
        }
    }
    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<Reservatie> getAllProductenByReservatieId(@PathVariable(name = "id") int id) {
        return repoReservatie.findByReservatieNr(id);
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikerId={id}")
    public List<Reservatie> getAllReservatiesByGebruikerId(@PathVariable(name = "id") Gebruiker gebruiker) {
        return repoReservatie.findByGebruiker(gebruiker);
    }

    @CrossOrigin
    @GetMapping(value = "/afhaaldatum={date}")
    public List<Reservatie> getAllProductenByAfhaalDatum(@PathVariable(name = "date") LocalDate date) {
        return repoReservatie.findByAfhaalDatum(date);
    }

    @CrossOrigin
    @GetMapping(value = "/retourDatum={date}")
    public List<Reservatie> getAllReservatiesByRetourDatum(@PathVariable(name = "date") LocalDate date) {
        return repoReservatie.findByRetourDatum(date);
    }

    @CrossOrigin
    @GetMapping(value = "/boekingDatum={date}")
    public List<Reservatie> getAllReservatieByBoekingDatum(@PathVariable(name = "date") LocalDate date) {
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

}
