package org.ehbproject.backend.services.updating;

import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ProductReservatieCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.ProductReservatie;
import org.ehbproject.backend.modellen.Reservatie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservatieStatusUpdate {

    @Autowired
    ReservatieCrudRepository repoReservatie;

    @Scheduled(cron = "0 0 0 ? * SAT")
    public void updateProductStatus(){
        List<Reservatie> reservatieLijst = new ArrayList<>();
        List<Reservatie> reservatiesTegenVandaag = repoReservatie.findByRetourDatum(LocalDate.now().minusDays(1));

        for(Reservatie reservatie : reservatiesTegenVandaag){
                reservatieLijst.add(reservatie);

        }

        for(Reservatie reservatie : reservatieLijst){
            reservatie.setStatus("Te laat");
            repoReservatie.save(reservatie);
        }
    }
}
