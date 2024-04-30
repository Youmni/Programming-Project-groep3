package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.ProductModelCrudRepository;
import org.ehbproject.backend.modellen.ProductModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/productmodel")
public class ProductModelController {

    @Autowired
    ProductModelCrudRepository repo;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<ProductModel> getAllProductModellen() {
        List<ProductModel> productModelMandje = new ArrayList<>();
        repo.findAll().forEach(productModelMandje::add);
        return productModelMandje;
    }

    @CrossOrigin
    @GetMapping(value = "/id={id}")
    public List<ProductModel> getAllProductenById(@PathVariable(name = "id") int id) {
        return repo.findByProductModelNr(id);
    }

    @CrossOrigin
    @GetMapping(value = "/naam={naam}")
    public List<ProductModel> getAllProductenByNaam(@PathVariable(name = "naam") String naam) {
        return repo.findByProductModelNaamContainingIgnoreCase(naam);
    }

    @CrossOrigin
    @GetMapping("/merk={merk}")
    public List<ProductModel> getAllProductenByMerk(@PathVariable(name = "merk") String merk) {
        return repo.findByProductModelMerkContainingIgnoreCase(merk);
    }
}
