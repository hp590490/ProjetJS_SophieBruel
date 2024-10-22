//on va récupérer les datas de l'API (works), tout en catchant si erreur il y a
const responseWorks = await fetch("http://localhost:5678/api/works");
let works = await responseWorks.json();
// console.log(works);
const worksContainer = document.querySelector(".gallery");

//une fois les données de l'API récupérées, on va vouloir afficher ces données sur la page

function getWorksDisplay(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const articleWorks = document.createElement("article");
    const imageWorks = document.createElement("img");
    imageWorks.src = work.imageUrl;
    imageWorks.style.height = "100%";
    const titleWorks = document.createElement("h4");
    titleWorks.innerText = work.title;

    worksContainer.appendChild(articleWorks);
    articleWorks.appendChild(imageWorks);
    articleWorks.appendChild(titleWorks);
  }
}
getWorksDisplay(works);
//
// Boîtes modales : affichage des works
//
const modalWorksContainer = document.querySelector(".worksModal");

function modalWorksDisplay(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const articleWorks = document.createElement("article");
    //stockage de l'id dans le DOM pour supprimer après
    articleWorks.setAttribute("data-id", work.id);
    const imageWorks = document.createElement("img");
    imageWorks.src = work.imageUrl;
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    modalWorksContainer.appendChild(articleWorks);
    articleWorks.appendChild(imageWorks);
    articleWorks.appendChild(deleteIcon);
  }
}
modalWorksDisplay(works);
//
//supprimer un élément losqu'on clique sur l'icone trash
//
async function deletWorks() {
  modalWorksContainer.addEventListener("click", async (e) => {
    // Vérifie si l'élément cliqué est une icône de suppression
    if (e.target.classList.contains("fa-trash-can")) {
      const deletWork = e.target.closest("article");
      const Id = deletWork.getAttribute("data-id");

      if (!Id) {
        console.error("Impossible de trouver l'ID de l'élément à supprimer.");
        return;
      }

      // Supprimer également l'élément de la base de données
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await fetch(`http://localhost:5678/api/works/${Id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log(`L'élément avec l'ID ${Id} a été supprimé avec succès.`);
          // Supprime l'élément du DOM
          refreshWorks();
          const galleryWork = worksContainer.querySelector(
            `article[data-id="${Id}"]`
          );
          if (galleryWork) {
            galleryWork.remove();
          }
        } else {
          console.error(
            `Erreur lors de la suppression de l'élément avec l'ID ${Id} dans la base de données.`
          );
        }
      } catch (error) {
        console.error("Erreur réseau ou autre lors de la suppression :", error);
      }
    }
  });
}

deletWorks();

//
//Affichage modale
//
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalContent = document.querySelector(".modal-content");
const addPhotoModal = document.querySelector(".addphotomodal");
const itemsModal = document.querySelectorAll(".modal1");
const itemsModal2 = document.querySelectorAll(".modal2");
const backModal = document.querySelector(".back-modal");
const formmodal = document.querySelector(".formmodal2");
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);
function toggleModal() {
  modalContainer.classList.toggle("active");
  console.log(works);
}

addPhotoModal.addEventListener("click", () => {
  itemsModal.forEach((item) => (item.style.display = "none"));
  itemsModal2.forEach((item) => (item.style.display = "block"));
  formmodal.style.display = "flex";
  modalContent.classList.add("active2");
});
function resetModal() {
  const titleModal = document.getElementById("modalTitle");
  itemsModal2.forEach((item) => (item.style.display = "none"));
  itemsModal.forEach((item) => (item.style.display = "grid"));
  titleModal.style.marginTop = "40px";
  addPhotoModal.style.maxWidth = "630px";
  addPhotoModal.style.marginLeft = "195px";
  addPhotoModal.style.marginRight = "195px";
}

backModal.addEventListener("click", () => {
  errormessage.innerText = "";
  resetModal();
});
//
//on va récupérer les catégories et les insérer dans les options du select de la modale2
//
const responseCategories = await fetch("http://localhost:5678/api/categories");
let categories = await responseCategories.json();
console.log(categories);

//une fois les données de l'API récupérées, on va vouloir afficher ces données sur la page

const categoriesModal2 = document.getElementById("categoriemodal2");
const optionVide = document.getElementById("optionnulle");
function getCategoriesDisplay() {
  for (let i = 0; i < categories.length; i++) {
    const categorie = categories[i];
    const optionCategories = document.createElement("option");
    optionCategories.innerText = categorie.name;
    optionCategories.value = categorie.id;
    categoriesModal2.appendChild(optionCategories);
    optionVide.style.display = "none";
  }
}
getCategoriesDisplay();

//
// Modale 2 : ajout de photo
//
//afficher l'image dans l'input type file

document
  .getElementById("fileinputimg")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      // Quand le fichier est chargé
      reader.onload = function (e) {
        const imagePreview = document.getElementById("image-preview");
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
        labelfile.style.display = "none";
        textfile.innerText =
          "Cliquer sur l'image chargée pour pouvoir la remplacer par une autre";
        textfile.style.marginTop = "10px";
      };

      // Lit le fichier comme une URL de données
      reader.readAsDataURL(file);
    }
  });
// Réinitialiser l'input lorsque l'image est cliquée
document.getElementById("image-preview").addEventListener("click", function () {
  const fileInput = document.getElementById("fileinputimg");
  fileInput.value = ""; // Réinitialise l'input
  this.style.display = "none"; // Masque la prévisualisation si nécessaire, évite répétition d'image
  labelfile.style.display = "block"; // Réaffiche le label
  textfile.innerText = "jpg, png : 4mo max"; // Réaffiche le texte
});
//
//inputs modale2
//
const inputsModal2 = document.querySelectorAll("#titre, select, #fileinputimg");
const submitButton = document.querySelector(".btnvalider");
const token = sessionStorage.getItem("authToken");
//fonction vérifie champs de saisie des inputsselect
function checkInputsSaisie() {
  let allFilled = true;
  //si dans input type file ou dans les autres, la valeur est "" alors allFiles est false et la condtion en bas avec comme paramètre allFiled pourra vérifier cela
  inputsModal2.forEach((input) => {
    if (input.type === "file") {
      if (input.files.length === 0) {
        allFilled = false;
      }
    } else {
      if (input.value.trim() === "") {
        allFilled = false;
      }
    }
  });
  if (allFilled === false) {
    submitButton.disabled = true;
    submitButton.classList.remove("enabled");
    errormessage.innerText = "Veuillez remplir tous les champs de saisie";
    errormessage.style.color = "red";
    errormessage.style.marginBottom = "20px";
  } else {
    submitButton.disabled = false;
    submitButton.classList.add("enabled");
    errormessage.innerText = "";
  }
}
inputsModal2.forEach((input) => {
  input.addEventListener("change", checkInputsSaisie);
});

//fonction pour vérifier les champs des inputs

//losqu'il y a submit, on récupère l'image, le titre et la categorie et on l'ajoute à la base de données avec la méthode POST
const formmodal2 = document.querySelector(".formmodal2");

async function refreshWorks() {
  try {
    const responseWorks = await fetch("http://localhost:5678/api/works");
    let works = await responseWorks.json();

    // Vider les conteneurs de la galerie et de la modale avant de les remplir à nouveau
    worksContainer.innerHTML = "";
    modalWorksContainer.innerHTML = "";

    // Afficher à nouveau les travaux
    getWorksDisplay(works);
    modalWorksDisplay(works);
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux:", error);
  }
}

function addPhotoModal2() {
  formmodal2.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = new FormData();
    const file = fileinputimg.files[0];
    if (file) {
      formData.append("image", file);
      const imagePreview = document.getElementById("image-preview");
      imagePreview.style.display = "none";
      labelfile.style.display = "block";
      textfile.style.display = "block";
    }
    formData.append("title", titre.value);
    titre.value = "";
    const categoryId = categoriesModal2.value; // Assurez-vous d'utiliser categoryId
    categoriesModal2.value = "";
    formData.append("category", categoryId);
    //fermer la modale suite au submit
    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        // Gestion des erreurs HTTP spécifiques
        if ([400, 404].includes(response.status)) {
          alert("Impossible d'ajouter le nouveau projet!");
        } else {
          alert("Erreur lors de l'ajout du projet!");
        }
        return;
      }

      // Récupérer la réponse JSON
      const data = await response.json();

      // Mise à jour de la galerie et de la modale avec le nouvel élément
      getWorksDisplay([data]); // Ajouter uniquement le nouveau projet à la galerie
      modalWorksDisplay([data]); // Ajouter le nouveau projet à la modale

      // Réinitialiser la modale
      resetModal();
      modalContainer.classList.remove("active");

      console.log("Projet ajouté avec succès!", data);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }
  });
}
addPhotoModal2();

// setInterval(async () => {
//   const responseWorks = await fetch("http://localhost:5678/api/works");
//   let works = await responseWorks.json();
//   worksContainer.innerHTML = ""; // Effacer l'ancienne galerie
//   getWorksDisplay(works); // Réafficher les travaux
// }, 1000);
