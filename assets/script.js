// Fonction pour exécuter le code une fois que la page a été entièrement chargée
document.addEventListener("DOMContentLoaded", function () {
  loadContacts();

  // Récupérer l'élément avec l'ID "valeurRecherche"
  const valeurRechercheElement = document.getElementById("valeurRecherche");

  // Vérifier si l'élément a été trouvé avant d'ajouter un gestionnaire d'événements
  if (valeurRechercheElement) {
    // Ajouter un gestionnaire d'événements pour l'événement "input"
    valeurRechercheElement.addEventListener("input", loadContacts);
    console.log("hello");
  } else {
    console.error("L'élément avec l'ID 'valeurRecherche' n'a pas été trouvé.");
  }

  // Fonction pour charger la liste des contacts
  function loadContacts() {
    const critereTri = document.getElementById("critereTri").value;
    const ordreTri = document.getElementById("ordreTri").value;
    const critereRecherche = document.getElementById("critereRecherche").value;
    const valeurRecherche = document.getElementById("valeurRecherche").value;

    var contactTableHTML =
      "<table><thead><tr>" +
      "<th>Id</th>" +
      "<th>Nom</th>" +
      "<th>Prénom</th>" +
      "<th>Catégorie</th>" +
      "</tr></thead><tbody>";

    $.ajax({
      type: "POST",
      url: "ajax.php",
      data: {
        action: "getContacts",
        critereTri: critereTri,
        ordreTri: ordreTri,
        critereRecherche: critereRecherche,
        valeurRecherche: valeurRecherche,
      },
      dataType: "json",
      success: function (response) {
        console.log("enfin");
        // Vérifier si response est non nulle et contient des contacts
        if (response && response.length > 0) {
          // Il y a des contacts, itérer et construire la table
          $.each(response, function (index, contact) {
            console.log(contact["id"]);
            var contactRow =
              "<tr class='contact-row' data-id='" +
              contact["id"] +
              "' " +
              "data-nom='" +
              contact["nom"] +
              "' " +
              "data-prenom='" +
              contact["prenom"] +
              "' " +
              "data-categorie='" +
              contact["categorie_id"] +
              "'>" +
              "<td>" +
              contact["id"] +
              "</td>" +
              "<td>" +
              contact["nom"] +
              "</td>" +
              "<td>" +
              contact["prenom"] +
              "</td>" +
              "<td>" +
              contact["categorie_id"] +
              "</td>" +
              "</tr>";
            contactTableHTML += contactRow;
          });
        } else {
          // Aucun contact disponible, afficher une ligne spéciale
          contactTableHTML +=
            "<tr><td colspan='4'>Aucun contact disponible</td></tr>";
        }

        // Terminer la construction de la table
        contactTableHTML += "</tbody></table>";
        console.log("Table HTML:", contactTableHTML);

        // Mettre à jour le contenu de #contact-list
        $("#contact-list").html(contactTableHTML);
      },
      error: function (xhr, status, error) {
        console.error("Erreur AJAX :", status, error);
        alert("Erreur de communication avec le serveur.");
        console.log(xhr.responseText);
      },
    });
  }

  // Utilisation de la délégation d'événements de jQuery
  $(document).on("click", ".contact-row", function () {
    var contactDetails = {
      id: $(this).data("id"),
      nom: $(this).data("nom"),
      prenom: $(this).data("prenom"),
      categorie: $(this).data("categorie"),
    };
    openContactPopup(contactDetails);
  });

  function openContactPopup(contactDetails) {
    var modal = document.getElementById("contactPopup");
    var close = document.getElementById("close");
    var titleElement = document.getElementById("contactTitle");
    var detailsElement = document.getElementById("contactDetails");

    // Afficher le titre avec le prénom et le nom du contact
    titleElement.textContent = contactDetails.prenom + " " + contactDetails.nom;
    // Stocker les données du contact dans les attributs data-*
    detailsElement.setAttribute("data-id", contactDetails.id);
    detailsElement.setAttribute("data-nom", contactDetails.nom);
    detailsElement.setAttribute("data-prenom", contactDetails.prenom);
    detailsElement.setAttribute("data-categorie", contactDetails.categorie);
    // Construire le contenu avec toutes les données sur le contact
    var detailsHTML =
      "<p>ID: " +
      contactDetails.id +
      "</p>" +
      "<p>Nom: " +
      contactDetails.nom +
      "</p>" +
      "<p>Prénom: " +
      contactDetails.prenom +
      "</p>" +
      "<p>Catégorie: " +
      contactDetails.categorie +
      "</p>";

    detailsElement.innerHTML = detailsHTML;

    // Afficher la fenêtre modale
    modal.style.display = "block";
    close.addEventListener("click", closeContactpopup);
  }

  function closeContactpopup() {
    var modal = document.getElementById("contactPopup");

    // Fermer la fenêtre modale
    modal.style.display = "none";
  }
  function closeeditContactpopup() {
    var modal = document.getElementById("editContactPopup");

    // Fermer la fenêtre modale
    modal.style.display = "none";
  }
  // Gestionnaire d'événements pour le bouton "Éditer" dans le popup de détails
  $("#editer").on("click", function () {
    var contactDetails = {
      id: $("#contactDetails").data("id"),
      nom: $("#contactDetails").data("nom"),
      prenom: $("#contactDetails").data("prenom"),
      categorie: $("#contactDetails").data("categorie"),
    };
    $("#editNom").val(contactDetails.nom);
    $("#editPrenom").val(contactDetails.prenom);
    $("#editCategorie").val(contactDetails.categorie);
    console.log(contactDetails.prenom);
    openEditContactPopup(contactDetails);
  });

  function openEditContactPopup(contactDetails) {
    console.log(contactDetails.nom);
    var modal = document.getElementById("editContactPopup");
    var close = document.getElementById("closeEdit");
    // Remplissez le formulaire d'édition avec les détails du contact
    $("#editId").val(contactDetails.id);
    $("#editNom").val(contactDetails.nom);
    $("#editPrenom").val(contactDetails.prenom);
    $("#editCategorie").val(contactDetails.categorie);

    // Afficher la fenêtre modale
    modal.style.display = "block";
    close.addEventListener("click", closeeditContactpopup);
  }
  // Gestionnaire d'événements pour le bouton "Annuler" dans le popup d'édition
  $("#cancelEdit").on("click", function () {
    // Cachez le popup d'édition
    $("#editContactPopup").hide();
  });
  // Gestionnaire d'événements pour le formulaire d'édition
  $("#editContactForm").submit(function (event) {
    event.preventDefault();

    // Récupérez les valeurs du formulaire
    var editedNom = $("#editNom").val();
    var editedPrenom = $("#editPrenom").val();
    var editedCategorie = $("#editCategorie").val();

    // Récupérez l'ID du contact à partir du formulaire ou d'un attribut quelconque
    var contactId = ""; // ...

    // Construisez l'objet de données à envoyer via AJAX
    var postData = {
      action: "editContact",
      contactId: contactId,
      editedNom: editedNom,
      editedPrenom: editedPrenom,
      editedCategorie: editedCategorie,
    };

    // Effectuez la requête AJAX pour la mise à jour du contact
    $.ajax({
      type: "POST",
      url: "ajax.php",
      data: postData,
      dataType: "json",
      success: function (response) {
        // Mettez à jour le popup de détails du contact avec les nouvelles informations
        // ...

        // Cachez le popup d'édition
        $("#editContactPopup").hide();

        // Vous pouvez également mettre à jour la table entière si nécessaire
        // ...
      },
      error: function (xhr, status, error) {
        console.error("Erreur AJAX lors de la mise à jour :", status, error);
        alert("Erreur lors de la mise à jour du contact.");
        console.log(xhr.responseText);
      },
    });
  });

  // Gestionnaire d'événements pour le bouton "Annuler" dans le popup d'édition
  $("#cancelEdit").on("click", function () {
    // Cachez le popup d'édition
    $("#editContactPopup").hide();
  });
});
