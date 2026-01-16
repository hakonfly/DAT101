"use strict";


import { printOut, newLine } from "../../common/script/utils.mjs";


printOut("--- Part 1 --------------------------------------------");

const exprOriginal = "2 + 3 * 2 - 4 * 6";
const resultOriginal = 2 + 3 * 2 - 4 * 6;

const exprModified = "2 + 3 * (2 - 4) * 6";
const resultModified = 2 + 3 * (2 - 4) * 6;

printOut(`${exprOriginal} = ${resultOriginal}`);
printOut(`${exprModified} = ${resultModified}`);

printOut(newLine);
printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const metres = 25;
const centimetres = 34;

const millimetres = metres * 1000 + centimetres * 10;
const inches = millimetres / 25.4;

printOut(`${metres} metres and ${centimetres} centimetres = ${inches.toFixed(2)} inches`);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const days = 3;
const hours = 12;
const minutes = 14;
const seconds = 45;

const totalMinutes = days * 24 * 60 + hours * 60 + minutes + seconds / 60;

printOut(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds = ${totalMinutes} minutes`);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const totalMinutesB = 6322.52;

// først: gjør om til sekunder (så vi kan få sekunder helt nøyaktig)
const totalSeconds = Math.floor(totalMinutesB * 60);

const secondsPerDay = 24 * 60 * 60;
const secondsPerHour = 60 * 60;
const secondsPerMinute = 60;

const daysB = Math.floor(totalSeconds / secondsPerDay);
let remainder = totalSeconds % secondsPerDay;

const hoursB = Math.floor(remainder / secondsPerHour);
remainder = remainder % secondsPerHour;

const minutesB = Math.floor(remainder / secondsPerMinute);
const secondsB = remainder % secondsPerMinute;

printOut(`${totalMinutesB} minutes is: ${daysB} days, ${hoursB} hours, ${minutesB} minutes, ${secondsB} seconds`);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const usd = 54;

const nokRate = 76;   // 76 NOK
const usdRate = 8.6;  // 8.6 USD

// NOK per 1 USD
const nokPerUsd = nokRate / usdRate;

const nokAmount = Math.round(usd * nokPerUsd);
const usdBack = Math.round(nokAmount / nokPerUsd);

printOut(`${usd} USD = ${nokAmount} NOK`);
printOut(`${nokAmount} NOK = ${usdBack} USD`);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const text = "There is much between heaven and earth that we do not understand.";

// 1) Antall tegn
printOut(`Number of characters: ${text.length}`);

// 2) Tegn på posisjon 19 (mennesker teller fra 1, JS teller fra 0)
printOut(`Character at position 19: ${text.charAt(19 - 1)}`);

// 3) Start på posisjon 35 og 8 tegn fram
const startIndex = 35 - 1;
printOut(`8 characters from position 35: ${text.slice(startIndex, startIndex + 8)}`);

// 4) Index der "earth" starter (JS-index, starter på 0)
printOut(`Index where "earth" starts: ${text.indexOf("earth")}`);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`Is 5 greater than 3? ${5 > 3}`);
printOut(`Is 7 greater than or equal to 7? ${7 >= 7}`);
printOut(`Is "a" greater than "b"? ${"a" > "b"}`);
printOut(`Is "1" less than "a"? ${"1" < "a"}`);
printOut(`Is "2500" less than "abcd"? ${"2500" < "abcd"}`);
printOut(`"arne" is not equal to "thomas": ${"arne" !== "thomas"}`);
printOut(`(2 equals 5) is this statement true? ${2 === 5}`);
printOut(`("abcd" is greater than "bcd") is this statement false? ${("abcd" > "bcd") === false}`);
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const text1 = "254";
const text2 = "57.23";
const text3 = "25 kroner";

const num1 = Number(text1);
const num2 = Number(text2);
const num3 = parseInt(text3, 10);

printOut(`"${text1}" -> ${num1}`);
printOut(`"${text2}" -> ${num2}`);
printOut(`"${text3}" -> ${num3}`);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const r = Math.floor(Math.random() * 360) + 1;
printOut(`Random r (1-360): ${r}`);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const totalDays = 131;
const weeks = Math.floor(totalDays / 7);
const daysLeft = totalDays % 7;

printOut(`${totalDays} days is ${weeks} weeks and ${daysLeft} days`);
printOut(newLine);