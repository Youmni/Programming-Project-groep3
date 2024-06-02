package org.ehbproject.backend.controllers;


import org.ehbproject.backend.dao.ProductReservatieCrudRepository;
import org.ehbproject.backend.modellen.ProductReservatie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/product-reservatie")
public class ProductReservatieController {

    @Autowired
    ProductReservatieCrudRepository productReservatieRepo;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public List<ProductReservatie> getAllProductReservaties() {
        ArrayList<ProductReservatie> productReservatieMandje = new ArrayList<>();
        productReservatieRepo.findAll().forEach(productReservatieMandje::add);
        return productReservatieMandje;
    }

    @CrossOrigin
    @GetMapping(value = "/producten/id={id}")
    public List<ProductReservatie> getAllProductenById(@PathVariable(name = "id") int id) {
        return productReservatieRepo.findByProduct_ProductId(id);
    }

    @CrossOrigin
    @GetMapping(value = "/reservaties/id={id}")
    public List<ProductReservatie> getAllReservatiesById(@PathVariable(name = "id") int id) {
        return productReservatieRepo.findByReservatie_ReservatieNr(id);
    }
}
