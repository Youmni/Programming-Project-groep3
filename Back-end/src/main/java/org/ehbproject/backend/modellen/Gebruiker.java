package org.ehbproject.backend.modellen;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "GEBRUIKERS")
public class Gebruiker {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="Gebruikerid")
    private int gebruikerID;

    @Column(name="Email", nullable = false, unique = true)
    @NotBlank
    @Email
    @Size(max = 70)
    private String email;

    @Column(name="Wachtwoord", nullable = false)
    @NotBlank
    @Size(max = 64)
    private String wachtwoord;

    @Column(name="Titel", nullable = false)
    @NotBlank
    @Size(max = 15)
    private String titel;

    @Column(name= "ISGEBLACKLIST", nullable = false)
    @NotBlank
    @Size(max = 10)
    private String  isGeblacklist;


    @Column(name= "OVERTREDING")
    private int overtreding;



    @OneToMany(mappedBy = "gebruiker")
    private Set<Reservatie> reservaties= new HashSet<>();

    public Gebruiker(String email, String wachtwoord, String titel, String isGeblacklist) {
        this.email = email;
        this.wachtwoord = wachtwoord;
        this.titel = titel;
        this.isGeblacklist = isGeblacklist;
        this.overtreding = 0;
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


    public String getIsGeblacklist() {
        return isGeblacklist;
    }

    public void setIsGeblacklist(String isGeblacklist) {
        this.isGeblacklist = isGeblacklist;
    }

    public int getOvertreding() {
        return overtreding;
    }

    public void setOvertreding(int overtreding) {
        this.overtreding= overtreding;
    }
}
