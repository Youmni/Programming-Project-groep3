package org.ehbproject.backend.services.verificatie;

import org.ehbproject.backend.dao.GebruikerCrudRepository;
import org.ehbproject.backend.dao.ProductReservatieCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Gebruiker;
import org.ehbproject.backend.modellen.ProductReservatie;
import org.ehbproject.backend.modellen.Reservatie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;


@Service
public class ReservatieLimiet {

    @Autowired
    ReservatieCrudRepository repoReservatie;
    @Autowired
    GebruikerCrudRepository repoGebruiker;
    @Autowired
    ProductReservatieCrudRepository repoProductReservatie;

    public List<Gebruiker> getGebruikerObject(int studentId) {

        return repoGebruiker.findByGebruikerId(studentId);
    }

    public List<Reservatie> getReservatie(int studentId) throws Exception {
        if(getGebruikerObject(studentId).isEmpty()){
            throw new Exception("Geen gebruiker gevonden");
        }
        Gebruiker gebruiker = getGebruikerObject(studentId).getFirst();
        return repoReservatie.findByGebruiker(gebruiker);
    }

    public int checkAantalReservatiesDezeWeek(int studentId) throws Exception {
        List<Reservatie> reservaties = getReservatie(studentId);
        LocalDate datumVandaag = LocalDate.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int huidigeWeekNummer = datumVandaag.get(weekFields.weekOfWeekBasedYear());

        int aantalProductenDezeWeek = 0;
        for (Reservatie reservatie : reservaties) {
            LocalDate reservatieDatum = reservatie.getBoekingDatum();
            int reservatieWeekNummer = reservatieDatum.get(weekFields.weekOfWeekBasedYear());
            if (reservatieWeekNummer == huidigeWeekNummer) {
                List<ProductReservatie> productReservaties = repoProductReservatie.findByReservatie_ReservatieNr(reservatie.getReservatieNr());
                aantalProductenDezeWeek += productReservaties.size();
            }
        }
        return aantalProductenDezeWeek;
    }

    public static List<LocalDate> getAlleDatumsTussen(LocalDate startDatum, LocalDate eindDatum) {
        List<LocalDate> datums = new ArrayList<>();
        LocalDate huidigeDatum = startDatum;

        while (!huidigeDatum.isAfter(eindDatum)) {
            datums.add(huidigeDatum);
            huidigeDatum = huidigeDatum.plusDays(1);
        }

        return datums;
    }
    }
