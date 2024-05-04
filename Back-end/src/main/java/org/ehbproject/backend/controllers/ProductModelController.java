package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ProductModelCrudRepository;
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
@RequestMapping(value = "/productmodel")
public class ProductModelController {

    @Autowired
    ProductModelCrudRepository repoModellen;
    ProductCrudRepository repoProducten;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<ProductModel> getAllProductModellen() {
        List<ProductModel> productModelMandje = new ArrayList<>();
        repoModellen.findAll().forEach(productModelMandje::add);
        return productModelMandje;
    }

    @CrossOrigin
    @PutMapping("/{id}/beschrijving")
    public ResponseEntity<String> updateBeschrijving(@PathVariable int id, @RequestParam String beschrijving) {
        List<ProductModel> productmodel = repoModellen.findByProductModelNr(id);

        if (!productmodel.isEmpty()) {
                ProductModel productModel = productmodel.getFirst();
                productModel.setProductModelBeschrijving(beschrijving);
                repoModellen.save(productModel);
                return ResponseEntity.ok("Beschrijving van het productModel met ID " + id + " is succesvol bijgewerkt naar " + beschrijving);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProductModel met ID " + id + " niet gevonden");
        }
    }


    //  Moet nog getest worden wanneer we nieuwe productModellen kunnen toevoegen!!
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        List<ProductModel> productModel = repoModellen.findByProductModelNr(id);
        if (!productModel.isEmpty()) {
            List<Product> productenResterend = repoProducten.findByProductID(id);
            if (productenResterend.isEmpty()) {
                repoModellen.deleteById(id);
                return ResponseEntity.ok("ProductModel met ID " + id + " is succesvol verwijderd");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Kan ProductModel met ID " + id + " niet verwijderen omdat er nog producten aan zijn gekoppeld");
            }

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProductModel met ID " + id + " niet gevonden");
        }
    }
    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<ProductModel> getAllProductenById(@PathVariable(name = "id") int id) {
        return repoModellen.findByProductModelNr(id);
    }

    @CrossOrigin
    @GetMapping(value = "/naam={naam}")
    public List<ProductModel> getAllProductenByNaam(@PathVariable(name = "naam") String naam) {
        return repoModellen.findByProductModelNaamContainingIgnoreCase(naam);
    }

    @CrossOrigin
    @GetMapping("/merk={merk}")
    public List<ProductModel> getAllProductenByMerk(@PathVariable(name = "merk") String merk) {
        return repoModellen.findByProductModelMerkContainingIgnoreCase(merk);
    }
}
