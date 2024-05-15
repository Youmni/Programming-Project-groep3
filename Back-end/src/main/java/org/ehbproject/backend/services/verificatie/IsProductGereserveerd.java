package org.ehbproject.backend.services.verificatie;


import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ProductReservatieCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.Product;
import org.ehbproject.backend.modellen.ProductReservatie;
import org.ehbproject.backend.modellen.Reservatie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Service
public class IsProductGereserveerd {

    @Autowired
    ReservatieCrudRepository repoReservatie;
    @Autowired
    ProductReservatieCrudRepository repoProductReservatie;
    @Autowired
    ProductCrudRepository repoProduct;

    private static final Logger logger = LoggerFactory.getLogger(IsProductGereserveerd.class);
    public boolean isProductGereserveerd(LocalDate datum,int aantalWeken, int[] products){

        LocalDate eindDatum = datum.plusWeeks(aantalWeken);

        for(int product : products){
            List<ProductReservatie> productReservaties = repoProductReservatie.findByProduct_ProductID(product);
            logger.info(product+": "+"komt tot hier");
            if(productReservaties.isEmpty()){
                return false;
            }
            for(ProductReservatie reservatie : productReservaties){
                LocalDate afhaalDatumVorig = reservatie.getReservatie().getAfhaalDatum();
                LocalDate terugbrengDatumVorig = reservatie.getReservatie().getRetourDatum();

                logger.info(product+": "+afhaalDatumVorig+" datum om nu uit te lenen:"+ datum);
                logger.info(product+": "+terugbrengDatumVorig+" datum om nu uit te lenen:"+ eindDatum);
                boolean isOverlapping  =
                        !(((eindDatum.isBefore(afhaalDatumVorig) &&  datum.isBefore(eindDatum))||
                        (datum.isAfter(terugbrengDatumVorig) && eindDatum.isAfter(datum))));
                logger.info("overlapping: "+isOverlapping);
                if (isOverlapping ) {
                    return true;
                }
            }
        }
        return false;

    }
}
