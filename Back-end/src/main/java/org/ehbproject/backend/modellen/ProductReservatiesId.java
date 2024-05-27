package org.ehbproject.backend.modellen;

import java.io.Serializable;

public class ProductReservatiesId implements Serializable {
    private int product;
    private int reservatie;

    protected ProductReservatiesId() {
    }

    public ProductReservatiesId(int product, int reservatie) {
        this.product = product;
        this.reservatie = reservatie;
    }

    public int getProduct() {
        return product;
    }

    public void setProduct(int product) {
        this.product = product;
    }

    public int getReservatie() {
        return reservatie;
    }

    public void setReservatie(int reservatie) {
        this.reservatie = reservatie;
    }

}
