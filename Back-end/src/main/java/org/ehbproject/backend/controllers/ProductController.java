package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.CategorieCrudRepository;
import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ProductModelCrudRepository;
import org.ehbproject.backend.dto.ProductDTO;
import org.ehbproject.backend.modellen.Categorie;
import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.ProductModel;
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
        ProductCrudRepository repoProduct;
        @Autowired
        ProductModelCrudRepository repoModel;
        @Autowired
        CategorieCrudRepository repoCategorie;
        @CrossOrigin
        @RequestMapping(method = RequestMethod.GET)
        public List<Product> getAllProducts(){
            ArrayList<Product> productMandje = new ArrayList<>();
            repoProduct.findAll().forEach(productMandje::add);
            return productMandje;
        }

    @CrossOrigin
    @PostMapping(value="/toevoegen")
    public ResponseEntity<String> addProduct(@RequestBody ProductDTO productDTO) {
        try {
            List <ProductModel> productModelen = repoModel.findByProductModelNr(productDTO.getProductModelNr());

            if (productModelen.isEmpty()) {
                throw new RuntimeException("ProductModel met nummer " + productDTO.getProductModelNr() + " niet gevonden.");
            }
            ProductModel productModel = productModelen.getFirst();
            Product product = new Product(
                    productModel,
                    productDTO.getProductNaam(),
                    productDTO.getStatus()
            );


            repoProduct.save(product);

            return ResponseEntity.status(HttpStatus.CREATED).body("Product succesvol toegevoegd");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fout bij toevoegen van product: " + e.getMessage());
        }
    }
        @CrossOrigin
        @PutMapping("/{id}/bewerk-status")
        public ResponseEntity<String> updateStatus(@PathVariable int id, @RequestParam String newStatus) {
            List<Product> reservaties = repoProduct.findByProductID(id);
            String[] statussen = {"Beschikbaar", "Niet beschikbaar", "Gepauseerd"};

            if (!reservaties.isEmpty()) {
                boolean geldigeStatus = Arrays.asList(statussen).contains(newStatus);

                if (geldigeStatus) {
                    Product status = reservaties.getFirst();
                    status.setStatus(newStatus);
                    repoProduct.save(status);
                    return ResponseEntity.ok("Status van het product met ID " + id + " is succesvol bijgewerkt naar '" + newStatus+"'");
                } else {
                    return ResponseEntity.badRequest().body("Ongeldige status: " + newStatus);
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product met ID " + id + " niet gevonden");
            }
        }

    @CrossOrigin
    @PutMapping("/{id}/bewerk-naam-status")
    public ResponseEntity<String> updateNaamAndStatus(@PathVariable int id, @RequestParam String newNaam, @RequestParam String newStatus) {
        List<Product> reservaties = repoProduct.findByProductID(id);
        String[] statussen = {"Beschikbaar", "Niet beschikbaar", "Gepauseerd"};

        if (!reservaties.isEmpty()) {
            boolean geldigeStatus = Arrays.asList(statussen).contains(newStatus);

            if (geldigeStatus) {
                Product status = reservaties.getFirst();
                status.setStatus(newStatus);
                status.setProductNaam(newNaam);
                repoProduct.save(status);
                return ResponseEntity.ok("Status en naam van het product met ID " + id + " is succesvol bijgewerkt naar '" + newNaam+"'" + " & '"+newStatus+"'");
            } else {
                return ResponseEntity.badRequest().body("Ongeldige status: " + newStatus);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product met ID " + id + " niet gevonden");
        }
    }

    @CrossOrigin
    @PutMapping("/{id}/bewerk-naam")
    public ResponseEntity<String> updateNaam(@PathVariable int id, @RequestParam String newNaam) {
        List<Product> reservaties = repoProduct.findByProductID(id);

        if (!reservaties.isEmpty()) {

            Product status = reservaties.getFirst();
                status.setProductNaam(newNaam);
            repoProduct.save(status);
                return ResponseEntity.ok("Naam van het product met ID " + id + " is succesvol bijgewerkt naar '" + newNaam+"'");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product met ID " + id + " niet gevonden");
        }
    }
        @CrossOrigin
        @DeleteMapping("/{id}/delete")
        public ResponseEntity<String> deleteProduct(@PathVariable int id) {
            List<Product> product = repoProduct.findByProductID(id);
            if (!product.isEmpty()) {

                repoProduct.deleteById(id);
                return ResponseEntity.ok("Product met ID " + id + " is succesvol verwijderd");

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product met ID " + id + " niet gevonden");
            }
        }

        @CrossOrigin
        @GetMapping(value = "/id={id}")
        public List<Product> getAllProductenById(@PathVariable(name = "id") int id){
            return repoProduct.findByProductID(id);
        }

        @CrossOrigin
        @GetMapping(value = "/naam={naam}")
        public List<Product> getAllProductenByNaam(@PathVariable(name = "naam") String naam) {
            return repoProduct.findByProductNaamContainingIgnoreCase(naam);
        }

        @CrossOrigin
        @GetMapping("/status={status}")
        public List<Product> getAllProductenByStatus(@PathVariable(name = "status") String status) {
            return repoProduct.findByStatusIgnoreCase(status);
        }

        @CrossOrigin
        @GetMapping(value = "/naam={naam}/status={status}")
        public List<Product> getAllProductenByNameAndStatus(@PathVariable(name = "naam") String naam,
                                                            @PathVariable(name = "status") String status) {

            return repoProduct.findByProductNaamContainingIgnoreCaseAndStatusContainingIgnoreCase(naam, status);
        }

        @CrossOrigin
        @GetMapping(value = "/id={id}/status={status}")
        public List<Product> getAllProductenByIdAndStatus(@PathVariable(name = "id") int id,
                                                            @PathVariable(name = "status") String status) {

            return repoProduct.findByProductIDAndStatusContainingIgnoreCase(id, status);
        }

    @CrossOrigin
    @GetMapping(value = "/categorienr={id}")
    public List<Product> getAllProductenByCategorieNr(@PathVariable(name = "id") int id) {
        List<Categorie> categories = repoCategorie.findByCategorieNr(id);
        if(categories.isEmpty()){
            return new ArrayList<>(0);
        }
        Categorie categorie = categories.getFirst();

        List<ProductModel> productModellen = repoModel.findByCategorie(categorie);
        List<Product> products = new ArrayList<>();

        for(ProductModel productmodel : productModellen){
            products.addAll(repoProduct.findByProductModel(productmodel));
        }
        return products;
    }
    }

