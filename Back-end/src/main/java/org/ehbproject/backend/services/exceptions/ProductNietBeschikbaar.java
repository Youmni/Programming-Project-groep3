package org.ehbproject.backend.services.exceptions;

public class ProductNietBeschikbaar extends Exception{
    private final String tekst;
    public ProductNietBeschikbaar(String tekst) {
        this.tekst = tekst;
    }

    public String getTekst() {
        return tekst;
    }
}
