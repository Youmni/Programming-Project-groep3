package org.ehbproject.backend.dao;

import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.Reservatie;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface ReservatieCrudRepository extends CrudRepository<Reservatie, Integer> {
    public List<Reservatie> findByBoekingDatum(LocalDate boekingDatum);
    public List<Reservatie> findByReservatieNr(int reservatieNr);
    public List<Reservatie> findByAfhaalDatum(LocalDate afhaalDatum);
    public List<Reservatie> findByProductenContainingAndAfhaalDatumAfter(Product product, LocalDate afhaalDatum);
    public List<Reservatie> findByRetourDatum(LocalDate retourDatum);
    public List<Reservatie> findByGebruiker(Gebruiker gebruiker);
    public List<Reservatie> findByStatus(String status);
    public List<Reservatie> findByStatusIn(List<String> status);
    List<Reservatie> findByGebruikerAndStatusIn(Gebruiker gebruiker, List<String> status);
    List<Reservatie> findByGebruikerAndStatus(Gebruiker gebruiker, String status);
    public List<Reservatie> findByOpmerking(String opmerking);

    List<Reservatie> findByProductenContainingIgnoreCase(Product product);


    public List<Reservatie> findByRedenContainingIgnoreCase(String reden);




}
