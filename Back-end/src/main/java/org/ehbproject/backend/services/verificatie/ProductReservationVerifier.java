package org.ehbproject.backend.services.verificatie;


import org.ehbproject.backend.dao.ProductCrudRepository;
import org.ehbproject.backend.dao.ProductReservatieCrudRepository;
import org.ehbproject.backend.dao.ReservatieCrudRepository;
import org.ehbproject.backend.modellen.ProductReservatie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Service
public class ProductReservationVerifier {

    @Autowired
    ReservatieCrudRepository repoReservatie;
    @Autowired
    ProductReservatieCrudRepository repoProductReservatie;
    @Autowired
    ProductCrudRepository repoProduct;

    private static final Logger logger = LoggerFactory.getLogger(ProductReservationVerifier.class);
    public boolean isProductGereserveerd(LocalDate begindatum ,LocalDate einddatum, int[] products){

        for(int product : products){
            List<ProductReservatie> productReservaties = repoProductReservatie.findByProduct_ProductId(product);
            logger.info(product+": "+"komt tot hier");
            if(productReservaties.isEmpty()){
                logger.info("beschikbaar");
                return false;
            }
            for(ProductReservatie reservatie : productReservaties){
                LocalDate afhaalDatumVorig = reservatie.getReservatie().getAfhaalDatum();
                LocalDate terugbrengDatumVorig = reservatie.getReservatie().getRetourDatum();

                logger.info(product+": "+afhaalDatumVorig+" datum om nu uit te lenen:"+ begindatum);
                logger.info(product+": "+terugbrengDatumVorig+" datum om nu uit te lenen:"+ einddatum);
                boolean isOverlapping  =
                        !(((einddatum.isBefore(afhaalDatumVorig) &&  begindatum.isBefore(einddatum))||
                                (begindatum.isAfter(terugbrengDatumVorig) && einddatum.isAfter(begindatum))));
                logger.info("overlapping: "+isOverlapping);
                if (isOverlapping ) {
                    return true;
                }
            }
        }
        return false;

    }
}