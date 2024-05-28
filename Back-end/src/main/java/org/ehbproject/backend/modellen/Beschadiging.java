package org.ehbproject.backend.modellen;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
@Entity
@Table(name = "BESCHADIGINGEN")
public class Beschadiging {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="Beschadigingid")
    private int beschadigingId;

    @ManyToOne
    @JoinColumn(name = "Gebruikerid", nullable = false)
    private Gebruiker gebruiker;

    @ManyToOne
    @JoinColumn(name = "Productid", nullable = false)
    private Product product;

    @Column(name="Beschrijving", nullable = false)
    private String Beschrijving;

    @Column(name="Beschadigingsdatum", nullable = false)
    private LocalDate beschadigingsdatum;

    public Beschadiging(Gebruiker gebruiker, Product product, String beschrijving, LocalDate beschadigingsdatum) {
        this.gebruiker = gebruiker;
        this.product = product;
        Beschrijving = beschrijving;
        this.beschadigingsdatum = beschadigingsdatum;
    }

    protected Beschadiging(){}

    public int getBeschadigingId() {
        return beschadigingId;
    }

    public void setBeschadigingId(int beschadigingId) {
        this.beschadigingId = beschadigingId;
    }

    public Gebruiker getGebruiker() {
        return gebruiker;
    }

    public void setGebruiker(Gebruiker gebruiker) {
        this.gebruiker = gebruiker;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getBeschrijving() {
        return Beschrijving;
    }

    public void setBeschrijving(String beschrijving) {
        Beschrijving = beschrijving;
    }

    public LocalDate getBeschadigingsdatum() {
        return beschadigingsdatum;
    }

    public void setBeschadigingsdatum(LocalDate beschadigingsdatum) {
        this.beschadigingsdatum = beschadigingsdatum;
    }
}
