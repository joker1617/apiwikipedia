// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultContainer = document.querySelector(".resultContainer");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  // Affichage du message d'erreur si pas de texte écrit dans l'input

  if (input.value === "") {
    errorMsg.textContent = "Wops, veuillez remplir l'input";
    return;
  } else {
    // Sinon remise à 0 du message d'erreur
    errorMsg.textContent = "";
    // Affichage du loader
    loader.computedStyleMap.display = "flex";
    // Remise à 0 des réponses
    resultContainer.textContent = "";
    // Appel de la fonction avec en paramètre la valeur de l'input
    performSearch(input.value);
  }
}

// On exécute le fetch dans une fonction où on récupère la valeur rempli par l'utilisateur de l'input
async function performSearch(searchInput) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    console.log(response);
    // Si le statue de la réponse n'est pas ok, affiche l'erreur
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    createCards(data.query.search);
  } catch (error) {
    // Si il y a une erreur, affiche le message de l'erreur + cache le loader
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function createCards(data) {
  if (!data.length) {
    // Si pas de data, envoi un message d'erreur + cache le loader
    errorMsg.textContent = "Wopsy, aucun résultat";
    loader.style.display = "none";
    return;
  }
  data.forEach((el) => {
    // Crée une card pour chaque élément de réponse
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `
    <h3 class="result-item";
      <a href=${url} target="_blank">${el.title}</a>
      </h3>
      <a href=${url} class="result-link" target="_blank">${url}</a>
      <span class="result-snippet">${el.snippet}</span>
      <br>
    `;
    resultContainer.appendChild(card);
  });
  // Cache le loader
  loader.style.display = "none";
}
