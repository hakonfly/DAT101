"use strict";

import { printOut } from "../../common/script/utils.mjs";

const millisecondsPerDay = 1000 * 60 * 60 * 24;

function printSection(title) {
  printOut(`--- ${title} ---`);
}

function printBlankLine() {
  printOut("");
}

function formatDateNorwegian(date) {
  return date.toLocaleDateString("no-NB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function dateToUtcMidnight(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function printTodayDateNorwegian() {
  const today = new Date();
  printOut(formatDateNorwegian(today));
}

function getTodayDateObjectAndPrint() {
  const today = new Date();
  printOut(`Today: ${formatDateNorwegian(today)}`);
  return today;
}

function daysUntil2XKO(fromDate) {
  const releaseDate = new Date(2025, 4, 14);
  const dayDifference = dateToUtcMidnight(releaseDate) - dateToUtcMidnight(fromDate);
  return Math.round(dayDifference / millisecondsPerDay);
}

function print2XKOCountdown(fromDate) {
  const daysLeft = daysUntil2XKO(fromDate);

  if (daysLeft > 0) {
    printOut(`There are ${daysLeft} days left until 2XKO releases on 14 May 2025.`);
    return;
  }

  if (daysLeft === 0) {
    printOut("2XKO releases today!");
    return;
  }

  printOut(`2XKO was released ${Math.abs(daysLeft)} days ago on 14 May 2025.`);
}

function printCircleMeasurements(radius) {
  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const area = Math.PI * radius * radius;

  printOut(`Radius: ${radius}`);
  printOut(`Diameter: ${diameter.toFixed(2)}`);
  printOut(`Circumference: ${circumference.toFixed(2)}`);
  printOut(`Area: ${area.toFixed(2)}`);
}

function printRectangleMeasurements(rectangle) {
  const circumference = 2 * (rectangle.width + rectangle.height);
  const area = rectangle.width * rectangle.height;

  printOut(`Width: ${rectangle.width}, Height: ${rectangle.height}`);
  printOut(`Circumference: ${circumference.toFixed(2)}`);
  printOut(`Area: ${area.toFixed(2)}`);
}

function convertTemperature(value, unit) {
  const temperature = Number(value);
  const normalizedUnit = String(unit).trim().toLowerCase();

  if (!Number.isFinite(temperature)) {
    return null;
  }

  if (normalizedUnit === "c" || normalizedUnit === "celsius") {
    return {
      celsius: temperature,
      fahrenheit: (temperature * 9) / 5 + 32,
      kelvin: temperature + 273.15,
    };
  }

  if (normalizedUnit === "f" || normalizedUnit === "fahrenheit") {
    const celsius = ((temperature - 32) * 5) / 9;
    return {
      celsius,
      fahrenheit: temperature,
      kelvin: celsius + 273.15,
    };
  }

  if (normalizedUnit === "k" || normalizedUnit === "kelvin") {
    const celsius = temperature - 273.15;
    return {
      celsius,
      fahrenheit: (celsius * 9) / 5 + 32,
      kelvin: temperature,
    };
  }

  return null;
}

function printTemperatureConversion(value, unit) {
  const result = convertTemperature(value, unit);

  if (!result) {
    printOut("Unknown temperature type!");
    return;
  }

  printOut(`Input: ${value} ${unit}`);
  printOut(`Celsius: ${Math.round(result.celsius)}`);
  printOut(`Fahrenheit: ${Math.round(result.fahrenheit)}`);
  printOut(`Kelvin: ${Math.round(result.kelvin)}`);
}

function calcNetPriceWithoutVAT(gross, vatGroup) {
  const vatRates = {
    normal: 25,
    food: 15,
    hotel: 10,
    transport: 10,
    cinema: 10,
  };

  const normalizedGroup = String(vatGroup).trim().toLowerCase();
  const vat = vatRates[normalizedGroup];

  if (vat === undefined) {
    printOut("Unknown VAT group!");
    return NaN;
  }

  return (100 * Number(gross)) / (vat + 100);
}

function printNetPrice(gross, vatGroup) {
  const netPrice = calcNetPriceWithoutVAT(gross, vatGroup);

  if (Number.isNaN(netPrice)) {
    return;
  }

  printOut(`Gross: ${Number(gross).toFixed(2)}, group: ${vatGroup}, net: ${netPrice.toFixed(2)}`);
}

function calculateSpeedDistanceTime(speed, distance, time) {
  const missingValues = [speed, distance, time].filter((value) => value === undefined).length;

  if (missingValues > 1) {
    return NaN;
  }

  const result = {
    speed: speed === undefined ? speed : Number(speed),
    distance: distance === undefined ? distance : Number(distance),
    time: time === undefined ? time : Number(time),
  };

  if (speed === undefined) {
    result.speed = Number(distance) / Number(time);
  } else if (distance === undefined) {
    result.distance = Number(speed) * Number(time);
  } else if (time === undefined) {
    result.time = Number(distance) / Number(speed);
  }

  return result;
}

function printTravelValues(speed, distance, time) {
  const result = calculateSpeedDistanceTime(speed, distance, time);

  printOut(`Input -> speed: ${speed}, distance: ${distance}, time: ${time}`);

  if (Number.isNaN(result)) {
    printOut("Result: NaN");
    return;
  }

  printOut(`Speed: ${result.speed.toFixed(2)}`);
  printOut(`Distance: ${result.distance.toFixed(2)}`);
  printOut(`Time: ${result.time.toFixed(2)}`);
}

function padTextToMax(text, maxLength, fillCharacter, padAfter) {
  const sourceText = String(text);
  const targetLength = Number(maxLength);
  const padCharacter = String(fillCharacter ?? " ").charAt(0) || " ";

  if (!Number.isFinite(targetLength) || sourceText.length >= targetLength) {
    return sourceText;
  }

  if (padAfter) {
    return sourceText.padEnd(targetLength, padCharacter);
  }

  return sourceText.padStart(targetLength, padCharacter);
}

function makeSequence(start, count) {
  const sequence = [];

  for (let index = 0; index < count; index++) {
    sequence.push(start + index);
  }

  return sequence;
}

function sumNumbers(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

function buildMathLine(lineNumber) {
  const start = lineNumber ** 2;
  const leftSide = makeSequence(start, lineNumber + 1);
  const rightSide = makeSequence(start + lineNumber + 1, lineNumber);

  return {
    leftSide,
    rightSide,
    leftSum: sumNumbers(leftSide),
    rightSum: sumNumbers(rightSide),
  };
}

function testMathExpression(lineCount) {
  for (let lineNumber = 1; lineNumber <= lineCount; lineNumber++) {
    const { leftSide, rightSide, leftSum, rightSum } = buildMathLine(lineNumber);

    if (lineNumber <= 5) {
      printOut(`${leftSide.join(" + ")} = ${rightSide.join(" + ")}`);
    }

    if (leftSum !== rightSum) {
      printOut(`Failed at line ${lineNumber}: ${leftSum} !== ${rightSum}`);
      return false;
    }
  }

  printOut("Maths fun!");
  return true;
}

function factorial(number) {
  const integerNumber = Number(number);

  if (!Number.isInteger(integerNumber) || integerNumber < 0) {
    return NaN;
  }

  if (integerNumber <= 1) {
    return 1;
  }

  return integerNumber * factorial(integerNumber - 1);
}

printSection("Part 1");
printTodayDateNorwegian();
printBlankLine();

printSection("Part 2");
const today = getTodayDateObjectAndPrint();
print2XKOCountdown(today);
printBlankLine();

printSection("Part 3");
printCircleMeasurements(7);
printBlankLine();

printSection("Part 4");
printRectangleMeasurements({ width: 8, height: 5 });
printBlankLine();

printSection("Part 5");
printTemperatureConversion(25, "C");
printBlankLine();
printTemperatureConversion(77, "F");
printBlankLine();
printTemperatureConversion(300, "K");
printBlankLine();

printSection("Part 6");
printNetPrice(125, "NORMAL");
printBlankLine();
printNetPrice(115, "food");
printBlankLine();
printNetPrice(220, "Transport");
printBlankLine();
printNetPrice(99, "goblins");
printBlankLine();

printSection("Part 7");
printTravelValues(80, 200, undefined);
printBlankLine();
printTravelValues(90, undefined, 2.5);
printBlankLine();
printTravelValues(undefined, 150, 2);
printBlankLine();
printTravelValues(undefined, 150, undefined);
printBlankLine();

printSection("Part 8");
printOut(`"${padTextToMax("This is a text", 24, ".", true)}"`);
printOut(`"${padTextToMax("This is a text", 24, ".", false)}"`);
printBlankLine();

printSection("Part 9");
testMathExpression(200);
printBlankLine();

printSection("Part 10");
const factorialInput = 6;
printOut(`factorial(${factorialInput}) = ${factorial(factorialInput)}`);
