<?php

class Contact
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }
    // Méthode pour récupérer la liste des contacts en fonction des filtres et du tri
    public function getContacts($critereTri, $ordreTri, $critereRecherche, $valeurRecherche)
    {
        // Construire la requête SQL en fonction des filtres et du tri
        $sql = "SELECT * FROM contact WHERE 1";

        if (!empty($valeurRecherche)) {
            $sql .= " AND $critereRecherche LIKE :valeurRecherche";
        }
    
        $sql .= " ORDER BY $critereTri $ordreTri";

        // Exécuter la requête SQL
        $stmt = $this->db->prepare($sql);
        if (!empty($valeurRecherche)) {
            $stmt->bindValue(':valeurRecherche', "%$valeurRecherche%");
        }
    
        $stmt->execute();

        // Récupérer les résultats de la requête
        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $contacts;
    }

    // Ajouter d'autres méthodes en fonction des besoins, comme ajouter, éditer, supprimer un contact, etc.
} ?>
