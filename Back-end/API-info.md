# API informatie

Hieronder kunnen alle URL's terug gevonden worden die nodig zijn voor het ophalen, aanpassen en toevoegen van data.

## Inhoudsopgave

1. Categorieën
2. Gebruikers
3. Producten
4. ProductModellen
5. ProductReservaties
6. Reservaties
7. Blacklists
8. Beschadigingen

## Categorieën

Get-requests:
    -Om alle categorieën op te halen: "http://localhost:8080/categorie"
    -Om een specifieke categorie naam op te halen: "http://localhost:8080/categorie/name={VulIn}"
    -Om een specifieke categorie id op te halen: "http://localhost:8080/categorie/id={VulIn}"

Post-requests:
    -Om categorieën toe te voegen: "http://localhost:8080/categorie/toevoegen"
        bv: {"categorieNaam": "elektronica"}

Delete-requests:
    -Om categorieën te verwijderen: "http://localhost:8080/categorie/id={id}/delete"

## Gebruikers

Get-requests:
    -Om alle gebruikers op te halen: "http://localhost:8080/gebruiker"
    -Om te zoeken op gebruiker ID: "http://localhost:8080/gebruiker/id={VulIn}"
    -Om te zoeken op email: "http://localhost:8080/gebruiker/email={VulIn}"
    -Om te zoeken op voornaam: "http://localhost:8080/gebruiker/voornaam={VulIn}"
    -Om te zoeken op achternaam: "http://localhost:8080/gebruiker/achternaam={VulIn}"
    -Om te zoeken op naam: "http://localhost:8080/gebruiker/naam={VulIn}"
    -Om te zoeken op titel: "http://localhost:8080/gebruiker/titel={VulIn}"
    -Om te zoeken hoeveel studenten er zijn: "http://localhost:8080/gebruiker/studentaantal"
    -Om te zoeken hoeveel docenten er zijn: "http://localhost:8080/gebruiker/docentaantal"
    -Om te zoeken hoeveel gebruikers er zijn: "http://localhost:8080/gebruiker/gebruikersaantal"

Post-requests:
    -Om Gebruikers toe te voegen: "http://localhost:8080/gebruiker/toevoegen"
        bv:{"email": "student@example.com",
            "wachtwoord": "veiligWachtwoord123",
            "titel": "Student",
            "blacklist": "nee"}
    -Om in te loggen en token te genereren: "http://localhost:8080/gebruiker/login"
Delete-requests: 
    -Om een gebruiker te verwijderen: "http://localhost:8080/gebruiker/{id}/delete"


## Producten
Get-requests:
    -Om alle producten op te halen: "http://localhost:8080/product"
    -Om te zoeken op product ID: "http://localhost:8080/product/id={VulIn}"
    -Om te zoeken op productnaam: "http://localhost:8080/product/naam={VulIn}"
    -Om te zoeken op status: "http://localhost:8080/product/status={VulIn}"
    -Om te zoeken op naam en op status: "http://localhost:8080/product/naam={VulIn}/status={VulIn}"
    -Om te zoeken op id en op status: "http://localhost:8080/product/id={VulIn}/status={VulIn}"
    -Om te zoeken op categorienr: "http://localhost:8080/product/categorienr={categorienr}"
    -Om aantal producten te zien op status: "http://localhost:8080/product/statusaantal={VulInStatus}"
    -Om producten te zien bij meerdere statussen: "http://localhost:8080/product/status"
    -Om producten te vinden op model: "http://localhost:8080/product/model={VulIn}"
    -Om producten te vinden op model en status: "http://localhost:8080/product/model={VulIn}/status"
Post-requests:
    -Om producten toe te voegen: "http://localhost:8080/product/toevoegen"
            bv:{"productModelNr": 1,
                "productNaam": "Voorbeeld product",
                "status": "Beschikbaar"}

Put-requests:
    -Om de status van een product bij te werken: "http://localhost:8080/product/{id}/bewerk-status"
    -Om de naam en status van een product bij te werken: "http://localhost:8080/product/{id}/bewerk-naam-status"
    -Om de naam van een product bij te werken: "http://localhost:8080/product/{id}/bewerk-naam"

Delete-request:
    -Om een product te verwijderen: "http://localhost:8080/product/{id}/delete"


## ProductModellen
Get-requests:
    -Om alle productModellen op te halen: "http://localhost:8080/productmodel"
    -Om te zoeken op productModel ID: "http://localhost:8080/productmodel/id={VulIn}"
    -Om te zoeken op productModel naam: "http://localhost:8080/productmodel/naam={VulIn}"
    -Om te zoeken op merk: "http://localhost:8080/productmodel/merk={VulIn}"
    -Om te zoeken op categorienr: "http://localhost:8080/productmodel/categorienr={id}"

