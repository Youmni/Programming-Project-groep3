package org.ehbproject.backend.dto;

import java.time.LocalDate;

public class BeschadigingDTO {
    private int GebruikerId;
    private int ProductId;
    private String Beschrijving;
    private LocalDate BeschadigingsDatum;

    public BeschadigingDTO(int gebruikerId, int productId, String beschrijving, LocalDate beschadigingsDatum) {
        GebruikerId = gebruikerId;
        ProductId = productId;
        Beschrijving = beschrijving;
        BeschadigingsDatum = beschadigingsDatum;
    }

    public int getGebruikerId() {
        return GebruikerId;
    }

    public void setGebruikerId(int gebruikerId) {
        GebruikerId = gebruikerId;
    }

    public int getProductId() {
        return ProductId;
    }

    public void setProductId(int productId) {
        ProductId = productId;
    }

    public String getBeschrijving() {
        return Beschrijving;
    }

    public void setBeschrijving(String beschrijving) {
        Beschrijving = beschrijving;
    }

    public LocalDate getBeschadigingsDatum() {
        return BeschadigingsDatum;
    }

    public void setBeschadigingsDatum(LocalDate beschadigingsDatum) {
        BeschadigingsDatum = beschadigingsDatum;
    }
}
