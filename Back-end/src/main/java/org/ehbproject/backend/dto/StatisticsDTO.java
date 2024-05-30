package org.ehbproject.backend.dto;

public class StatisticsDTO {
    private String klasse;
    private int aantal;
    public StatisticsDTO (String klasse, int aantal){
        this.klasse = klasse;
        this.aantal = aantal;
    }

    public String getKlasse() {
        return klasse;
    }

    public void setKlasse(String klasse) {
        this.klasse = klasse;
    }

    public int getAantal() {
        return aantal;
    }

    public void setAantal(int aantal) {
        this.aantal = aantal;
    }
}
