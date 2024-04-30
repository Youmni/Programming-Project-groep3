package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.modellen.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

