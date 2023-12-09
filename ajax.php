
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Inclure les fichiers nécessaires et les classes
include 'config/database.php';
include 'contact.class.php';
// Créer une instance de la classe Contact
$contactHandler = new Contact($conn);

// Vérifier si une action est définie dans la requête Ajax
if (isset($_POST['action']) && isset($_POST['critereTri']) && isset($_POST['ordreTri']) && isset($_POST['critereRecherche']) && isset($_POST['valeurRecherche'])) {
    
    $action = $_POST['action'];
    $critereTri = $_POST['critereTri'];
    $ordreTri = $_POST['ordreTri'];
    $critereRecherche = $_POST['critereRecherche'];
    $valeurRecherche = $_POST['valeurRecherche'];
    

    // Gérer différentes actions
    switch ($action) {
        case 'getContacts':
            // Action : Récupérer la liste des contacts
            $contacts = $contactHandler->getContacts($critereTri,$ordreTri,$critereRecherche,$valeurRecherche);
            echo json_encode($contacts);
            break;

        // case 'addContact':
        //     // Action : Ajouter un nouveau contact
        //     $nom = $_POST['nom'];
        //     $prenom = $_POST['prenom'];
        //     $categorie_id = $_POST['categorie_id'];

        //     $result = $contactHandler->addContact($nom, $prenom, $categorie_id);
        //     echo json_encode(['success' => $result]);
        //     break;

        // Ajoutez d'autres cas pour d'autres actions si nécessaire

        default:
            echo json_encode(['error' => 'Action non reconnue']);
            break;
    }
} else {
    echo json_encode(['error' => 'Aucune action spécifiée']);
}

?>
