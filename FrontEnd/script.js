// On va récupérer les data des works avec un fetch dans la fonction fetchWorks puis attribuer cette data à un tableau nommé works

let works = [];
let worksContainer = document.querySelector(".gallery"); // là où sont afficher les works

async function fetchWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (works = data));
  console.log(works);
}

// On va afficher ces données dans une fonction display

async function worksDisplay() {
  await fetchWorks();

  worksContainer.innerHTML = works
    .map(
      (work) =>
        `  <figure>
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
          </figure>
    `
    )
    .join("");
}

worksDisplay();
