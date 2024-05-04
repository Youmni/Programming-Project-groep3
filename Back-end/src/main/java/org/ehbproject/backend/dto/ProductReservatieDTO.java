package org.ehbproject.backend.dto;

public class ProductReservatieDTO {

    int productID;
    int reservatieID;

    public ProductReservatieDTO(int productID, int reservatieID) {
        this.productID = productID;
        this.reservatieID = reservatieID;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    public int getReservatieID() {
        return reservatieID;
    }

    public void setReservatieID(int reservatieID) {
        this.reservatieID = reservatieID;
    }
}
