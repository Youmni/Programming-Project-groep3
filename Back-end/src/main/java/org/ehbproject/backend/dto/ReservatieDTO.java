package org.ehbproject.backend.dto;

import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;

public class ReservatieDTO {
    private int gebruikerId;
    private LocalDate afhaalDatum;
    private LocalDate retourDatum;
    private LocalDate boekingDatum;
    private String reden;
    private String opmerking;
    private String status;

    public ReservatieDTO(LocalDate afhaalDatum, LocalDate retourDatum, LocalDate boekingDatum, String reden, String opmerking, String status, int gebruikerId) {
        this.afhaalDatum = afhaalDatum;
        this.retourDatum = retourDatum;
        this.boekingDatum = boekingDatum;
        this.reden = reden;
        this.opmerking = opmerking;
        this.status = status;
        this.gebruikerId = gebruikerId;
    }

    public LocalDate getAfhaalDatum() {
        return afhaalDatum;
    }

    public void setAfhaalDatum(LocalDate afhaalDatum) {
        this.afhaalDatum = afhaalDatum;
    }

    public LocalDate getRetourDatum() {
        return retourDatum;
    }

    public void setRetourDatum(LocalDate retourDatum) {
        this.retourDatum = retourDatum;
    }

    public LocalDate getBoekingDatum() {
        return boekingDatum;
    }

    public void setBoekingDatum(LocalDate boekingDatum) {
        this.boekingDatum = boekingDatum;
    }

    public String getReden() {
        return reden;
    }

    public void setReden(String reden) {
        this.reden = reden;
    }

    public String getOpmerking() {
        return opmerking;
    }

    public void setOpmerking(String opmerking) {
        this.opmerking = opmerking;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getGebruikerId() {
        return gebruikerId;
    }

    public void setGebruikerId(int gebruikerId) {
        this.gebruikerId = gebruikerId;
    }
}