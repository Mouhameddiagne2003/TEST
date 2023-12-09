<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <div class="container">
        <div class="titre-page">
            <h1>Carnet de Contact</h1>
        </div>
        <div class="main-content">
            <div class="table-details">
                <div class="title" style="color:aliceblue">
                    Liste des contacts
                </div>
                <div class="option-container">
                    <div class="tri-div">
                        <h2>Tri</h2>
                        <label for="critereTri">Critère de tri:</label>
                        <select id="critereTri">
                            <option value="id">ID</option>
                            <option value="nom">Nom</option>
                            <option value="prenom">Prénom</option>
                            <option value="categorie_id">Catégorie</option>
                        </select>

                        <label for="ordreTri">Ordre de tri:</label>
                        <select id="ordreTri">
                            <option value="ASC">Croissant</option>
                            <option value="DESC">Décroissant</option>
                        </select>
                    </div>

                    <div class="recherche-div">
                        <h2>Recherche</h2>
                        <label for="critereRecherche">Critère de recherche:</label>
                        <select id="critereRecherche">
                            <option value="nom">Nom</option>
                            <option value="prenom">Prénom</option>
                            <option value="categorie_id">Catégorie</option>
                        </select>

                        <label for="valeurRecherche">Valeur de recherche:</label>
                        <input type="text" id="valeurRecherche" placeholder="Entrez la valeur">
                    </div>
                </div>

            </div>
            <div id="contact-list" class="contact-list">
                <!-- Liste des contacts affichée ici -->
            </div>
        </div>

    </div>
    <!-- Popups -->
    <!-- Contact info Popup -->
    <div id="contactPopup" class="popup">
        <div class="popup-content">
            <span class="close" id="close">&times;</span>
            <h2 id="contactTitle"></h2>
            <div id="contactDetails"></div>
            <button id="editer">Éditer le contact</button>
        </div>
    </div>

    <!-- Formulaire de contact popup -->
    <!-- Popup d'édition du contact -->
    <div id="editContactPopup" class="popup2">
        <div class="popup-content">
            <span class="close" id="closeEdit">&times;</span>
            <h2>Édition du contact</h2>
            <form id="editContactForm">
            <label for="editNom">Id:</label>
                <input type="text" id="editId" name="editId" required>
                <label for="editNom">Nom:</label>
                <input type="text" id="editNom" name="editNom" required>
                <label for="editPrenom">Prénom:</label>
                <input type="text" id="editPrenom" name="editPrenom" required>
                <label for="editCategorie">Catégorie:</label>
                <input type="text" id="editCategorie" name="editCategorie" required>
                <button type="submit">Enregistrer</button>
                <button type="button" id="cancelEdit">Annuler</button>
            </form>
        </div>
    </div>


       <!-- Inclure jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="assets/script.js"></script>
 

</body>
</html>
