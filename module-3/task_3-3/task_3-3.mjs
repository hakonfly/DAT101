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
    const value = Number(temp);

      if (Number.isNaN(value)) {
    printOut(`Invalid temperature: ${temp}`);
    printOut(newLine);
    return;
  }

  let c, f, k;

  if (t === "c" || t === "celsius") {
    c = value;
    k = c + 273.15;
    f = (c * 9) / 5 + 32;
  } else if (t === "f" || t === "fahrenheit") {
    f = value;
    c = ((f - 32) * 5) / 9;
    k = c + 273.15;
  } else if (t === "k" || t === "kelvin") {
    k = value;
    c = k - 273.15;
    f = (c * 9) / 5 + 32;
  } else {
    printOut("Unknown temperature type!");
    printOut(newLine);
    return;
  }

  // Integers only
  printOut(`Convert ${value} ${type}`);
  printOut(newLine);
  printOut(`Celsius = ${Math.round(c)}`);
  printOut(newLine);
  printOut(`Fahrenheit = ${Math.round(f)}`);
  printOut(newLine);
  printOut(`Kelvin = ${Math.round(k)}`);
  printOut(newLine);
}

// Hjelper: 2 desimaler når det er et tall, ellers "NaN"/"undefined"
function fmt2(x) {
  return Number.isFinite(x) ? x.toFixed(2) : String(x);
}

/* ----- Task 6 (VAT) ----- */
function calcNetVAT(gross, group) {
  const rates = {
    normal: 0.25,
    food: 0.15,
    hotel: 0.1,
  };

  const rate = rates[group];
  if (rate === undefined) return undefined;

  const g = Number(gross);
  return g / (1 + rate);
}

printOut("----- Task 6 -----");

let net = calcNetVAT(100, "normal");
printOut(`100 is ${fmt2(net)} without tax`);

net = calcNetVAT(150, "food");
printOut(`150 is ${fmt2(net)} without tax`);

net = calcNetVAT(50, "hotel");
printOut(`50 is ${fmt2(net)} without tax`);

// Ukjent gruppe skal gi eksakt melding (ikke "Gross ... => NaN")
if (calcNetVAT(123, "Textile") === undefined) {
  printOut("Textile is unknown tax-group!");
}

printOut(newLine);

/* ----- Task 7 (SDT) ----- */
// Merk: prioritet som gir samme oppførsel som eksempelet (inkl. NaN-caset)
function calcSDT(speed, distance, time) {
  let s = speed;
  let d = distance;
  let t = time;

  // Hvis time mangler: t = d / s (gir NaN hvis s er undefined)
  if (t === undefined) t = Number(d) / Number(s);
  // Hvis distance mangler: d = s * t
  else if (d === undefined) d = Number(s) * Number(t);
  // Hvis speed mangler: s = d / t
  else if (s === undefined) s = Number(d) / Number(t);

  return { speed: s, distance: d, time: t };
}

function printSDT(speed, distance, time) {
  const r = calcSDT(speed, distance, time);
  printOut(`Speed = ${r.speed} km/h`);
  printOut(`Distance = ${r.distance} km`);
  printOut(`Time = ${fmt2(Number(r.time))} h`);
  printOut(newLine);
}

printOut("----- Task 7 -----");

printSDT(75, 50, undefined);
printSDT(60, undefined, 2);
printSDT(undefined, 105, 1.5);
printSDT(undefined, 50, undefined);


/* ----- Task 8 helper: padToMax ----- */
function padToMax(text, maxLen, ch, padAfter) {
  let s = String(text);
  const target = Number(maxLen);
  if (!Number.isFinite(target) || target < 0) return s;
  const padChar = String(ch ?? " ").charAt(0) || " ";
  while (s.length < target) {
    s = padAfter ? (s + padChar) : (padChar + s);
  }
  return s;
}
printOut(newLine);
/* ----- Task 8 (Pad string) ----- */
printOut("----- Task 8 -----");

const txt = "This is a text";
printOut(`"${padToMax(txt, 30, " ", true)}"`);
printOut(`"${padToMax(txt, 30, " ", false)}"`);

printOut(newLine);

/* ----- Task 9 (Math test) ----- */
function makeMathLine(k) {
  const start = k * k;

  const left = [];
  for (let i = 0; i < k + 1; i++) left.push(start + i);

  const right = [];
  for (let i = 0; i < k; i++) right.push(start + (k + 1) + i);

  const lhs = left.reduce((a, b) => a + b, 0);
  const rhs = right.reduce((a, b) => a + b, 0);

  const leftStr = left.join(" ");
  const rightStr = right.join(" ");

  // 23 passer nøyaktig for k<=7 slik eksempelet viser
  const width = 23;

  const line =
    `${padToMax(leftStr, width, " ", true)} = ` +
    `${padToMax(rightStr, width, " ", false)}`;

  return { line, lhs, rhs };
}

function testMathExpression200Lines() {
  for (let k = 1; k <= 200; k++) {
    const { line, lhs, rhs } = makeMathLine(k);

    // Eksempelet viser 7 linjer
    if (k <= 7) {
      printOut(line);
      printOut(newLine);
    }

    if (lhs !== rhs) {
      printOut(`FAILED at line ${k}`);
      printOut(newLine);
      return;
    }
  }

  printOut("Mathematics is fun!");
}

printOut("----- Task 9 -----");

testMathExpression200Lines();

printOut(newLine);

/* ----- Task 10 (Factorial) ----- */
function factorial(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n < 0) return NaN;
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

printOut("----- Task 10 -----");

printOut(`factorial(9) is ${factorial(9)}`);
printOut(newLine);
