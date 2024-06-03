package org.ehbproject.backend.modellen;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@Table(name = "PRODUCTEN")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="Productid" )
    private int productId;

    @ManyToOne
    @JoinColumn(name = "Productmodelnr", nullable = false)
    private ProductModel productModel;

    @Column(name="Productnaam", nullable = false)
    @NotBlank
    @Size(max = 50)
    private String productNaam;

    @Column(name="Status", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String status;

    @Column(name = "ISBESCHADIGT")
    @Size(max = 40)
    private String isBeschadigt;


    @ManyToMany(mappedBy = "producten")
    private List<Reservatie> reservaties;


    public Product(ProductModel productModel, String productNaam, String status) {
        this.productModel = productModel;
        this.productNaam = productNaam;
        this.status = status;
    }

    protected Product() {}



    public int getProductID() {
        return productId;
    }

    public void setProductID(int productID) {
        this.productId = productID;
    }

    public ProductModel getProductModelNr() {
        return productModel;
    }

    public void setProductModelNr(ProductModel productModel) {
        this.productModel = productModel;
    }

    public String getProductNaam() {
        return productNaam;
    }

    public void setProductNaam(String productNaam) {
        this.productNaam = productNaam;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIsBeschadigt() {
        return isBeschadigt;
    }

    public void setIsBeschadigt(String isBeschadigt) {
        this.isBeschadigt = isBeschadigt;
    }
}
