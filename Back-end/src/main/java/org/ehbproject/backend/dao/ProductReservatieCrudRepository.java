package org.ehbproject.backend.dao;

import org.ehbproject.backend.modellen.ProductReservatie;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface  ProductReservatieCrudRepository extends CrudRepository<ProductReservatie, Integer> {
    public List<ProductReservatie> findByProduct_ProductID(int productID);
    public List<ProductReservatie> findByReservatie_ReservatieNr(int reservatieNr);
}

