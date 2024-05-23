package org.ehbproject.backend.modellen;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
@Table(name = "BLACKLISTS")
public class Blacklists {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="Blacklistid", nullable = false)
    @Size(max = 4)
    private int blacklistId;

    @ManyToOne
    @JoinColumn(name = "Gebruikerid", nullable = false)
    @NotBlank
    @Size(max = 6)
    private Gebruiker gebruiker;

    @Column(name="Status", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String blacklistStatus;
    @Column(name="Blacklistreden", nullable = false)
    @NotBlank
    @Size(max = 255)
    private String blacklistReden;

    @Column(name="Blacklistdatum", nullable = false)
    @NotBlank
    private LocalDate blacklistDatum;

    public Blacklists(Gebruiker gebruiker, String blacklistReden, LocalDate blacklistDatum, String blacklistStatus) {
        this.gebruiker = gebruiker;
        this.blacklistReden = blacklistReden;
        this.blacklistDatum = blacklistDatum;
        this.blacklistStatus = blacklistStatus;
    }

    protected Blacklists(){}

    public int getBlacklistId() {
        return blacklistId;
    }

    public void setBlacklistId(int blacklistId) {
        this.blacklistId = blacklistId;
    }

    public Gebruiker getGebruiker() {
        return gebruiker;
    }

    public void setGebruiker(Gebruiker gebruiker) {
        this.gebruiker = gebruiker;
    }

    public String getBlacklistReden() {
        return blacklistReden;
    }

    public void setBlacklistReden(String blacklistReden) {
        this.blacklistReden = blacklistReden;
    }

    public LocalDate getBlacklistDatum() {
        return blacklistDatum;
    }

    public void setBlacklistDatum(LocalDate blacklistDatum) {
        this.blacklistDatum = blacklistDatum;
    }

    public String getBlacklistStatus() {
        return blacklistStatus;
    }

    public void setBlacklistStatus(String blacklistStatus) {
        this.blacklistStatus = blacklistStatus;
    }
}