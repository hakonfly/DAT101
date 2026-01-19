import { printOut, newLine } from "../../common/script/utils.mjs";

/** Small helper for consistent headers */
function header(part) {
  printOut(`--- Part ${part} ---`);
  printOut(newLine);
}

/** ---------- Part 1 (no params, no return) ---------- */
function printTodaysDateNorwegian() {
  const today = new Date();
  const formatted = today.toLocaleDateString("no-NB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  printOut(formatted);
  printOut(newLine);
}

/** ---------- Part 2 (returns Date + days until 2XKO) ---------- */
function getTodaysDateObjectAndPrint() {
  const today = new Date();
  const formatted = today.toLocaleDateString("no-NB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  printOut(`Today: ${formatted}`);
  printOut(newLine);
  return today;
}

function daysUntil2XKO(fromDate) {
  // 2XKO release: May 14, 2025
  const releaseDate = new Date(2025, 4, 14); // Month is 0-based => 4 = May

  // Compare dates at midnight to avoid time-of-day issues
  const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const end = new Date(releaseDate.getFullYear(), releaseDate.getMonth(), releaseDate.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((end - start) / msPerDay);
  return diffDays;
}

/** ---------- Part 3 (circle) ---------- */
function printCircleMeasurements(radius) {
  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const area = Math.PI * radius * radius;

  printOut(`Radius: ${radius}`);
  printOut(newLine);
  printOut(`Diameter is ${diameter.toFixed(2)}`);
  printOut(newLine);
  printOut(`Circumference is ${circumference.toFixed(2)}`);
  printOut(newLine);
  printOut(`Area is ${area.toFixed(2)}`);
  printOut(newLine);
}

/** ---------- Part 4 (rectangle object) ---------- */
function printRectangleMeasurements(rect) {
  const width = rect.width;
  const height = rect.height;

  const circumference = 2 * (width + height);
  const area = width * height;

  printOut(`Rectangle width: ${width}, height: ${height}`);
  printOut(newLine);
  printOut(`Circumference is ${circumference.toFixed(2)}`);
  printOut(newLine);
  printOut(`Area is ${area.toFixed(2)}`);
  printOut(newLine);
}

/** ---------- Part 5 (temperature conversion) ---------- */
function convertTemperature(temp, type) {
  const t = String(type).trim().toLowerCase();

  let c, f, k;

  if (t === "c" || t === "celsius") {
    c = temp;
    k = c + 273.15;
    f = (c * 9) / 5 + 32;
  } else if (t === "f" || t === "fahrenheit") {
    f = temp;
    c = ((f - 32) * 5) / 9;
    k = c + 273.15;
  } else if (t === "k" || t === "kelvin") {
    k = temp;
    c = k - 273.15;
    f = (c * 9) / 5 + 32;
  } else {
    printOut("Unknown temperature type!");
    printOut(newLine);
    return;
  }

  // Integers only
  printOut(`Convert ${temp} ${type}`);
  printOut(newLine);
  printOut(`Celsius = ${Math.round(c)}`);
  printOut(newLine);
  printOut(`Fahrenheit = ${Math.round(f)}`);
  printOut(newLine);
  printOut(`Kelvin = ${Math.round(k)}`);
  printOut(newLine);
}

/** ---------- Part 6 (VAT) ---------- */
function priceWithoutVAT(gross, vatGroupText) {
  const group = String(vatGroupText).trim().toLowerCase();

  let vat;
  if (group === "normal") vat = 25;
  else if (group === "food") vat = 15;
  else if (group === "hotel" || group === "transport" || group === "cinema") vat = 10;
  else {
    printOut("Unknown VAT group!");
    printOut(newLine);
    return NaN;
  }

  const net = (100 * gross) / (vat + 100);
  return net;
}

/** ---------- Part 7 (distance/time/speed) ---------- */
function solveDistanceTimeSpeed(distance, time, speed) {
  const missing =
    (distance === undefined ? 1 : 0) +
    (time === undefined ? 1 : 0) +
    (speed === undefined ? 1 : 0);

  if (missing !== 1) return NaN;

  let d = distance;
  let t = time;
  let s = speed;

  if (s === undefined) s = d / t;
  else if (t === undefined) t = d / s;
  else if (d === undefined) d = s * t;

  return { distance: d, time: t, speed: s };
}

/** ---------- Part 8 (pad text) ---------- */
function expandText(text, maxSize, ch, insertAfter) {
  const str = String(text);
  const maxLen = Number(maxSize);
  const padChar = String(ch);

  if (!Number.isFinite(maxLen) || maxLen < 0) return str;

  if (str.length >= maxLen) return str;

  const needed = maxLen - str.length;
  const pad = padChar.repeat(needed);

  return insertAfter ? str + pad : pad + str;
}

/** ---------- Part 9 (math expression test) ---------- */
function sumRange(a, b) {
  // inclusive sum using arithmetic series
  const n = b - a + 1;
  return (n * (a + b)) / 2;
}

function rangeToString(a, b) {
  const nums = [];
  for (let i = a; i <= b; i++) nums.push(i);
  return nums.join(" ");
}

function testMathExpression(lines = 200) {
  let start = 1;

  for (let line = 1; line <= lines; line++) {
    const leftCount = line + 1;
    const rightCount = line;

    const leftStart = start;
    const leftEnd = start + leftCount - 1;

    const rightStart = leftEnd + 1;
    const rightEnd = rightStart + rightCount - 1;

    const leftSum = sumRange(leftStart, leftEnd);
    const rightSum = sumRange(rightStart, rightEnd);

    // Print a few example lines (keeps output readable)
    if (line <= 6) {
      printOut(`${rangeToString(leftStart, leftEnd)} = ${rangeToString(rightStart, rightEnd)}`);
      printOut(newLine);
    }

    if (leftSum !== rightSum) {
      printOut(`FAIL on line ${line}: leftSum=${leftSum}, rightSum=${rightSum}`);
      printOut(newLine);
      printOut(`Left:  ${rangeToString(leftStart, leftEnd)}`);
      printOut(newLine);
      printOut(`Right: ${rangeToString(rightStart, rightEnd)}`);
      printOut(newLine);
      return false;
    }

    start = rightEnd + 1; // next line starts after the last used number
  }

  printOut("Maths fun!");
  printOut(newLine);
  return true;
}

/** ---------- Part 10 (recursive factorial) ---------- */
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) return NaN;
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

/** ================= RUN ALL PARTS ================= */
header(1);
printTodaysDateNorwegian();

header(2);
const todayObj = getTodaysDateObjectAndPrint();
const daysLeft = daysUntil2XKO(todayObj);
if (daysLeft >= 0) {
  printOut(`Days until 2XKO release (May 14, 2025): ${daysLeft}`);
} else {
  printOut(`2XKO release date has passed (${Math.abs(daysLeft)} day(s) ago).`);
}
printOut(newLine);

header(3);
printCircleMeasurements(5);

header(4);
printRectangleMeasurements({ width: 4, height: 3 });

header(5);
convertTemperature(47, "Celsius");
printOut(newLine);
convertTemperature(100, "Fahrenheit");
printOut(newLine);
convertTemperature(300, "Kelvin");

header(6);
const net1 = priceWithoutVAT(100, "normal");
if (!Number.isNaN(net1)) printOut(`100 is ${net1.toFixed(2)} without tax`);
printOut(newLine);

const net2 = priceWithoutVAT(150, "food");
if (!Number.isNaN(net2)) printOut(`150 is ${net2.toFixed(2)} without tax`);
printOut(newLine);

const net3 = priceWithoutVAT(50, "cinema");
if (!Number.isNaN(net3)) printOut(`50 is ${net3.toFixed(2)} without tax`);
printOut(newLine);

const net4 = priceWithoutVAT(80, "goblins");
if (Number.isNaN(net4)) {
  // already printed "Unknown VAT group!"
}

header(7);
const r1 = solveDistanceTimeSpeed(50, 0.67, undefined);
if (!Number.isNaN(r1)) {
  printOut(`Speed = ${r1.speed.toFixed(2)} km/h`); printOut(newLine);
  printOut(`Distance = ${r1.distance.toFixed(2)} km`); printOut(newLine);
  printOut(`Time = ${r1.time.toFixed(2)} h`); printOut(newLine);
}
printOut(newLine);

const r2 = solveDistanceTimeSpeed(120, undefined, 60);
if (!Number.isNaN(r2)) {
  printOut(`Speed = ${r2.speed.toFixed(2)} km/h`); printOut(newLine);
  printOut(`Distance = ${r2.distance.toFixed(2)} km`); printOut(newLine);
  printOut(`Time = ${r2.time.toFixed(2)} h`); printOut(newLine);
}
printOut(newLine);

const r3 = solveDistanceTimeSpeed(undefined, 1.5, 70);
if (!Number.isNaN(r3)) {
  printOut(`Speed = ${r3.speed.toFixed(2)} km/h`); printOut(newLine);
  printOut(`Distance = ${r3.distance.toFixed(2)} km`); printOut(newLine);
  printOut(`Time = ${r3.time.toFixed(2)} h`); printOut(newLine);
}
printOut(newLine);

const r4 = solveDistanceTimeSpeed(undefined, undefined, 50);
if (Number.isNaN(r4)) {
  printOut("More than one parameter is missing -> NaN");
  printOut(newLine);
}

header(8);
const s1 = expandText("This is a text", 25, " ", false);
printOut(`\"${s1}\"`); printOut(newLine);

const s2 = expandText("This is a text", 25, " ", true);
printOut(`\"${s2}\"`); printOut(newLine);

header(9);
testMathExpression(200);

header(10);
const n = 9;
printOut(`factorial(${n}) is ${factorial(n)}`);
printOut(newLine);
