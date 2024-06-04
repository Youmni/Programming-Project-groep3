package org.ehbproject.backend.dao;

import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.ProductModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface ProductCrudRepository extends CrudRepository<Product, Integer> {

    public List<Product> findByProductId(int productId);
    public Set<Product> findProductByProductId(int productID);
    public List<Product> findByProductNaamContainingIgnoreCase(String productNaam);
    public List<Product> findByStatusIgnoreCase(String status);
    public List<Product> findProductsByStatusIn(List<String> status);
    public List<Product> findProductsByProductModelAndStatusIn(ProductModel model, List<String> statussen);
    public List<Product> findByProductNaamContainingIgnoreCaseAndStatusContainingIgnoreCase (String naam, String status);
    public List<Product> findByProductIdAndStatusContainingIgnoreCase (int id, String status);
    public List<Product> findByProductModel (ProductModel productModel);
}