Post-request:
    -Om productmodellen toe te voegen: "http://localhost:8080/productmodel/toevoegen"
            bv:{"categorieNr": 1,
            "productModelNaam": "Voorbeeld productmodel",
            "productModelMerk": "Voorbeeld merk",
            "productModelFoto": "Voorbeeld foto",
            "productModelBeschrijving": "Voorbeeld beschrijving"}

Put-requests:
    -Om de beschrijving van een productmodel bij te werken: "http://localhost:8080/productmodel/{id}/beschrijving"

Delete-request:
    -Om een productmodel te verwijderen: "http://localhost:8080/productmodel/delete/{id}"

## ProductReservaties
Get-requests:
    -Om alle productReservaties op te halen: "http://localhost:8080/product-reservatie"
    -Om product ID's te zien gebasseerd op reservatieID: "http://localhost:8080/product-reservatie/reservaties/id={VulIn}"
    -Om reservatie ID's te zien gebasseerd op productID: "http://localhost:8080/product-reservatie/producten/id={VulIn}"

## Reservaties
Get-requests:
    -Om alle reservaties op te halen: "http://localhost:8080/reservatie"
    -Om te zoeken op reservatie ID: "http://localhost:8080/reservatie/id={VulIn}"
    -Om de niet beschikbare datums te zien: "http://localhost:8080/reservatie/niet-beschikbare-datums/{id}"
    -Om te zoeken op gebruiker ID: "http://localhost:8080/reservatie/gebruikerId={VulIn}"
    -Om te zoeken op gebruiker ID en status: "http://localhost:8080/reservatie/gebruikerId={VulIn}/status={VulIn}"
    -Om te zoeken op actieve reservaties en gebruiker ID: "http://localhost:8080/reservatie/gebruikerId={VulIn}/actief"
    -Om te zoeken op afhaalDatum: "http://localhost:8080/reservatie/afhaaldatum={VulIn}"
    -Om te zoeken op afhaalDatum en status: "http://localhost:8080/reservatie/afhaaldatum={VulIn}/status={VulIn}"
    -Om te zoeken op retourDatum: "http://localhost:8080/reservatie/retourDatum={VulIn}"
    -Om te zoeken op retourDatum en status: "http://localhost:8080/reservatie/retourDatum={VulIn}/status={VulIn}"
    -Om te zoeken op boekingDatum: "http://localhost:8080/reservatie/boekingDatum={VulIn}"
    -Om te zoeken op status:
    -in orde: "http://localhost:8080/reservatie/in-orde"
    -te laat: "http://localhost:8080/reservatie/te-laat"
    -Om aantal reservaties te zien: "http://localhost:8080/reservatie/statusaantal={VulInStatus}"

    !!Datums dienen in LocalDate formaat te staan

Post-request:
    -Om een reservatie toe te voegen: "http://localhost:8080/reservatie/toevoegen"
            bv:{"afhaalDatum": "2024-05-01",
            "retourDatum": "2024-05-08",
            "boekingDatum": "2024-04-30",
            "reden": "Voorbeeld reden",
            "opmerking": "{later door admin gebruikt}",
            "status": "Bezig",
            "producten": [1, 2, 3]}

            statussen: {"Te laat", "Bezig", "Onvolledig", "In orde"}

Put-requests:
    -Om de opmerking van een reservatie bij te werken: "http://localhost:8080/reservatie/{id}/opmerking"
    -Om de status van een reservatie bij te werken: "http://localhost:8080/reservatie/{id}/status"


## Blacklists
Get-requests:
    -Om alle blacklists te zien: "http://localhost:8080/blacklist"
    -Om blacklists te zoeken op gebruikersId: "http://localhost:8080/blacklist/gebruikerId={VulIn}"
    -Om blacklists te zoeken op blacklistDatum: "http://localhost:8080/blacklist/blacklistDatum={VulIn}"

## Beschadigingen
Get-requests: 
    -Om alle beschadigingen te zien: "http://localhost:8080/beschadiging"
    -Om beschadigingen te zoeken op beschadigingsId: "http://localhost:8080/beschadiging/id={VulIn}"
    -Om beschadigingen te zoeken op gebruikerId: "http://localhost:8080/beschadiging/gebruikerid={VulIn}"
    -Om beschadigingen te zoeken op productId: "http://localhost:8080/beschadiging/productid={VulIn}"
    -Om beschadigingen te zoeken op beschadigingsDatum: "http://localhost:8080/beschadiging/beschadigingsdatum={VulIn}" (datum formaat: yyyy-mm-dd bv 2024-05-28)

Post-request:
    -om een beschadiging toe te voegen: "http://localhost:8080/beschadiging/toevoegen"
            bv: {"gebruikerId": "7",
                 "productId": "22",
                 "beschrijving": "kapoetski",
                 "beschadigingsDatum": "2024-05-28"}