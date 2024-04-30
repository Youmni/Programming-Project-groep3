package org.ehbproject.backend.dao;

import org.ehbproject.backend.modellen.Categorie;
import org.ehbproject.backend.modellen.ProductModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductModelCrudRepository extends CrudRepository<ProductModel, Integer> {
    public List<ProductModel> findByProductModelNr(int productModelNr);
    public List<ProductModel> findByProductModelNaamContainingIgnoreCase(String productModelNaam);
    public List<ProductModel> findByProductModelMerkContainingIgnoreCase(String productModelMerk);
    public List<ProductModel> findByCategorie(Categorie categorie);
}
