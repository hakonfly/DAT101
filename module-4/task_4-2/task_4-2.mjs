"use strict";

import { printOut } from "../../common/script/utils.mjs";

const numbersOneToTwenty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const girlNames = [
  "Anne",
  "Inger",
  "Kari",
  "Marit",
  "Ingrid",
  "Liv",
  "Eva",
  "Berit",
  "Astrid",
  "Bjørg",
  "Hilde",
  "Anna",
  "Solveig",
  "Marianne",
  "Randi",
  "Ida",
  "Nina",
  "Maria",
  "Elisabeth",
  "Kristin",
];

const boyNames = [
  "Jakob",
  "Lucas",
  "Emil",
  "Oskar",
  "Oliver",
  "William",
  "Filip",
  "Noah",
  "Elias",
  "Isak",
  "Henrik",
  "Aksel",
  "Kasper",
  "Mathias",
  "Jonas",
  "Tobias",
  "Liam",
  "Håkon",
  "Theodor",
  "Magnus",
];

const EWeekDays = {
  WeekDay1: { value: 0x01, name: "Mandag" },
  WeekDay2: { value: 0x02, name: "Tirsdag" },
  WeekDay3: { value: 0x04, name: "Onsdag" },
  WeekDay4: { value: 0x08, name: "Torsdag" },
  WeekDay5: { value: 0x10, name: "Fredag" },
  WeekDay6: { value: 0x20, name: "Lørdag" },
  WeekDay7: { value: 0x40, name: "Søndag" },
  Workdays: { value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10, name: "Arbeidsdager" },
  Weekends: { value: 0x20 + 0x40, name: "Helg" },
};

function printSection(title) {
  printOut(`--- ${title} ---`);
}

function printBlankLine() {
  printOut("");
}

function randomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeElementFromArray(sourceArray, textToRemove) {
  const index = sourceArray.indexOf(textToRemove);

  if (index === -1) {
    printOut(`"${textToRemove}" does not exist in the array.`);
    return false;
  }

  sourceArray.splice(index, 1);
  printOut(`"${textToRemove}" was removed from the array.`);
  return true;
}

class TBook {
  #title;
  #author;
  #isbn;

  constructor(title, author, isbn) {
    this.#title = title;
    this.#author = author;
    this.#isbn = isbn;
  }

  toString() {
    return `${this.#title} by ${this.#author} (ISBN: ${this.#isbn})`;
  }
}

const randomNumbers = [];
for (let index = 0; index < 35; index++) {
  randomNumbers.push(randomIntInclusive(1, 20));
}

const sortedAscending = [...randomNumbers].sort((left, right) => left - right);
const sortedDescending = [...randomNumbers].sort((left, right) => right - left);

printSection("Part 1");
let part1Line = "";
for (let index = 0; index < numbersOneToTwenty.length; index++) {
  part1Line += (index === 0 ? "" : ", ") + numbersOneToTwenty[index];
}
printOut(part1Line);
printBlankLine();

printSection("Part 2");
printOut(numbersOneToTwenty.join(" | "));
printBlankLine();

printSection("Part 3");
const greetingText = "Hei på deg, hvordan har du det?";
const words = greetingText.replace(/[?,.!]/g, "").split(" ");
for (let index = 0; index < words.length; index++) {
  printOut(`Word number ${index + 1}, index ${index}: ${words[index]}`);
}
printBlankLine();

printSection("Part 4");
const editableGirlNames = [...girlNames];
printOut(`Before removal: ${editableGirlNames.join(", ")}`);
removeElementFromArray(editableGirlNames, "Hilde");
removeElementFromArray(editableGirlNames, "Siri");
printOut(`After removal: ${editableGirlNames.join(", ")}`);
printBlankLine();

printSection("Part 5");
const allNames = [];
allNames.push(...girlNames);
allNames.push(...boyNames);
printOut(`Merged array length: ${allNames.length}`);
printOut(allNames.join(", "));
printBlankLine();

printSection("Part 6");
const books = [
  new TBook("The Hobbit", "J.R.R. Tolkien", "978-0547928227"),
  new TBook("Clean Code", "Robert C. Martin", "978-0132350884"),
  new TBook("Sofies verden", "Jostein Gaarder", "978-8203242775"),
];
for (const book of books) {
  printOut(book.toString());
}
printBlankLine();

printSection("Part 7");
const weekDayKeys = Object.keys(EWeekDays);
printOut(`Keys: ${weekDayKeys.join(", ")}`);
for (const key of weekDayKeys) {
  const element = EWeekDays[key];
  printOut(`${key} => value: ${element.value}, name: ${element.name}`);
}
printBlankLine();

printSection("Part 8");
printOut(`Original: ${randomNumbers.join(", ")}`);
printOut(`Ascending: ${sortedAscending.join(", ")}`);
printOut(`Descending: ${sortedDescending.join(", ")}`);
printBlankLine();

printSection("Part 9");
const frequencyByNumber = {};
for (const number of randomNumbers) {
  frequencyByNumber[number] = (frequencyByNumber[number] ?? 0) + 1;
}

const frequencyEntries = Object.entries(frequencyByNumber)
  .map(([number, frequency]) => ({ number: Number(number), frequency }))
  .sort((left, right) => left.number - right.number);

printOut("Numbers and frequency:");
for (const entry of frequencyEntries) {
  printOut(`${entry.number} => ${entry.frequency}`);
}

const sortedByFrequency = [...frequencyEntries].sort((left, right) => {
  if (right.frequency !== left.frequency) {
    return right.frequency - left.frequency;
  }
  return left.number - right.number;
});

const frequencyGroups = new Map();
for (const entry of sortedByFrequency) {
  if (!frequencyGroups.has(entry.frequency)) {
    frequencyGroups.set(entry.frequency, []);
  }
  frequencyGroups.get(entry.frequency).push(entry.number);
}

printOut("Frequency and matching numbers:");
for (const [frequency, numbers] of frequencyGroups) {
  printOut(`${frequency} => ${numbers.join(", ")}`);
}
printBlankLine();

printSection("Part 10");
const rows = 5;
const columns = 9;
const twoDimensionalArray = [];

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  const row = [];
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    row.push(`R${rowIndex + 1}C${columnIndex + 1}`);
  }
  twoDimensionalArray.push(row);
}

for (let rowIndex = 0; rowIndex < twoDimensionalArray.length; rowIndex++) {
  let rowText = "";
  for (let columnIndex = 0; columnIndex < twoDimensionalArray[rowIndex].length; columnIndex++) {
    rowText += (columnIndex === 0 ? "" : " | ") + twoDimensionalArray[rowIndex][columnIndex];
  }
  printOut(rowText);
}
