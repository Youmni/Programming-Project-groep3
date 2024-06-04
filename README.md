# MediaLabEhb

## Overzicht
Een platform voor het eenvoudig reserveren van producten en efficiënte administratie. Ons platform biedt zowel efficiëntie voor de admin als voor de gebruiker.

## Functies
- **Reservatie van producten**: We bieden aan de gebruikers een vlotte, simpele en duidelijke manier van reserveren.
- **Efficiente manier van werken voor de administartor**: De admin krijgt een centrale plaats voor het beheren.
- **Overzicht van het inventaris**: De student/docent krijgt een overzicht van het inventaris.

## Installatie

### Vereisten

- [Oracle OpenJDK](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Node.js](https://nodejs.org/)

### Stappen

1. Clone de repository en navigeer naar de projectdirectory.

### Back-end

1. Ga naar /Back-end
2. Build Gradle
3. Selecteer onder "project structure" in de settings je SDK. Oracle OpenJDK version 21 is vereist: [Oracle OpenJDK](https://www.oracle.com/java/technologies/javase-downloads.html)
4. Voeg een applictation.properties file toe onder Programming-Project-groep3\Back-end\src\main\resources --> de inhoud van deze file is terug te vinden op de Teams van groep 3
5. Als deze application.properties file is toegevoegd en Gradle is ingeladen, kan de BackEndApplication gestart worden en dan draait de server (Indien u zich niet op Campus Kaai (Erasmushogeschool Brussel) bevindt, dient u een vpn connectie aan te zetten)

### Front-end

1. Ga naar /Front-end
2. Node.js is vereist: [Node.js](https://nodejs.org/)
3. Open de terminal
4. Type: npm install
5. Type: npm run dev
6. U kan nu via het gegeven domein het project bekijken

## Hoe werkt het?

### Admin

1. Log in
2. U bevind zich op het dashboard waar u een overzicht krijgt van wat er allemaal binnen moet vandaag
3. U kan u via de sidebar naar de gewenste pagina gaan

### User

1. Log in
2. Via de search bar in de header kan u direct producten opzoeken en reserveren
3. Via de homepage kan u uw actieve reservaties zien, het inventaris bekijken (alles of via categorie) en via daar dan ook reservereren
4. Via u profiel kan u voorboekingen annuleren en over het algemeen alle info over u reservaties zien
5. Via u gesschiedenis die bereikbaar is via u profile kan u items opnieuw reserveren

## Technologiën

**Client:** React JS, Tailwind CSS

**Server:** Oracle DB, Spring boot


## Gebruikte libraries
- [Notistack](https://www.npmjs.com/package/notistack)
- [Axios](https://axios-http.com/docs/intro)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Jwt-decode](https://www.npmjs.com/package/notistack)
- [React js](https://react.dev/)
- [react-dom](https://legacy.reactjs.org/docs/react-dom.html)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-datepicker](https://www.npmjs.com/package/react-datepicker)
- [Spring Boot Data JPA](https://www.npmjs.com/package/bcryptjs)
- [Spring Boot JDBC](https://spring.io/guides/gs/relational-data-access)
- [Spring Boot Web](https://spring.io/guides/gs/spring-boot)
- [Spring Boot Validation](https://spring.io/guides/gs/validating-form-input)
- [H2 Database](https://www.h2database.com/html/main.html)
- [Oracle JDBC Driver](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html)
- [Spring Boot Mail](https://www.baeldung.com/spring-email)
- [Spring Boot Security](https://spring.io/guides/gs/securing-web)
- [Nimbus JOSE + JWT](https://connect2id.com/products/nimbus-jose-jwt)
- [Spring Security Config](https://spring.io/projects/spring-security)
- [Spring Boot OAuth2 Client](https://spring.io/guides/tutorials/spring-boot-oauth2)

## Gebruikte bronnen en documentatie
- [ChatGPT JWT-token hulp](https://chatgpt.com/share/c8861603-c97a-44e1-a80b-cc83cbc150d5)
- [ChatGPT React JS route security hulp](https://chatgpt.com/share/a0268d33-7462-4fb6-9c37-643fb92d03d4)
- [JWT-token](https://connect2id.com/products/nimbus-jose-jwt)
- [Bcrypt](https://www.baeldung.com/spring-security-registration-password-encoding-bcrypt)
- [Spring boot](https://spring.io/projects/spring-boot)
- [Tailwind](https://tailwindcss.com/docs/)
- [React JS](https://react.dev/learn)
- Cursus: Java Spring + hibernate van David Van Steertegem

## Auteurs
- [@Youmni Malha](https://github.com/Youmni)
- [@Thomas Van der Borght](https://github.com/ThomasVanderBorght)
- [@Senne Clauwaert](https://github.com/clauwaesenne)
