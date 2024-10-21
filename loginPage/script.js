const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  "input[type=text], input[type=password]"
);
let email, password;

// on va créer une fonction d'affichage en cas d'erreur dans les inputs
function errorDisplay(tag, message, valid) {
  const container = document.querySelector("." + tag + "container");
  const span = document.querySelector("." + tag + "container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
}
// on va créer une fonction pour vérifier la valeur dans l'input email
function emailChecker(value) {
  if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
}

// on va créer une fonction pour vérifier la valeur dans l'input password

function passwordChecker(value) {
  if (!value.match(/^(?=.*?[A-Z])(?=.*\d)(?=.*?[a-z]).{6,}$/)) {
    errorDisplay(
      "password",
      "Minimum de 6 caractères et une lettre majuscule (caractères spéciaux interdits)"
    );
    password = null;
  } else {
    errorDisplay("password", "", true);
    password = value;
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  if (email && password) {
    e.preventDefault();
    let userData = {
      email: `${email}`,
      password: `${password}`,
    };
    async function loginUser(userData) {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      // responseData contient maintenant les données
      if (responseData.message === "user not found") {
        e.preventDefault();
        const idError = document.querySelector(".iderror");
        idError.innerHTML = `<p>Utilisateur inconnu, veuillez vérifier votre e-mail et/ou votre mot de passe.</p>`;
        idError.style.color = "red";
        idError.style.marginBottom = "20px";
      } else if (responseData.error) {
        e.preventDefault();
        const idError = document.querySelector(".iderror");
        idError.innerHTML = `<p>Utilisateur inconnu, veuillez vérifier votre e-mail et/ou votre mot de passe.</p>`;
        idError.style.color = "red";
        idError.style.marginBottom = "20px";
      } else {
        sessionStorage.setItem("authToken", responseData.token);
        window.location.href = "../FrontEnd/adminPage/index.html";
      }
      return responseData;
    }
    // Appel de la fonction
    (async () => {
      const data = await loginUser(userData);
      console.log(data); // Utiliser les données en dehors de la fonction si besoin
    })();
  } else {
    e.preventDefault();
    alert("Veuillez remplir correctement les champs");
  }
});
