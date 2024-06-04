package org.ehbproject.backend.dto;

public class ProductReservatieDTO {

    int productId;
    int reservatieId;

    public ProductReservatieDTO(int productID, int reservatieID) {
        this.productId = productID;
        this.reservatieId = reservatieID;
    }

    public int getProductID() {
        return productId;
    }

    public void setProductID(int productID) {
        this.productId = productID;
    }

    public int getReservatieID() {
        return reservatieId;
    }

    public void setReservatieID(int reservatieID) {
        this.reservatieId = reservatieID;
    }
}
