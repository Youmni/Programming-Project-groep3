package org.ehbproject.backend.services.exceptions;

public class ProductUnavailableException extends Exception{
    private final String tekst;
    public ProductUnavailableException(String tekst) {
        this.tekst = tekst;
    }

    public String getTekst() {
        return tekst;
    }
}
