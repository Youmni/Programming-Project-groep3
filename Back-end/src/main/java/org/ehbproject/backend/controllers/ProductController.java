package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.Reservatie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping(value = "/product")
public class ProductController {



        @Autowired
        ProductCrudRepository repo;

        @CrossOrigin
        @RequestMapping(method = RequestMethod.GET)
        public List<Product> getAllProducts(){
            ArrayList<Product> productMandje = new ArrayList<>();
            repo.findAll().forEach(productMandje::add);
            return productMandje;
        }

        @CrossOrigin
        @PutMapping("/{id}/status")
        public ResponseEntity<String> updateStatus(@PathVariable int id, @RequestParam String newStatus) {
            List<Product> reservaties = repo.findByProductID(id);
            String[] statussen = {"Beschikbaar", "Niet beschikbaar", "Gepauseerd"};

            if (!reservaties.isEmpty()) {
                boolean geldigeStatus = Arrays.asList(statussen).contains(newStatus);

                if (geldigeStatus) {
                    Product status = reservaties.getFirst();
                    status.setStatus(newStatus);
                    repo.save(status);
                    return ResponseEntity.ok("Status van het product met ID " + id + " is succesvol bijgewerkt naar " + newStatus);
                } else {
                    return ResponseEntity.badRequest().body("Ongeldige status: " + newStatus);
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservatie met ID " + id + " niet gevonden");
            }
        }
        @CrossOrigin
        @DeleteMapping("/delete/{id}")
        public ResponseEntity<String> deleteProduct(@PathVariable int id) {
            List<Product> product = repo.findByProductID(id);
            if (!product.isEmpty()) {

                repo.deleteById(id);
                return ResponseEntity.ok("Product met ID " + id + " is succesvol verwijderd");

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product met ID " + id + " niet gevonden");
            }
        }

        @CrossOrigin
        @GetMapping(value = "/id={id}")
        public List<Product> getAllProductenById(@PathVariable(name = "id") int id){
            return repo.findByProductID(id);
        }

        @CrossOrigin
        @GetMapping(value = "/naam={naam}")
        public List<Product> getAllProductenByNaam(@PathVariable(name = "naam") String naam) {
            return repo.findByProductNaamContainingIgnoreCase(naam);
        }

        @CrossOrigin
        @GetMapping("/status={status}")
        public List<Product> getAllProductenByStatus(@PathVariable(name = "status") String status) {
            return repo.findByStatusIgnoreCase(status);
        }

        @CrossOrigin
        @GetMapping(value = "/naam={naam}/status={status}")
        public List<Product> getAllProductenByNameAndStatus(@PathVariable(name = "naam") String naam,
                                                            @PathVariable(name = "status") String status) {

            return repo.findByProductNaamContainingIgnoreCaseAndStatusContainingIgnoreCase(naam, status);
        }

        @CrossOrigin
        @GetMapping(value = "/id={id}/status={status}")
        public List<Product> getAllProductenByIdAndStatus(@PathVariable(name = "id") int id,
                                                            @PathVariable(name = "status") String status) {

            return repo.findByProductIDAndStatusContainingIgnoreCase(id, status);
        }

    }

