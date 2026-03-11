const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

const DATA_FILE = path.join(__dirname, 'balance.json');

function getBalance() {
  if (!fs.existsSync(DATA_FILE)) {
    return 1000.0;
  }
  try {
    const obj = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return typeof obj.balance === 'number' ? obj.balance : 1000.0;
  } catch (e) {
    return 1000.0;
  }
}

function saveBalance(balance) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ balance }), 'utf8');
}

function formatAmount(amount) {
  return amount.toFixed(2).padStart(9, '0');
}

function mainMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function viewBalance() {
  const balance = getBalance();
  console.log('Current balance: ' + formatAmount(balance));
}

function creditAccount() {
  const amount = parseFloat(readlineSync.question('Enter credit amount: '));
  if (isNaN(amount) || amount <= 0) {
    console.log('Invalid amount.');
    return;
  }
  const balance = getBalance();
  const newBalance = balance + amount;
  saveBalance(newBalance);
  console.log('Amount credited. New balance: ' + formatAmount(newBalance));
}

function debitAccount() {
  const amount = parseFloat(readlineSync.question('Enter debit amount: '));
  if (isNaN(amount) || amount <= 0) {
    console.log('Invalid amount.');
    return;
  }
  const balance = getBalance();
  if (balance >= amount) {
    const newBalance = balance - amount;
    saveBalance(newBalance);
    console.log('Amount debited. New balance: ' + formatAmount(newBalance));
  } else {
    console.log('Insufficient funds for this debit.');
  }
}

function run() {
  let continueFlag = true;
  while (continueFlag) {
    mainMenu();
    const choice = readlineSync.question('Enter your choice (1-4): ');
    switch (choice) {
      case '1':
        viewBalance();
        break;
      case '2':
        creditAccount();
        break;
      case '3':
        debitAccount();
        break;
      case '4':
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }
  console.log('Exiting the program. Goodbye!');
}

// If the file is executed directly, run the application.
if (require.main === module) {
  run();
}
