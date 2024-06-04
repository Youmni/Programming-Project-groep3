package org.ehbproject.backend.services.verificatie;

import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
public class DateValidator {

    public boolean validateDates(LocalDate afhaalDatum, LocalDate boekingDatum, LocalDate retourDatum, String titel) {
        if (titel.equalsIgnoreCase("student") && afhaalDatum.isAfter(boekingDatum.plusDays(7))) {
            return false;
        } else if (!(boekingDatum.isBefore(afhaalDatum) && afhaalDatum.isBefore(retourDatum))) {
            return false;
        } else if (!(afhaalDatum.getDayOfWeek() == DayOfWeek.MONDAY && retourDatum.getDayOfWeek() == DayOfWeek.FRIDAY)) {
            return false;
        } else {
            return true;
        }
    }
}
