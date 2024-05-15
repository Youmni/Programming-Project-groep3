package org.ehbproject.backend.modellen;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "CATEGORIEËN")
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="Categorienr")
    private int categorieNr;
    @OneToMany(mappedBy = "categorie")
    private Set<ProductModel> productModellen = new HashSet<>();

    @Column(name= "Categorienaam")
    private String categorieNaam;
    protected Categorie(){}

    public Categorie(String categorieNaam) {

        this.categorieNaam = categorieNaam;
    }


    public int getCategorieNr() {
        return categorieNr;
    }

    public void setCategorieNr(int categorieNr) {
        this.categorieNr = categorieNr;
    }

    public String getCategorieNaam() {
        return categorieNaam;
    }

    public void setCategorieNaam(String categorieNaam) {
        this.categorieNaam = categorieNaam;
    }

    public Set<ProductModel> getProductModellen() {
        return productModellen;
    }

    public void setProductModellen(Set<ProductModel> productModellen) {
        this.productModellen = productModellen;
    }
}
