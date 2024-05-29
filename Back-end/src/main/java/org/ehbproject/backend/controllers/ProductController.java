package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.CategorieCrudRepository;
import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ProductModelCrudRepository;
import org.ehbproject.backend.dto.ProductDTO;
import org.ehbproject.backend.modellen.Categorie;
import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.ProductModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

        @Autowired
        ProductModelCrudRepository repoModel;

        @Autowired
        CategorieCrudRepository repoCategorie;

    private static final Logger logger = LoggerFactory.getLogger(ReservatieController.class);

        @CrossOrigin
        @RequestMapping(method = RequestMethod.GET)
        public List<Product> getAllProducts(){
            ArrayList<Product> productMandje = new ArrayList<>();
            repo.findAll().forEach(productMandje::add);
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
            String productnaam = productDTO.getProductNaam();

//            List<ProductModel> productModellen = repoModel.findByProductModelNr(productModel.getProductModelNr());

            List<Product> products = new ArrayList<>(repo.findByProductModel(productModel));
            int aantalProducten = 0;
            for(Product product : products){
                aantalProducten++;
            }

            System.out.println(aantalProducten);
            aantalProducten+=1;

            String productNaamNummerString = String.valueOf(aantalProducten);


            Product product = new Product(
                    productModel,
                    productnaam + " (#" + productNaamNummerString + ")",
                    productDTO.getStatus()
            );


           repo.save(product);

            return ResponseEntity.status(HttpStatus.CREATED).body("Product succesvol toegevoegd");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fout bij toevoegen van product: " + e.getMessage());
        }
    }
        @CrossOrigin
        @PutMapping("/{id}/bewerk-status")
        public ResponseEntity<String> updateStatus(@PathVariable int id, @RequestParam String newStatus) {
            List<Product> reservaties = repo.findByProductID(id);
            String[] statussen = {"Beschikbaar", "Gereserveerd", "Gepauzeerd"};

            if (!reservaties.isEmpty()) {
                boolean geldigeStatus = Arrays.asList(statussen).contains(newStatus);
                logger.info("status"+ Arrays.toString(statussen));
                logger.info("new status"+ newStatus);
                if (geldigeStatus) {
                    Product status = reservaties.getFirst();
                    status.setStatus(newStatus);
                    repo.save(status);
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
        List<Product> reservaties = repo.findByProductID(id);
        String[] statussen = {"Beschikbaar", "Gereserveerd", "Gepauzeerd"};

        if (!reservaties.isEmpty()) {
            boolean geldigeStatus = Arrays.asList(statussen).contains(newStatus);

            if (geldigeStatus) {
                Product status = reservaties.getFirst();
                status.setStatus(newStatus);
                status.setProductNaam(newNaam);
                repo.save(status);
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
        List<Product> reservaties = repo.findByProductID(id);

        if (!reservaties.isEmpty()) {

            Product status = reservaties.getFirst();
                status.setProductNaam(newNaam);
                repo.save(status);
                return ResponseEntity.ok("Naam van het product met ID " + id + " is succesvol bijgewerkt naar '" + newNaam+"'");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product met ID " + id + " niet gevonden");
        }
    }
        @CrossOrigin
        @DeleteMapping("/{id}/delete")
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
        @GetMapping("/status")
        public List<Product> getAllProductenByStatussen(@RequestParam List<String> status) {
            return repo.findProductsByStatusIn(status);
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

    @CrossOrigin
    @GetMapping("/categorienr={categorienr}")
    public List<Product> getAllProductenByCategorie(@PathVariable(name = "categorienr") Categorie categorieNr) {
        List<ProductModel> productModellen = repoModel.findByCategorie(categorieNr);

        List<Product> products = new ArrayList<>();
        for (ProductModel productModel : productModellen) {
            products.addAll(repo.findByProductModel(productModel));
        }

        return products;
    }

    @CrossOrigin
    @GetMapping("/model={model}")
    public List<Product> getAllProductenByModel(@PathVariable(name = "model") int model) {
        List<ProductModel> productModellen = repoModel.findByProductModelNr(model);

        List<Product> products = new ArrayList<>();
        for (ProductModel productModel : productModellen) {
            products.addAll(repo.findByProductModel(productModel));
        }

        return products;
    }

    @CrossOrigin
    @GetMapping("/model={model}/status")
    public List<Product> getAllProductenByModelAndStatus(@PathVariable(name = "model") int model, @RequestParam List<String> statussen) {
        List<ProductModel> productModellen = repoModel.findByProductModelNr(model);

        List<Product> products = new ArrayList<>();
        for (ProductModel productModel : productModellen) {
            products.addAll(repo.findProductsByProductModelAndStatusIn(productModel, statussen));
        }

        return products;
    }

    @CrossOrigin
    @GetMapping("/statusaantal={status}")
    public int getAmountOfProductsByStatus(@PathVariable(name = "status") String status){
        List<Product> products = new ArrayList<>(repo.findByStatusIgnoreCase(status));
        int aantalProducten = 0;
        for(Product product : products){
            aantalProducten++;
        }
        System.out.println(aantalProducten);
        return aantalProducten;
    }
    }



