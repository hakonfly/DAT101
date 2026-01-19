"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

// Hjelper: random heltall inkl. begge ender
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hjelper: enkel primtallsjekk med while-løkke
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  let d = 2;
  while (d * d <= n) {
    if (n % d === 0) return false;
    d++;
  }
  return true;
}

/* ---------------- Part 1 ----------------
   To linjer: 1..10 og 10..1 (bygg streng, print én gang per linje)
*/
printOut("--- Part 1 --------------------------------------------");
let up = "";
for (let i = 1; i <= 10; i++) {
  up += (i === 1 ? "" : ",") + i;
}
let down = "";
for (let i = 10; i >= 1; i--) {
  down += (i === 10 ? "" : ",") + i;
}
printOut(up); printOut(newLine);
printOut(down); printOut(newLine);
printOut(newLine);

/* ---------------- Part 2 ----------------
   Guess 1..60 med while – print kun når ferdig
*/
printOut("--- Part 2 --------------------------------------------");
const secret60 = 45; // velg selv
let guess60 = 0;
while (guess60 !== secret60) {
  guess60 = randInt(1, 60);
}
printOut(`Number was ${secret60}, guessed: ${guess60}`); printOut(newLine);
printOut(newLine);

/* ---------------- Part 3 ----------------
   Guess 1..1,000,000 + antall gjett + ms (Date.now)
*/
printOut("--- Part 3 --------------------------------------------");
const secret1M = 456738; // velg selv
let guess1M = 0;
let guesses = 0;
const t0 = Date.now();
while (guess1M !== secret1M) {
  guess1M = randInt(1, 1000000);
  guesses++;
}
const t1 = Date.now();
printOut(`Number was ${secret1M}`); printOut(newLine);
printOut(`Guesses: ${guesses}`); printOut(newLine);
printOut(`Time: ${t1 - t0} ms`); printOut(newLine);
printOut(newLine);

/* ---------------- Part 4 ----------------
   Primtall 2..199 (for + while)
*/
printOut("--- Part 4 --------------------------------------------");
let primesLine = "";
for (let n = 2; n < 200; n++) {
  if (isPrime(n)) primesLine += (primesLine ? "," : "") + n;
}
printOut(primesLine); printOut(newLine);
printOut(newLine);

/* ---------------- Part 5 ----------------
   7 rader x 9 kolonner: K1R1 ... K9R7
*/
printOut("--- Part 5 --------------------------------------------");
for (let r = 1; r <= 7; r++) {
  let rowStr = "";
  for (let k = 1; k <= 9; k++) {
    rowStr += `K${k}R${r}` + (k === 9 ? "" : " ");
  }
  printOut(rowStr); printOut(newLine);
}
printOut(newLine);

/* ---------------- Part 6 ----------------
   5 karakterer (1..236). Regn prosent og A-F.
*/
printOut("--- Part 6 --------------------------------------------");
const maxPoints = 236;

function gradeFromPercent(p) {
  if (p >= 89) return "A";
  if (p >= 77) return "B";
  if (p >= 65) return "C";
  if (p >= 53) return "D";
  if (p >= 41) return "E";
  return "F";
}

let p1 = randInt(1, maxPoints);
let p2 = randInt(1, maxPoints);
let p3 = randInt(1, maxPoints);
let p4 = randInt(1, maxPoints);
let p5 = randInt(1, maxPoints);

function printGrade(label, points) {
  const percent = Math.round((points / maxPoints) * 100);
  const letter = gradeFromPercent(percent);
  printOut(`${label}: ${points} points (${percent}%) => ${letter}`); printOut(newLine);
}

printGrade("Student 1", p1);
printGrade("Student 2", p2);
printGrade("Student 3", p3);
printGrade("Student 4", p4);
printGrade("Student 5", p5);

printOut(newLine);

/* ---------------- Part 7 ----------------
   6 terninger: finn kast til
   - full straight (1..6)
   - 3 pairs
   - 2 + 4 (tower)
   - yahtzee
*/
printOut("--- Part 7 --------------------------------------------");

function roll6() {
  return [
    randInt(1, 6), randInt(1, 6), randInt(1, 6),
    randInt(1, 6), randInt(1, 6), randInt(1, 6)
  ];
}

function countsOf(dice) {
  const c = [0,0,0,0,0,0,0]; // index 1..6
  for (const d of dice) c[d]++;
  return c;
}

function isFullStraight(dice) {
  const c = countsOf(dice);
  for (let i = 1; i <= 6; i++) if (c[i] !== 1) return false;
  return true;
}

function isThreePairs(dice) {
  const c = countsOf(dice);
  let pairs = 0;
  for (let i = 1; i <= 6; i++) if (c[i] === 2) pairs++;
  return pairs === 3;
}

function isTower(dice) { // 2 of a kind + 4 of a kind
  const c = countsOf(dice);
  let has2 = false, has4 = false;
  for (let i = 1; i <= 6; i++) {
    if (c[i] === 2) has2 = true;
    if (c[i] === 4) has4 = true;
  }
  return has2 && has4;
}

function isYahtzee(dice) {
  const c = countsOf(dice);
  for (let i = 1; i <= 6; i++) if (c[i] === 6) return true;
  return false;
}

function simulateUntil(conditionFn) {
  let throws = 0;
  while (true) {
    const dice = roll6();
    throws++;
    if (conditionFn(dice)) return { dice, throws };
  }
}

let r;

r = simulateUntil(isFullStraight);
printOut(r.dice.join(",") + newLine);
printOut("Full straight" + newLine);
printOut(`After ${r.throws} throws!` + newLine + newLine);

r = simulateUntil(isThreePairs);
printOut(r.dice.join(",") + newLine);
printOut("3 pairs" + newLine);
printOut(`After ${r.throws} throws!` + newLine + newLine);

r = simulateUntil(isTower);
printOut(r.dice.join(",") + newLine);
printOut("Tower (2 + 4)" + newLine);
printOut(`After ${r.throws} throws!` + newLine + newLine);

r = simulateUntil(isYahtzee);
printOut(r.dice.join(",") + newLine);
printOut("Yahtzee" + newLine);
printOut(`After ${r.throws} throws!` + newLine);
