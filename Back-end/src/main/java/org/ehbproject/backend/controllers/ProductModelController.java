package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.CategorieCrudRepository;
import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ProductModelCrudRepository;
import org.ehbproject.backend.dto.ProductModelDTO;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/productmodel")
public class ProductModelController {

    @Autowired
    ProductModelCrudRepository repoModellen;
    @Autowired
    ProductCrudRepository repoProducten;
    @Autowired
    CategorieCrudRepository repoCategorie;

    private static final Logger logger = LoggerFactory.getLogger(ReservatieController.class);

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<ProductModel> getAllProductModellen() {
        List<ProductModel> productModelMandje = new ArrayList<>();
        repoModellen.findAll().forEach(productModelMandje::add);
        return productModelMandje;
    }

    @CrossOrigin
    @PostMapping(value="/toevoegen")
    public ResponseEntity<String> addProductModel(@RequestBody ProductModelDTO productModelDTO) {
        try {
            List<Categorie> categories = repoCategorie.findByCategorieNr(productModelDTO.getCategorieNr());

            if (categories.isEmpty()) {
                throw new RuntimeException("Categorie met nummer " + productModelDTO.getCategorieNr() + " niet gevonden.");
            }

            Categorie categorie = categories.getFirst();

            ProductModel productModel = new ProductModel(
                    categorie,
                    productModelDTO.getProductModelNaam(),
                    productModelDTO.getProductModelMerk(),
                    productModelDTO.getProductModelFoto(),
                    productModelDTO.getProductModelBeschrijving()
            );
            repoModellen.save(productModel);

            return ResponseEntity.status(HttpStatus.CREATED).body("ProductModel succesvol toegevoegd");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fout bij toevoegen van productModel: " + e.getMessage());
        }
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
    @PutMapping("/{id}/wijzig")
    public ResponseEntity<String> updateProductModel(@PathVariable int id, @RequestBody ProductModelDTO modelDTO) {

        try {
            List<ProductModel> productmodel = repoModellen.findByProductModelNr(id);
            List<Categorie> categorie = repoCategorie.findByCategorieNr(modelDTO.getCategorieNr());

            if (productmodel.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(id + " niet gevonden van het productmodel");
            }
            if (categorie.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(id + " niet gevonden van de categorie");
            }

            Categorie categorieObject = categorie.getFirst();

            ProductModel productModel = productmodel.getFirst();
            productModel.setProductModelBeschrijving(modelDTO.getProductModelBeschrijving());
            productModel.setCategorie(categorieObject);
            productModel.setProductModelFoto(modelDTO.getProductModelFoto());
            productModel.setProductModelMerk(modelDTO.getProductModelMerk());
            productModel.setProductModelNaam(modelDTO.getProductModelNaam());

            repoModellen.save(productModel);
            return ResponseEntity.ok("Product model succesvol geupdate");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Er is iets mis gegaan bij het opslaan: "+e.getMessage());
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
    public List<ProductModel> getAllProductModellenById(@PathVariable(name = "id") int id) {
        return repoModellen.findByProductModelNr(id);
    }

    @CrossOrigin
    @GetMapping(value = "/naam={naam}")
    public List<ProductModel> getAllProductModellenByNaam(@PathVariable(name = "naam") String naam) {
        return repoModellen.findByProductModelNaamContainingIgnoreCase(naam);
    }

    @CrossOrigin
    @GetMapping(value = "/product/status={status}")
    public List<ProductModel> getAllProductModellenByStatusOfProduct(@PathVariable(name = "status") String status) {
        List<Product> producten = repoProducten.findByStatusIgnoreCase(status);
        Set<ProductModel> productModels = new HashSet<>();

        for(Product product: producten){
            productModels.add(product.getProductModelNr());
        }

        return new ArrayList<>(productModels);
    }

    @CrossOrigin
    @GetMapping("/merk={merk}")
    public List<ProductModel> getAllProductModellenByMerk(@PathVariable(name = "merk") String merk) {
        return repoModellen.findByProductModelMerkContainingIgnoreCase(merk);
    }
    @CrossOrigin
    @GetMapping("/categorienr={categorienr}")
    public List<ProductModel> getAllProductModellenByCategorie(@PathVariable(name = "categorienr") int categorieNr) {
        List<Categorie> categorie = repoCategorie.findByCategorieNr(categorieNr);
        if (categorie.isEmpty()){
            return new ArrayList<>(0);
        }
        Categorie categorieObject = categorie.getFirst();

        return repoModellen.findByCategorie(categorieObject);
    }
}
