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
    const titleWorks = document.createElement("h4");
    titleWorks.innerText = work.title;

    worksContainer.appendChild(articleWorks);
    articleWorks.appendChild(imageWorks);
    articleWorks.appendChild(titleWorks);
  }
}
getWorksDisplay(works);

// Boîtes modale
const modalWorksContainer = document.querySelector(".worksModal");

function modalWorksDisplay(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const articleWorks = document.createElement("article");
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
// SUPPRESSION DES TRAVAUX
const deleteIcon = document.querySelector(".fa-trash-can");
deleteIcon.addEventListener("click", (e) => {
  console.log(e.target);
});
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalContent = document.querySelector(".modal-content");
const addPhotoModal = document.querySelector(".addphotomodal");
const itemsModal = document.querySelectorAll(".modal1");
const itemsModal2 = document.querySelectorAll(".modal2");
const backModal = document.querySelector(".back-modal");
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
  modalContent.classList.add("active2");
});
backModal.addEventListener("click", () => {
  const titleModal = document.getElementById("modalTitle");
  itemsModal2.forEach((item) => (item.style.display = "none"));
  itemsModal.forEach((item) => (item.style.display = "grid"));
  titleModal.style.marginTop = "40px";
  addPhotoModal.style.maxWidth = "630px";
  addPhotoModal.style.marginLeft = "195px";
  addPhotoModal.style.marginRight = "195px";
});

//on va récupérer les catégories et les insérer dans les options du select de la modale2

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
    categoriesModal2.appendChild(optionCategories);
    optionVide.style.display = "none";
  }
}
getCategoriesDisplay();
