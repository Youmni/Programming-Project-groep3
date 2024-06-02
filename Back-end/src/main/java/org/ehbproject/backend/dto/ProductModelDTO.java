package org.ehbproject.backend.dto;

public class ProductModelDTO {

    private int categorieNr;

    private String productModelNaam;

    private String productModelMerk;

    private String productModelFoto;

    private String productModelBeschrijving;

    public ProductModelDTO(int categorieNr, String productModelNaam, String productModelMerk, String productModelFoto, String productModelBeschrijving) {
        this.categorieNr = categorieNr;
        this.productModelNaam = productModelNaam;
        this.productModelMerk = productModelMerk;
        this.productModelFoto = productModelFoto;
        this.productModelBeschrijving = productModelBeschrijving;
    }

    public int getCategorieNr() {
        return categorieNr;
    }

    public void setCategorieNr(int categorieNr) {
        this.categorieNr = categorieNr;
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
}
