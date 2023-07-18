// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
const form = document.querySelector("form");
const resultContainer = document.querySelector(".resultContainer");

async function fetchResearch() {
  await fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=cat"
  );
  console.log(data);
  //     .then((res) => res.json())
  //     .then((data) => (researchData = data));

  //   console.log(researchData);
  //   researchDisplay();
}
