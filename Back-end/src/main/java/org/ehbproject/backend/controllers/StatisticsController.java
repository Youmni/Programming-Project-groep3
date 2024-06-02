package org.ehbproject.backend.controllers;

import org.ehbproject.backend.dao.CategorieCrudRepository;
import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.dto.StatisticsDTO;
import org.ehbproject.backend.dto.StatusAantalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/statistics")
public class StatisticsController {
    @Autowired
    CategorieCrudRepository categorieRepo;
    @Autowired
    ProductCrudRepository productRepo;
    @Autowired
    ReservatieCrudRepository reservatieRepo;
    @Autowired
    GebruikerCrudRepository gebruikerRepo;


    @CrossOrigin
    @GetMapping("/statistics-aantallen")
    public List<StatisticsDTO> getAmountOfStatisticsByKlasse() {
        List<StatisticsDTO> klasseAantallen = new ArrayList<>();

        klasseAantallen.add(new StatisticsDTO("Producten", (int) productRepo.count()));
        klasseAantallen.add(new StatisticsDTO("Categorieën", (int) categorieRepo.count()));
        klasseAantallen.add(new StatisticsDTO("Reservaties", (int) reservatieRepo.count()));
        klasseAantallen.add(new StatisticsDTO("Gebruikers", (int) gebruikerRepo.count()));

        return klasseAantallen;
    }
}