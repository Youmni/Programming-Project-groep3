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
public class ProductStatusUpdate {

    @Autowired
    ProductCrudRepository repoProduct;
    @Autowired
    ProductReservatieCrudRepository repoProductReservatie;
    @Autowired
    ReservatieCrudRepository repoReservatie;

    @Scheduled(cron = "0 0 0 * * *")
    public void updateProductStatus(){
        List<Product> productenLijst = new ArrayList<>();
        List<Reservatie> reservatiesTegenVandaag = repoReservatie.findByAfhaalDatum(LocalDate.now());

        for(Reservatie reservatie : reservatiesTegenVandaag){
            int reservatieNr = reservatie.getReservatieNr();
            List<ProductReservatie> productReservaties = repoProductReservatie.findByReservatie_ReservatieNr(reservatieNr);
            for(ProductReservatie productReservatie : productReservaties){
                productenLijst.add(productReservatie.getProduct());
            }
        }

        for(Product product : productenLijst){
            product.setStatus("Gereserveerd");
            repoProduct.save(product);
        }
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void downgradeProductStatus(){
        List<Product> productenLijst = new ArrayList<>();
        List<Reservatie> reservatiesRetour = repoReservatie.findByRetourDatum(LocalDate.now());

        for (Reservatie reservatie : reservatiesRetour){
            int reservatieNr = reservatie.getReservatieNr();
            List<ProductReservatie> productReservaties = repoProductReservatie.findByReservatie_ReservatieNr(reservatieNr);
            for (ProductReservatie productReservatie : productReservaties){
                productenLijst.add(productReservatie.getProduct());
            }
        }

        for (Product product : productenLijst){
            product.setStatus("Beschikbaar");
            repoProduct.save(product);
        }

    }

}
