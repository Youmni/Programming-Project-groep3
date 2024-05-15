
/*GELIEVE DEZE FILE GERUST TE LATEN DUS NIETS AANPASSEN*/


-- CREATE TABLE CATEGORIEËN
-- (
-- Categorienr NUMBER(3),
-- Categorienaam VARCHAR2(30) NOT NULL ,
-- CONSTRAINT pk_categorieën_categorienr PRIMARY KEY (Categorienr)
-- );
--
-- CREATE TABLE PRODUCTMODELLEN (
-- Productmodelnr NUMBER(4),
-- Categorienr NUMBER(3),
-- Productmodelnaam VARCHAR2(30) NOT NULL,
-- Productmodelmerk VARCHAR2(20) NOT NULL,
-- Productmodelfoto VARCHAR2(20),
-- Productmodelbeschrijving VARCHAR2(100),
-- CONSTRAINT pk_productmodellen_productnr PRIMARY KEY (Productmodelnr),
-- CONSTRAINT fk_productmodellen_categorienr_categorieën FOREIGN KEY (Categorienr) REFERENCES CATEGORIEËN
-- );
--
-- CREATE TABLE PRODUCTEN (
-- Productid NUMBER(5),
-- Productmodelnr NUMBER(4),
-- Productnaam VARCHAR2(50) NOT NULL,
-- Status VARCHAR2(20) NOT NULL,
-- CONSTRAINT pk_producten_productid PRIMARY KEY (Productid),
-- CONSTRAINT fk_producten_productmodelnr_producten FOREIGN KEY (Productmodelnr) REFERENCES PRODUCTMODELLEN
-- );
--
-- CREATE TABLE GEBRUIKERS (
-- Gebruikerid NUMBER(6),
-- Email VARCHAR2(70) NOT NULL,
-- Wachtwoord VARCHAR2(64) NOT NULL,
-- Titel VARCHAR2(15) NOT NULL,
-- CONSTRAINT pk_gebruikers_gebruikerid PRIMARY KEY (Gebruikerid)
-- );

-- CREATE TABLE RESERVATIES
-- (
-- Reservatienr NUMBER(8),
-- Afhaaldatum DATE NOT NULL,
-- Retourdatum DATE NOT NULL,
-- Boekingdatum DATE NOT NULL,
-- Reservatiereden VARCHAR2(100) NOT NULL,
-- Reservatieopmerking VARCHAR2(100),
-- Gebruikerid NUMBER(6),
-- CONSTRAINT pk_reservaties_reservatienr PRIMARY KEY (Reservatienr),
-- CONSTRAINT fk_reservatie_gebruikerid_gebruikers FOREIGN KEY (Gebruikerid) REFERENCES GEBRUIKERS
-- );

CREATE TABLE PRODUCTRESERVATIES (
Productid NUMBER(5),
Reservatienr NUMBER(8),
CONSTRAINT pk_productenreservaties_productid_reservatienr PRIMARY KEY (Productid, Reservatienr),
CONSTRAINT fk_productenreservaties_productid_producten FOREIGN KEY (Productid) REFERENCES PRODUCTEN,
CONSTRAINT fk_productenreservaties_reservatienr_reservaties FOREIGN KEY (Reservatienr) REFERENCES RESERVATIES
);

DELETE FROM PRODUCTRESERVATIES;

ALTER SESSION set nls_date_format='DD/MM/YYYY';

-- INSERT INTO CATEGORIEËN (Categorienr, Categorienaam) VALUES (1, 'video');
-- INSERT INTO CATEGORIEËN (Categorienr, Categorienaam) VALUES (2, 'audio');
-- INSERT INTO CATEGORIEËN (Categorienr, Categorienaam) VALUES (3, 'varia');
-- INSERT INTO CATEGORIEËN (Categorienr, Categorienaam) VALUES (4, 'xr');
-- INSERT INTO CATEGORIEËN (Categorienr, Categorienaam) VALUES (5, 'belichting');
-- INSERT INTO CATEGORIEËN (Categorienr, Categorienaam) VALUES (6, 'tools');
-- INSERT INTO CATEGORIEËN (Categorienr, Categorienaam) VALUES (7, 'overige');
--
-- INSERT INTO GEBRUIKERS (Gebruikerid, Email, Wachtwoord, Titel) VALUES (1, 'youmni.malha@student.ehb.be', '050984762ba11bba3ccb54d0387047eb773bd79a571a03f8b218cf49ad3a052d', 'student');
-- INSERT INTO GEBRUIKERS (Gebruikerid, Email, Wachtwoord, Titel) VALUES (2, 'senne.clauwaert@student.ehb.be' , 'd98ec3bc81e2504c6ee00b754034026b225f35b9e2a3910e7a07598c482d33e3', 'student');
-- INSERT INTO GEBRUIKERS (Gebruikerid, Email, Wachtwoord, Titel) VALUES (3, 'ruben.dejonckheere@ehb.be', 'b04e95d0b09d1c3846dc2c1df871b44c780a47844534e36cfee5212f181660ae', 'docent');
-- INSERT INTO GEBRUIKERS (Gebruikerid, Email, Wachtwoord, Titel) VALUES (4, 'geert.coulommier@ehb.be' , 'b656a54eda91ebd0d946a9f32808d2970a410a1126078bc59ce63f8d60106eb9', 'docent');
-- INSERT INTO GEBRUIKERS (Gebruikerid, Email, Wachtwoord, Titel) VALUES (5, 'steve.weemaels@ehb.be', 'f148389d080cfe85952998a8a367e2f7eaf35f2d72d2599a5b0412fe4094d65c', 'admin');
-- INSERT INTO GEBRUIKERS (Gebruikerid, Email, Wachtwoord, Titel) VALUES (6, 'amina.ben.taher@ehb.be', 'f487dfce9b26319491f0cee1503257548d2ee2ef39dade348ec280aa60129d62', 'admin');

-- INSERT INTO RESERVATIES (Reservatienr, Afhaaldatum, Retourdatum, Boekingdatum, Reservatiereden, Reservatieopmerking, Gebruikerid)
-- VALUES (1,'25/04/2024', '30/04/2024','22/04/2024', 'nodig voor project', 'zal waarschijnlijk verlerngd worden', 1);

INSERT INTO PRODUCTRESERVATIES (Productid, Reservatienr) VALUES (25,1);
INSERT INTO PRODUCTRESERVATIES (Productid, Reservatienr) VALUES (44,1);
COMMIT;

