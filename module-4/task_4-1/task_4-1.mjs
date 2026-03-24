"use strict";

import { printOut } from "../../common/script/utils.mjs";

const AccountType = Object.freeze({
  NORMAL: "Normal",
  SAVING: "Saving",
  PENSION: "Pension",
});

const CurrencyType = Object.freeze({
  NOK: Object.freeze({ code: "NOK", rateToNOK: 1 }),
  USD: Object.freeze({ code: "USD", rateToNOK: 10 }),
  EUR: Object.freeze({ code: "EUR", rateToNOK: 11 }),
  GBP: Object.freeze({ code: "GBP", rateToNOK: 13 }),
});

function printSection(title) {
  printOut(`--- ${title} ---`);
}

function printBlankLine() {
  printOut("");
}

function normalizeAmount(value) {
  return Math.round(Number(value) * 1000000000000) / 1000000000000;
}

function formatAmount(value) {
  return normalizeAmount(value).toFixed(2);
}

function resolveCurrencyCode(currencyType) {
  if (currencyType === undefined) {
    return CurrencyType.NOK.code;
  }

  if (typeof currencyType === "string") {
    const code = currencyType.trim().toUpperCase();
    return CurrencyType[code]?.code ?? null;
  }

  if (typeof currencyType === "object" && currencyType?.code) {
    const code = String(currencyType.code).trim().toUpperCase();
    return CurrencyType[code]?.code ?? null;
  }

  return null;
}

function getCurrencyRate(currencyType) {
  const currencyCode = resolveCurrencyCode(currencyType);
  if (!currencyCode) {
    return NaN;
  }

  return CurrencyType[currencyCode].rateToNOK;
}

function convertCurrencyAmount(amount, fromCurrencyType, toCurrencyType) {
  const fromRate = getCurrencyRate(fromCurrencyType);
  const toRate = getCurrencyRate(toCurrencyType);

  if (!Number.isFinite(fromRate) || !Number.isFinite(toRate)) {
    return NaN;
  }

  const amountInNOK = Number(amount) * fromRate;
  return normalizeAmount(amountInNOK / toRate);
}

class TAccount {
  type;
  #balance = 0;
  #withdrawCounter = 0;
  #currencyType = CurrencyType.NOK.code;

  constructor(type) {
    this.type = type;
  }

  toString() {
    return this.type;
  }

  getBalance() {
    return normalizeAmount(this.#balance);
  }

  getCurrencyType() {
    return this.#currencyType;
  }

  setType(newType) {
    if (this.type === newType) {
      return;
    }

    const oldType = this.type;
    this.type = newType;
    this.#withdrawCounter = 0;
    printOut(`Account type changed from ${oldType} to ${newType}.`);
  }

  deposit(amount, currencyType = undefined) {
    const amountNumber = Number(amount);
    const sourceCurrencyType = resolveCurrencyCode(currencyType);

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      printOut("Deposit denied: amount must be greater than zero.");
      return false;
    }

    if (!sourceCurrencyType) {
      printOut("Deposit denied: unknown currency type.");
      return false;
    }

    const amountInAccountCurrency = this.#convertCurrency(amountNumber, sourceCurrencyType, this.#currencyType);
    this.#balance = normalizeAmount(this.#balance + amountInAccountCurrency);
    this.#withdrawCounter = 0;

    printOut(`Deposit: ${formatAmount(amountNumber)} ${sourceCurrencyType}. Balance: ${formatAmount(this.#balance)} ${this.#currencyType}.`);
    return true;
  }

  withdraw(amount, currencyType = undefined) {
    const amountNumber = Number(amount);
    const sourceCurrencyType = resolveCurrencyCode(currencyType);

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      printOut("Withdrawal denied: amount must be greater than zero.");
      return false;
    }

    if (!sourceCurrencyType) {
      printOut("Withdrawal denied: unknown currency type.");
      return false;
    }

