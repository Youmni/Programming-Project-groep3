package org.ehbproject.backend.modellen;

import jakarta.persistence.*;


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
    private String beschrijving;

    @Column(name="Beschadigingsdatum", nullable = false)
    private LocalDate beschadigingsDatum;

    @Column(name="Beschadigingfoto", nullable = false)
    private String beschadigingFoto;

    public Beschadiging(Gebruiker gebruiker, Product product, String beschrijving, LocalDate beschadigingsDatum, String beschadigingFoto) {
        this.gebruiker = gebruiker;
        this.product = product;
        this.beschrijving = beschrijving;
        this.beschadigingsDatum = beschadigingsDatum;
        this.beschadigingFoto = beschadigingFoto;
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
        return beschrijving;
    }

    public void setBeschrijving(String beschrijving) {
        this.beschrijving = beschrijving;
    }

    public LocalDate getBeschadigingsdatum() {
        return beschadigingsDatum;
    }

    public void setBeschadigingsdatum(LocalDate beschadigingsdatum) {
        this.beschadigingsDatum = beschadigingsdatum;
    }

    public String getBeschadigingFoto() {
        return beschadigingFoto;
    }

    public void setBeschadigingFoto(String beschadigingFoto) {
        this.beschadigingFoto = beschadigingFoto;
    }
}
