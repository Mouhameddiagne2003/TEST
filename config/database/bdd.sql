CREATE TABLE categorie (
    id INT AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    CONSTRAINT pk_categorie PRIMARY KEY (id)
);
CREATE TABLE contact (
    id INT AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    categorie_id INT,
    CONSTRAINT pk_contact PRIMARY KEY (id),
    CONSTRAINT fk_contact_categorie FOREIGN KEY (categorie_id) REFERENCES categorie(id)
);
