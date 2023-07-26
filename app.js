// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
const form = document.querySelector("form");
const input = document.querySelector("input");
const resultContainer = document.querySelector(".resultContainer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  performSearch();
});

// On exécute le fetch dans une fonction où on récupère la valeur rempli par l'utilisateur de l'input
async function performSearch() {
  const searchInput = document.getElementById("searchInput").value;
  await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      /*On affiche les résultats que l'on souhaite utiliser de l'api*/

      let output = "<ul>";
      data.query.search.forEach((result) => {
        const articleURL = `https://en.wikipedia.org/wiki/${result.title}`;
        output += `<li><a href="${articleURL}" target="_blank">${result.title}</a></li>`;
        output += `<h3>${articleURL}</h3>`;
        output += `<p>${result.snippet}</p></li>`;
      });
      output += "</ul>";

      resultContainer.innerHTML = output;
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des données:",
        error
      );
    });
}
