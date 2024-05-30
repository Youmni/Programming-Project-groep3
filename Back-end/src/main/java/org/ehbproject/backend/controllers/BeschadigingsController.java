package org.ehbproject.backend.controllers;

import org.ehbproject.backend.dao.BeschadigingCrudRepository;
import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dto.BeschadigingDTO;
import org.ehbproject.backend.modellen.Beschadiging;
import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/beschadiging")
public class BeschadigingsController {

    @Autowired
    BeschadigingCrudRepository beschadigingrepo;

    @Autowired
    GebruikerCrudRepository gebruikerrepo;

    @Autowired
    ProductCrudRepository productrepo;

    @CrossOrigin
    @PostMapping (value = "/toevoegen")
    public ResponseEntity<String> addBeschadiging (@Validated @RequestBody BeschadigingDTO beschadigingDTO){
        try {
            System.out.println("Inkomende BeschadigingDTO: " + beschadigingDTO.getGebruikerId() + beschadigingDTO.getProductId() + beschadigingDTO.getBeschrijving() + beschadigingDTO.getBeschadigingsDatum());
            List<Gebruiker> gebruikers = gebruikerrepo.findByGebruikerID(beschadigingDTO.getGebruikerId());
            if (gebruikers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(beschadigingDTO.getGebruikerId() + " niet gevonden.");

            }
            Gebruiker gebruiker = gebruikers.getFirst();
            List<Product> producten = productrepo.findByProductID(beschadigingDTO.getProductId());
            if (producten.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(beschadigingDTO.getProductId() + " niet gevonden.");
            }
            Product product= producten.getFirst();

            Beschadiging beschadiging = new Beschadiging(
                    gebruiker,
                    product,
                    beschadigingDTO.getBeschrijving(),
                    beschadigingDTO.getBeschadigingsDatum(),
                    beschadigingDTO.getBeschadigingFoto()
            );
            beschadigingrepo.save(beschadiging);

            product.setIsBeschadigt("True");
            productrepo.save(product);

            return ResponseEntity.status(HttpStatus.CREATED).body("Beschadiging successvol toegevoegd " + beschadiging);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fout bij het toevoegen van een beschadiging " + e.getMessage());
        }
    }


    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<Beschadiging> getAllBeschadigingen(){
        ArrayList<Beschadiging> beschadigingen = new ArrayList<>();
        beschadigingrepo.findAll().forEach(beschadigingen::add);
       return beschadigingen;
    }

    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<Beschadiging> getBeschadigingByBeschadigingId (@PathVariable(name = "id") int id){
        return beschadigingrepo.findBeschadigingByBeschadigingId(id);
    }

    @CrossOrigin
    @GetMapping(value = "/gebruikerid={gebruikerid}")
    public List<Beschadiging> getBeschadigingByGebruikerId (@PathVariable(name = "gebruikerid") Gebruiker gebruikerid){
        return beschadigingrepo.findByGebruiker(gebruikerid);
    }

    @CrossOrigin
    @GetMapping(value = "/productid={productid}")
    public List<Beschadiging> getBeschadigingByProductId (@PathVariable(name = "productid") Product productid){
        return beschadigingrepo.findByProduct(productid);
    }

    @CrossOrigin
    @GetMapping(value = "/beschadigingsdatum={beschadigingsdatum}")
    public List<Beschadiging> getBeschadigingByBeschadigingsDatum (@PathVariable(name = "beschadigingsdatum")LocalDate beschadigingsdatum){
        return beschadigingrepo.findBeschadigingByBeschadigingsdatum(beschadigingsdatum);
    }


}
