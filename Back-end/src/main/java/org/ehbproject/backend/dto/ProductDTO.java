package org.ehbproject.backend.dto;

public class ProductDTO {
    private int productModelNr;
    private String productNaam;
    private String status;

    public ProductDTO(int productModelNr, String productNaam, String status) {
        this.productModelNr = productModelNr;
        this.productNaam = productNaam;
        this.status = status;
    }

    public int getProductModelNr() {
        return productModelNr;
    }

    public void setProductModelNr(int productModelNr) {
        this.productModelNr = productModelNr;
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
}
