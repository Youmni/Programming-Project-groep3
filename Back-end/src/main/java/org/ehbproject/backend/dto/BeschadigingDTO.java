package org.ehbproject.backend.dto;

import java.time.LocalDate;

public class BeschadigingDTO {
    private int gebruikerId;
    private int productId;
    private String beschrijving;
    private LocalDate beschadigingsDatum;

    private String beschadigingFoto;

    public BeschadigingDTO(int gebruikerId, int productId, String beschrijving, LocalDate beschadigingsDatum, String beschadigingFoto) {
        this.gebruikerId = gebruikerId;
        this.productId = productId;
        this.beschrijving = beschrijving;
        this.beschadigingsDatum = beschadigingsDatum;
        this.beschadigingFoto = beschadigingFoto;
    }

    public int getGebruikerId() {
        return gebruikerId;
    }

    public void setGebruikerId(int gebruikerId) {
        this.gebruikerId = gebruikerId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getBeschrijving() {
        return beschrijving;
    }

    public void setBeschrijving(String beschrijving) {
        this.beschrijving = beschrijving;
    }

    public LocalDate getBeschadigingsDatum() {
        return beschadigingsDatum;
    }

    public void setBeschadigingsDatum(LocalDate beschadigingsDatum) {
        this.beschadigingsDatum = beschadigingsDatum;
    }

    public String getBeschadigingFoto() {
        return beschadigingFoto;
    }

    public void setBeschadigingFoto(String beschadigingFoto) {
        this.beschadigingFoto = beschadigingFoto;
    }
}
