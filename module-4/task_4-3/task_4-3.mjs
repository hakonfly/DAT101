"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

const task3Statements = {
  1: "Cat is an animal!",
  2: "Volvo is a car!",
  3: "Rose is a flower!",
  4: "Donald Trump is a human being!",
  5: "Dette er en test",
};

const txtRectWidth = document.getElementById("txtRectWidth");
const txtRectHeight = document.getElementById("txtRectHeight");
const cmbTask1Calculate = document.getElementById("cmbTask1Calculate");
const txtTask1Output = document.getElementById("txtTask1Output");

const txtTask2Word = document.getElementById("txtTask2Word");
const txtTask2Output = document.getElementById("txtTask2Output");
const task2Words = [];

const chkTask3 = document.getElementsByName("chkTask3");
const cmbTask3CheckAnswer = document.getElementById("cmbTask3CheckAnswer");
const txtTask3Output = document.getElementById("txtTask3Output");

const divTask4Cars = document.getElementById("divTask4Cars");
const txtTask4Output = document.getElementById("txtTask4Output");

const selectTask5Animals = document.getElementById("selectTask5Animals");
const txtTask5Output = document.getElementById("txtTask5Output");

const selectTask6Girls = document.getElementById("selectTask6Girls");
const txtTask6Output = document.getElementById("txtTask6Output");

const txtMovieTitle = document.getElementById("txtMovieTitle");
const selectMovieGenre = document.getElementById("selectMovieGenre");
const txtMovieDirector = document.getElementById("txtMovieDirector");
const txtMovieRate = document.getElementById("txtMovieRate");
const cmbAddMovie = document.getElementById("cmbAddMovie");
const tblMovies = document.getElementById("tblMovies");
const movies = [];

function cmbTask1CalculateClick() {
  const width = Number(txtRectWidth.value);
  const height = Number(txtRectHeight.value);
  const circumference = 2 * (width + height);
  const area = width * height;

  txtTask1Output.textContent = `Circumference = ${circumference}, Area = ${area}`;
}

function renderTask2Words() {
  txtTask2Output.textContent = `Number of words = ${task2Words.length}. Words: ${task2Words.join(", ")}`;
}

function txtTask2WordKeyPress(event) {
  if (event.key !== "Enter") {
    return;
  }

  const word = txtTask2Word.value.trim();
  if (word !== "") {
    task2Words.push(word);
  }

  txtTask2Word.value = "";
  renderTask2Words();
}

function cmbTask3CheckAnswerClick() {
  const selectedStatements = [];

  for (const checkbox of chkTask3) {
    if (checkbox.checked) {
      selectedStatements.push(task3Statements[checkbox.value]);
    }
  }

  if (selectedStatements.length === 0) {
    txtTask3Output.textContent = "No answers selected.";
    return;
  }

  txtTask3Output.textContent = `You selected ${selectedStatements.length}: ${selectedStatements.join(" | ")}`;
}

function task4CarRadioChange(event) {
  txtTask4Output.textContent = `You selected: ${event.target.dataset.caption}`;
}

function createTask4Cars() {
  for (const carType of CarTypes) {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    const caption = document.createElement("span");
    const lineBreak = document.createElement("br");

    radio.type = "radio";
    radio.name = "radioTask4Cars";
    radio.value = String(carType.value);
    radio.dataset.caption = carType.caption;
    radio.addEventListener("change", task4CarRadioChange);

    caption.textContent = `${carType.caption}`;

    label.appendChild(radio);
    label.appendChild(caption);
    divTask4Cars.appendChild(label);
    divTask4Cars.appendChild(lineBreak);
  }
}

function selectTask5AnimalsChange() {
  const selectedOption = selectTask5Animals.options[selectTask5Animals.selectedIndex];
  txtTask5Output.textContent = `You selected: ${selectedOption.text}`;
}

function fillTask6Girls() {
  for (const girlName of GirlsNames) {
    const option = document.createElement("option");
    option.value = girlName;
    option.text = girlName;
    selectTask6Girls.add(option);
  }
}

function selectTask6GirlsChange() {
  txtTask6Output.textContent = `You selected: ${selectTask6Girls.value}`;
}

function fillMovieGenres() {
  for (const genre of MovieGenre) {
    const option = document.createElement("option");
    option.value = genre;
    option.text = genre;
    selectMovieGenre.add(option);
  }
}

function addMovieRow(movie) {
  const row = tblMovies.insertRow(-1);
  const cells = [];

  for (let index = 0; index < 5; index++) {
    cells.push(row.insertCell(-1));
  }

  cells[0].textContent = String(movies.length);
  cells[1].textContent = movie.title;
  cells[2].textContent = movie.genre;
  cells[3].textContent = movie.director;
  cells[4].textContent = String(movie.rate);
}

function cmbAddMovieClick() {
  const movie = {
    title: txtMovieTitle.value.trim(),
    genre: selectMovieGenre.value,
    director: txtMovieDirector.value.trim(),
    rate: Number(txtMovieRate.value),
  };

  movies.push(movie);
  addMovieRow(movie);

  txtMovieTitle.value = "";
  txtMovieDirector.value = "";
  txtMovieRate.value = 5;
}

cmbTask1Calculate.addEventListener("click", cmbTask1CalculateClick);
txtTask2Word.addEventListener("keypress", txtTask2WordKeyPress);
cmbTask3CheckAnswer.addEventListener("click", cmbTask3CheckAnswerClick);
selectTask5Animals.addEventListener("change", selectTask5AnimalsChange);
selectTask6Girls.addEventListener("change", selectTask6GirlsChange);
cmbAddMovie.addEventListener("click", cmbAddMovieClick);

createTask4Cars();
fillTask6Girls();
fillMovieGenres();
renderTask2Words();
selectTask5AnimalsChange();
selectTask6GirlsChange();
