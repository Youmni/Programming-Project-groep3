package org.ehbproject.backend.controllers;

import org.ehbproject.backend.dao.CategorieCrudRepository;
import org.ehbproject.backend.modellen.Categorie;
import org.ehbproject.backend.modellen.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/categorie")
public class CategorieController {

    @Autowired
    CategorieCrudRepository repo;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Categorie> getAllCategories(){
        ArrayList<Categorie> categorieMandje = new ArrayList<>();
        repo.findAll().forEach(categorieMandje::add);
        return categorieMandje;
    }
    
    @CrossOrigin
    @PostMapping("/toevoegen")
    public ResponseEntity<String> toevoegenCategorie(@RequestBody Categorie categorie) {
        try {
            repo.save(categorie);
            return ResponseEntity.status(HttpStatus.CREATED).body("Categorie succesvol toegevoegd");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Er is een fout opgetreden bij het toevoegen van de categorie: " + e.getMessage());
        }
    }
    @CrossOrigin
    @DeleteMapping("/id={id}/delete")
    public ResponseEntity<String> deleteCategorie(@PathVariable int id) {
        List<Categorie> categorie = repo.findByCategorieNr(id);
        if (!categorie.isEmpty()) {

            repo.deleteById(id);
            return ResponseEntity.ok("Categorie met ID " + id + " is succesvol verwijderd");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categorie met ID " + id + " niet gevonden");
        }
    }


    @CrossOrigin
    @GetMapping(value = "/name={name}")
    public List<Categorie> getAllCategoriesByName(@PathVariable(name = "name") String name){

        return repo.findByCategorieNaam(name);
    }

    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<Categorie> getAllCategoriesById(@PathVariable(name = "id") int id){

        return repo.findByCategorieNr(id);
    }
}