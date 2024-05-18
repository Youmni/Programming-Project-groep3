package org.ehbproject.backend.services.exceptions;

public class OngeldigeStatusException extends Exception{
    private final String tekst;
    public OngeldigeStatusException(String tekst) {
        this.tekst = tekst;
    }

    public String getTekst() {
        return tekst;
    }
}
