package org.ehbproject.backend.modellen;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@IdClass(ProductReservatiesId.class)
@Table(name = "PRODUCTRESERVATIES")
public class ProductReservatie {

    @Id
    @ManyToOne
    @JoinColumn(name = "Productid", referencedColumnName = "Productid")
    private Product product;

    @Id
    @ManyToOne
    @JoinColumn(name = "Reservatienr", referencedColumnName = "Reservatienr")
    private Reservatie reservatie;

    protected ProductReservatie(){}

    public ProductReservatie(Product product, Reservatie reservatie) {
        this.product = product;
        this.reservatie = reservatie;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Reservatie getReservatie() {
        return reservatie;
    }

    public void setReservatie(Reservatie reservatie) {
        this.reservatie = reservatie;
    }
}
