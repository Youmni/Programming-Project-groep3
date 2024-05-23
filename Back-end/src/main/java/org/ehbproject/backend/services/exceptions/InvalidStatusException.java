package org.ehbproject.backend.services.exceptions;

public class InvalidStatusException extends Exception{
    private final String tekst;
    public InvalidStatusException(String tekst) {
        this.tekst = tekst;
    }

    public String getTekst() {
        return tekst;
    }
}
