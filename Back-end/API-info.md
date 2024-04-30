# API informatie

Hieronder kunnen alle URL's terug gevonden worden die nodig zijn voor het ophalen van data.

## Inhoudsopgave

1. Categorieën
2. Gebruikers
3. Producten
4. ProductModellen
5. ProductReservaties
6. Reservaties

## Categorieën

-Om alle categorieën op te halen: "http://localhost:8080/categorie"
-Om een specifieke categorie naam op te halen: "http://localhost:8080/categorie/name={VulIn}"
-Om een specifieke categorie id op te halen: "http://localhost:8080/categorie/id={VulIn}"

## Gebruikers

-Om alle gebruikers op te halen: "http://localhost:8080/gebruiker"
-Om te zoeken op gebruiker ID: "http://localhost:8080/gebruiker/id={VulIn}"
-Om te zoeken op email: "http://localhost:8080/gebruiker/email={VulIn}"
-Om te zoeken op voornaam: "http://localhost:8080/gebruiker/voornaam={VulIn}"
-Om te zoeken op achternaam: "http://localhost:8080/gebruiker/achternaam={VulIn}"
-Om te zoeken op naam: "http://localhost:8080/gebruiker/naam={VulIn}"
-Om te zoeken op titel: "http://localhost:8080/gebruiker/titel={VulIn}"

## Producten

-Om alle producten op te halen: "http://localhost:8080/product"
-Om te zoeken op product ID: "http://localhost:8080/product/id={VulIn}"
-Om te zoeken op productnaam: "http://localhost:8080/product/naam={VulIn}"
-Om te zoeken op status: "http://localhost:8080/product/status={VulIn}"
-Om te zoeken op naam en op status: "http://localhost:8080/product/naam={VulIn}/status={VulIn}"
-Om te zoeken op id en op status: "http://localhost:8080/product/id={VulIn}/status={VulIn}"

## ProductModellen

-Om alle productModellen op te halen: "http://localhost:8080/productmodel"
-Om te zoeken op productModel ID: "http://localhost:8080/productmodel/id={VulIn}"
-Om te zoeken op productModel naam: "http://localhost:8080/productmodel/naam={VulIn}"
-Om te zoeken op merk: "http://localhost:8080/productmodel/merk={VulIn}"

## ProductReservaties

-Om alle productReservaties op te halen: "http://localhost:8080/product-reservatie"
-Om product ID's te zien gebasseerd op reservatieID: "http://localhost:8080/product-reservatie/reservaties/naam={VulIn}"
-Om reservatie ID's te zien gebasseerd op productID: "http://localhost:8080/product-reservatie/producten/id={VulIn}"

## Reservaties

-Om alle reservaties op te halen: "http://localhost:8080/reservatie"
-Om te zoeken op reservatie ID: "http://localhost:8080/reservatie/id={VulIn}"
-Om te zoeken op gebruiker ID: {momenteel niet beschikbaar}
-Om te zoeken op afhaalDatum: "http://localhost:8080/reservatie/afhaaldatum={VulIn}"
-Om te zoeken op retourDatum: "http://localhost:8080/reservatie/retourDatum={VulIn}"
-Om te zoeken op boekingDatum: "http://localhost:8080/reservatie/boekingDatum={VulIn}"
-Om te zoeken op status:
    -in orde: "http://localhost:8080/reservatie/in-orde"
    -te laat: "http://localhost:8080/reservatie/te-laat"