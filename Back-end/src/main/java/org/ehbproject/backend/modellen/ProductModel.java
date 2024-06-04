package org.ehbproject.backend.modellen;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "PRODUCTMODELLEN")
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="Productmodelnr")
    private int productModelNr;

    @ManyToOne
    @JoinColumn(name = "Categorienr", nullable = false)
    private Categorie categorie;

    @Column(name="Productmodelnaam", nullable = false)
    @NotBlank
    @Size(max = 30)
    private String productModelNaam;

    @Column(name="Productmodelmerk", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String productModelMerk;

    @Column(name="Productmodelfoto", nullable = false)
    private String productModelFoto;

    @Column(name="Productmodelbeschrijving", nullable = false)
    @NotBlank
    @Size(max = 100)
    private String productModelBeschrijving;

    @OneToMany(mappedBy = "productModel")
    private Set<Product> producten = new HashSet<>();

    public ProductModel(Categorie categorie, String productModelNaam, String productModelMerk, String productModelFoto, String productModelBeschrijving) {
        this.categorie = categorie;
        this.productModelNaam = productModelNaam;
        this.productModelMerk = productModelMerk;
        this.productModelFoto = productModelFoto;
        this.productModelBeschrijving = productModelBeschrijving;
    }

    protected ProductModel(){};


    public int getProductModelNr() {
        return productModelNr;
    }

    public void setProductModelNr(int productModelNr) {
        this.productModelNr = productModelNr;
    }

    public String getProductModelNaam() {
        return productModelNaam;
    }

    public void setProductModelNaam(String productModelNaam) {
        this.productModelNaam = productModelNaam;
    }

    public String getProductModelMerk() {
        return productModelMerk;
    }

    public void setProductModelMerk(String productModelMerk) {
        this.productModelMerk = productModelMerk;
    }

    public String getProductModelFoto() {
        return productModelFoto;
    }

    public void setProductModelFoto(String productModelFoto) {
        this.productModelFoto = productModelFoto;
    }

    public String getProductModelBeschrijving() {
        return productModelBeschrijving;
    }

    public void setProductModelBeschrijving(String productModelBeschrijving) {
        this.productModelBeschrijving = productModelBeschrijving;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }
}
