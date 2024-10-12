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
//je vais récupérer les catgories avec un fetch
const responseCategories = await fetch("http://localhost:5678/api/categories");
let categories = await responseCategories.json();
console.log(categories);

//une fois les données de l'API récupérées, on va vouloir afficher ces données sur la page

const btnContainer = document.querySelector(".buttons");
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

let button0 = document.querySelector("button:nth-child(1)");
let button1 = document.querySelector("button:nth-child(2)");
let button2 = document.querySelector("button:nth-child(3)");
let button3 = document.querySelector("button:nth-child(4)");

button0.addEventListener("click", () => {
  worksContainer.innerHTML = "";
  return getWorksDisplay(works);
});

button1.addEventListener("click", () => {
  let idCategorie = categories[0].id;
  const WorksObjects = works.filter(function (work) {
    return work.category.id === idCategorie;
  });
  worksContainer.innerHTML = "";
  getWorksDisplay(WorksObjects);
  console.log(WorksObjects);
});

button2.addEventListener("click", () => {
  let idCategorie2 = categories[1].id;
  const WorksApparts = works.filter(function (work) {
    return work.category.id === idCategorie2;
  });
  worksContainer.innerHTML = "";
  getWorksDisplay(WorksApparts);
  console.log(WorksApparts);
});

button3.addEventListener("click", () => {
  let idCategorie3 = categories[2].id;
  const WorksHotels = works.filter(function (work) {
    return work.category.id === idCategorie3;
  });
  worksContainer.innerHTML = "";
  getWorksDisplay(WorksHotels);
  console.log(WorksHotels);
});

// works.map((work) => {
//   const articleWorks = document.createElement("article");
//   const imageWorks = document.createElement("img");
//   imageWorks.src = work.imageUrl;
//   const titleWorks = document.createElement("h4");
//   titleWorks.innerText = work.title;
//   worksContainer.appendChild(articleWorks);
//   articleWorks.appendChild(imageWorks);
//   articleWorks.appendChild(titleWorks);
// });

// async function getWorksData() {
//   const url = "http://localhost:5678/api/works";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const works = await response.json();
//     console.log(works);
//   } catch (error) {
//     console.error(error.message);
//   }
// }
