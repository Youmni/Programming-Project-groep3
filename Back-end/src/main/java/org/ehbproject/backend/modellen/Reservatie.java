package org.ehbproject.backend.modellen;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "RESERVATIES")
public class Reservatie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="Reservatienr")
    private int reservatieNr;


    @ManyToOne
    @JoinColumn(name = "Gebruikerid", nullable = false)
    private Gebruiker gebruiker;

    @Column(name="Afhaaldatum", nullable = false)
    private LocalDate afhaalDatum;

    @Column(name="Retourdatum", nullable = false)
    private LocalDate retourDatum;

    @Column(name="Boekingdatum", nullable = false)
    private LocalDate boekingDatum;

    @Column(name="Reservatiereden", nullable = false)
    private String reden;

    @Column(name="Reservatieopmerking")
    private String opmerking;

    @Column(name="Status", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String status;

    @ManyToMany
    @JoinTable(
            name = "PRODUCTRESERVATIES",
            joinColumns = @JoinColumn(name = "reservatienr"),
            inverseJoinColumns = @JoinColumn(name = "productid"))
    private Set<Product> producten;

    protected Reservatie(){}

    public Reservatie(LocalDate afhaalDatum, LocalDate retourDatum, LocalDate boekingDatum, String reden, String opmerking, String status, Gebruiker gebruiker) {
        this.afhaalDatum = afhaalDatum;
        this.retourDatum = retourDatum;
        this.boekingDatum = boekingDatum;
        this.reden = reden;
        this.opmerking = opmerking;
        this.status = status;
        this.gebruiker = gebruiker;
    }


    public int getReservatieNr() {
        return reservatieNr;
    }

    public void setReservatieNr(int reservatieNr) {
        this.reservatieNr = reservatieNr;
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

    public Gebruiker getGebruiker() {
        return gebruiker;
    }

    public void setGebruiker(Gebruiker gebruiker) {
        this.gebruiker = gebruiker;
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

    public Set<Product> getProducten() {
        return producten;
    }

    public void setProducten(Set<Product> producten) {
        this.producten = producten;
    }
}