    switch (this.type) {
      case AccountType.PENSION:
        printOut("Withdrawal denied: pension accounts do not allow withdrawals.");
        return false;
      case AccountType.SAVING:
        if (this.#withdrawCounter >= 3) {
          printOut("Withdrawal denied: saving accounts allow only 3 withdrawals.");
          return false;
        }
        break;
      default:
        break;
    }

    const amountInAccountCurrency = this.#convertCurrency(amountNumber, sourceCurrencyType, this.#currencyType);
    if (amountInAccountCurrency > this.#balance + 1e-9) {
      printOut("Withdrawal denied: insufficient funds.");
      return false;
    }

    if (Math.abs(amountInAccountCurrency - this.#balance) <= 1e-9) {
      this.#balance = 0;
    } else {
      this.#balance = normalizeAmount(this.#balance - amountInAccountCurrency);
    }

    this.#withdrawCounter += 1;
    printOut(`Withdrawal: ${formatAmount(amountNumber)} ${sourceCurrencyType}. Balance: ${formatAmount(this.#balance)} ${this.#currencyType}.`);
    return true;
  }

  setCurrencyType(newCurrencyType) {
    const nextCurrencyType = resolveCurrencyCode(newCurrencyType);

    if (!nextCurrencyType) {
      printOut("Currency change denied: unknown currency type.");
      return false;
    }

    if (nextCurrencyType === this.#currencyType) {
      return false;
    }

    const oldCurrencyType = this.#currencyType;
    this.#balance = this.#convertCurrency(this.#balance, oldCurrencyType, nextCurrencyType);
    this.#currencyType = nextCurrencyType;

    printOut(`Currency changed from ${oldCurrencyType} to ${nextCurrencyType}. Balance: ${formatAmount(this.#balance)} ${this.#currencyType}.`);
    return true;
  }

  #convertCurrency(amount, fromCurrencyType, toCurrencyType) {
    return convertCurrencyAmount(amount, fromCurrencyType, toCurrencyType);
  }
}

const myAccount = new TAccount(AccountType.NORMAL);

printSection("Part 1");
printOut(Object.values(AccountType).join(", "));
printBlankLine();

printSection("Part 2");
printOut(`Current account type: ${myAccount.toString()}`);
myAccount.setType(AccountType.SAVING);
printOut(`Current account type: ${myAccount.toString()}`);
printBlankLine();

printSection("Part 3");
myAccount.deposit(120);
myAccount.withdraw(30);
printOut(`Balance from getBalance(): ${formatAmount(myAccount.getBalance())} ${myAccount.getCurrencyType()}.`);
printBlankLine();

printSection("Part 4");
myAccount.deposit(10);
myAccount.withdraw(10);
myAccount.withdraw(10);
myAccount.withdraw(10);
myAccount.withdraw(10);
myAccount.setType(AccountType.PENSION);
myAccount.withdraw(5);
myAccount.setType(AccountType.NORMAL);
myAccount.withdraw(myAccount.getBalance(), myAccount.getCurrencyType());
printBlankLine();

printSection("Part 5");
myAccount.deposit(150);
printOut(`Current currency: ${myAccount.getCurrencyType()}.`);
myAccount.setCurrencyType(CurrencyType.USD);
myAccount.setCurrencyType(CurrencyType.USD);
printBlankLine();

printSection("Part 6");
myAccount.setCurrencyType(CurrencyType.EUR);
myAccount.setCurrencyType(CurrencyType.GBP);
myAccount.setCurrencyType(CurrencyType.NOK);
printBlankLine();

printSection("Part 7");
myAccount.deposit(12, CurrencyType.USD);
myAccount.withdraw(10, CurrencyType.GBP);
myAccount.setCurrencyType(CurrencyType.USD);
myAccount.setCurrencyType(CurrencyType.EUR);
const remainingInUSD = convertCurrencyAmount(myAccount.getBalance(), CurrencyType.EUR, CurrencyType.USD);
myAccount.withdraw(remainingInUSD, CurrencyType.USD);
printOut(`Final balance: ${formatAmount(myAccount.getBalance())} ${myAccount.getCurrencyType()}.`);
