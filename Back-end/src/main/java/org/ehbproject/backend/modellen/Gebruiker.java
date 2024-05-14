package org.ehbproject.backend.modellen;


import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "GEBRUIKERS")
public class Gebruiker {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="Gebruikerid")
    private int gebruikerID;

    @Column(name="Email" )
    private String email;

    @Column(name="Wachtwoord")
    private String wachtwoord;

    @Column(name="Titel")
    private String titel;

    @Column(name="Blacklist")
    private String blacklist;

    @Column(name="Blacklistreden")
    private String blacklistReden;

    @Column(name="Overtredingen")
    private int overtredingen;



    @OneToMany(mappedBy = "gebruiker")
    private Set<Reservatie> reservaties= new HashSet<>();

    public Gebruiker(String email, String wachtwoord, String titel, String blacklist) {
        this.email = email;
        this.wachtwoord = wachtwoord;
        this.titel = titel;
        this.blacklist = blacklist;
        this.overtredingen = 0;
    }

    protected Gebruiker() {

    }

    public int getGebruikerID() {
        return gebruikerID;
    }

    public void setGebruikerID(int gebruikerID) {
        this.gebruikerID = gebruikerID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }

    public void setWachtwoord(String wachtwoord) {
        this.wachtwoord = wachtwoord;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getBlacklist() {
        return blacklist;
    }

    public void setBlacklist(String blacklist) {
        this.blacklist = blacklist;
    }

    public String getBlacklistReden() {
        return blacklistReden;
    }

    public void setBlacklistReden(String blacklistReden) {
        this.blacklistReden = blacklistReden;
    }

    public int getOvertredingen() {
        return overtredingen;
    }

    public void setOvertredingen(int overtredingen) {
        this.overtredingen = overtredingen;
    }
}
