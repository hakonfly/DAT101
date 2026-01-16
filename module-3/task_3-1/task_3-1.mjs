"use strict";

import { printOut, newLine } from "../../common/script/utils.mjs";

// Helper for pretty output
function header(title) {
  printOut(`--- ${title} ---`);
}

// ---------------- Part 1 ----------------
header("Part 1");
const wakeUpTestsP1 = [6, 7, 8];
for (const wakeUpTime of wakeUpTestsP1) {
  const expr = "wakeUpTime === 7";
  printOut(`wakeUpTime = ${wakeUpTime}`);
  printOut(`Expression: ${expr} -> ${wakeUpTime === 7}`);

  if (wakeUpTime === 7) {
    printOut("If I wake up at exactly 7 o'clock then I can catch the bus to school.");
  }

  printOut(newLine);
}

// ---------------- Part 2 ----------------
header("Part 2");
const wakeUpTestsP2 = [6, 7, 8];
for (const wakeUpTime of wakeUpTestsP2) {
  const expr = "wakeUpTime === 7";
  printOut(`wakeUpTime = ${wakeUpTime}`);
  printOut(`Expression: ${expr} -> ${wakeUpTime === 7}`);

  if (wakeUpTime === 7) {
    printOut("If I wake up at exactly 7 o'clock, I can take the bus to school.");
  } else {
    printOut("Otherwise I have to take the car to school.");
  }

  printOut(newLine);
}

// ---------------- Part 3 ----------------
header("Part 3");
const wakeUpTestsP3 = [6, 7, 8, 9];
for (const wakeUpTime of wakeUpTestsP3) {
  const expr = "wakeUpTime === 7 / wakeUpTime === 8";
  printOut(`wakeUpTime = ${wakeUpTime}`);
  printOut(`Expression: ${expr}`);

  if (wakeUpTime === 7) {
    printOut("If I wake up at exactly 7 o'clock, I can take the bus to school.");
  } else if (wakeUpTime === 8) {
    printOut("Otherwise if I wake up exactly at 8 o'clock, I can take the train to school.");
  } else {
    printOut("Otherwise I have to take the car to school.");
  }

  printOut(newLine);
}

// ---------------- Part 4 ----------------
header("Part 4");
const numbersP4 = [-5, 0, 5];
for (const n of numbersP4) {
  // Part 4: only Negative/Positive (0 will be treated as Positive in this version)
  if (n < 0) {
    printOut(`${n} -> Negative`);
  } else {
    printOut(`${n} -> Positive`);
  }
}
printOut(newLine);

// ---------------- Part 5 ----------------
header("Part 5");
const numbersP5 = [-5, 0, 5];
for (const n of numbersP5) {
  if (n > 0) {
    printOut(`${n} -> Positive`);
  } else if (n < 0) {
    printOut(`${n} -> Negative`);
  } else {
    printOut(`${n} -> Zero`);
  }
}
printOut(newLine);

// ---------------- Part 6 ----------------
header("Part 6");
const minMegaPixels = 4;
const uploadedImageSizeMp = Math.floor(Math.random() * 8) + 1; // 1..8 inclusive
printOut(`Uploaded image size: ${uploadedImageSizeMp} MP`);
if (uploadedImageSizeMp >= minMegaPixels) {
  printOut("Thank you");
} else {
  printOut("The image is too small");
}
printOut(newLine);

// ---------------- Part 7 ----------------
header("Part 7");
const maxMegaPixelsExclusive = 6; // >= 6 => too large (as task says)
printOut(`Uploaded image size: ${uploadedImageSizeMp} MP (re-using the same random size)`);
if (uploadedImageSizeMp >= maxMegaPixelsExclusive) {
  printOut("Image is too large");
} else if (uploadedImageSizeMp >= minMegaPixels) {
  printOut("Thank you");
} else {
  printOut("The image is too small");
}
printOut(newLine);

// ---------------- Part 8 ----------------
header("Part 8");
const monthList = [
  "January",
  "February",
  "Mars",
  "April",
  "Mai",
  "Jun",
  "Juli",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random() * noOfMonth)];

printOut(`Month: ${monthName}`);
if (monthName.toLowerCase().includes("r")) {
  printOut("You must take vitamin D");
} else {
  printOut("You do not need to take vitamin D");
}
printOut(newLine);

// ---------------- Part 9 ----------------
header("Part 9");

function daysInMonth(name) {
  switch (name) {
    case "February":
      return 28;
    case "April":
    case "Jun":
    case "September":
    case "November":
      return 30;
    default:
      return 31;
  }
}

const daysThisMonth = daysInMonth(monthName);
printOut(`Month: ${monthName} has ${daysThisMonth} days`);
printOut(newLine);

// ---------------- Part 10 ----------------
header("Part 10");

// Closed from March through May (Mars, April, Mai), but in April there is temporary premises next door
let galleryStatus = "";

if (monthName === "April") {
  galleryStatus = "Gallery is open in temporary premises next door.";
} else if (monthName === "Mars" || monthName === "Mai") {
  galleryStatus = "Gallery is closed for refurbishment.";
} else {
  galleryStatus = "Gallery is open as normal.";
}

printOut(`Month: ${monthName} -> ${galleryStatus}`);
printOut(newLine);
