package org.ehbproject.backend.modellen;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "BLACKLISTS")
public class Blacklist {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    @Column(name = "BlacklistId")
    private int BlacklistId;

    @ManyToOne
    @JoinColumn(name = "GebruikerId", nullable = false)
    private Gebruiker gebruiker;

    @Column(name = "Blacklistdatum")
    private LocalDate Blacklistdatum;

    @Column (name = "BlacklistReden")
    private String BlacklistReden;

    public Blacklist(Gebruiker gebruiker, LocalDate blacklistdatum, String blacklistReden) {
        this.gebruiker = gebruiker;
        Blacklistdatum = blacklistdatum;
        BlacklistReden = blacklistReden;
    }

    public int getBlacklistId() {
        return BlacklistId;
    }

    public void setBlacklistId(int blacklistId) {
        BlacklistId = blacklistId;
    }

    public Gebruiker getGebruiker() {
        return gebruiker;
    }

    public void setGebruiker(Gebruiker gebruiker) {
        this.gebruiker = gebruiker;
    }

    public LocalDate getBlacklistdatum() {
        return Blacklistdatum;
    }

    public void setBlacklistdatum(LocalDate blacklistdatum) {
        Blacklistdatum = blacklistdatum;
    }

    public String getBlacklistReden() {
        return BlacklistReden;
    }

    public void setBlacklistReden(String blacklistReden) {
        BlacklistReden = blacklistReden;
    }
}
