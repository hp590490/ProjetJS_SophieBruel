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
    imageWorks.style.height = "100%";
    const titleWorks = document.createElement("h4");
    titleWorks.innerText = work.title;

    worksContainer.appendChild(articleWorks);
    articleWorks.appendChild(imageWorks);
    articleWorks.appendChild(titleWorks);
  }
}
getWorksDisplay(works);
//je vais récupérer les catgories avec un fetch
const responseCategories = await fetch("http://localhost:5678/api/categories");
let categories = await responseCategories.json();
console.log(categories);

//une fois les données de l'API récupérées, on va vouloir afficher ces données sur la page

const btnContainer = document.querySelector(".filtersButtons");
function getCategoriesDisplay() {
  const btnTous = document.createElement("button");
  btnTous.innerText = "Tous";
  btnContainer.appendChild(btnTous);
  for (let i = 0; i < categories.length; i++) {
    const categorie = categories[i];
    const btnCategorie = document.createElement("button");
    btnCategorie.innerText = categorie.name;
    btnContainer.appendChild(btnCategorie);
  }
}

getCategoriesDisplay();

//fonction tri boutons
function filtersDisplay() {
  const buttons = document.querySelectorAll(".filtersButtons button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      //à chaque clic, les boutons redeviennt normaux et le style est appliqué après sur le bouton cliqué
      buttons.forEach((btn) => {
        btn.style.background = "";
        btn.style.color = "";
      });
      worksContainer.innerHTML = "";
      button.style.background = "#1d6154";
      button.style.color = "white";
      if (index === 0) {
        getWorksDisplay(works);
      } else {
        const idCategorie = categories[index - 1].id; // -1 car le premier bouton n'est pas lié à une catégorie
        const filterWorks = works.filter(
          (work) => work.category.id === idCategorie
        );
        getWorksDisplay(filterWorks);
      }
    });
  });
}
filtersDisplay();
