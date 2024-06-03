Om de backend aan te zetten open je het github project best in intellij. 
Na het openen van het project mag je niet vergeten de GRADLE te builden.
Indien je je niet op erasmus campus Kaai bevindt,
en niet verbonden bent met de wifi op deze campus moet je de vpn aanzetten van erasmus hogeschool.
Vergeet ook niet de applications.properties toe te voegen onder back-end/src/main/resources.
voeg onderstaande code toe aan applications.properties en pas waar nodig aan.

de code:
#database
spring.application.name=Back-end
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc: zie teams groep 3 voor datasource url
spring.datasource.username=groep3
spring.datasource.password=Zie groep 3 op teams voor database wachtwoord

#mail
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=uitleendienst.ehb.kaai@gmail.com
spring.mail.password=Zie groep 3 op teams voor email pass wachtwoord
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

#jwt secret
jwt.secret=Zie groep 3 op teams voor jwt secret

vergeet ook niet de database toe te voegen in intellij onder database, oracle, service name

host: 10.2.16.21
port: 1521
service: orclpdb.ehb.local
driver: thin
username: groep 3
password: Zie groep 3 op teams voor database wachtwoord

Zodra de gradle gebuild is en de application.properties aangemaakt is kan je de BackEndApplication starten.

bronnen:
spring boot: https://docs.spring.io/spring-boot/documentation.html
nimbus jwt token: https://connect2id.com/products/nimbus-jose-jwt
mede mogelijk door cursus Java Spring + hibernate van David Van Steertegem