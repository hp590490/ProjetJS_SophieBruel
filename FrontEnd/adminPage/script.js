//on va récupérer les datas de l'API (works), tout en catchant si erreur il y a
const responseWorks = await fetch("http://localhost:5678/api/works");
let works = await responseWorks.json();
console.log(works);
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

// Boîte modale
const modalContainer = document.querySelector(".worksModal");

function modalWorksDisplay(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const articleWorks = document.createElement("article");
    const imageWorks = document.createElement("img");
    imageWorks.src = work.imageUrl;
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    modalContainer.appendChild(articleWorks);
    articleWorks.appendChild(imageWorks);
    articleWorks.appendChild(deleteIcon);
  }
}
modalWorksDisplay(works);
