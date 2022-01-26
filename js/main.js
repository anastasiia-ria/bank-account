//Business Logic for Accounts
function BankList() {
  this.accounts = {};
  this.currentId = 0;
}

BankList.prototype.addAccount = function(account) {
  account.id = this.assignId();
  this.accounts[account.id] = account;
};

BankList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

BankList.prototype.findAccount = function(id) {
  if (this.accounts[id] != undefined) {
    return this.accounts[id];
  }
  return false;
};

//Business Logic for Account
function Account(name, balance) {
  this.name = name;
  this.balance = balance;
}

Account.prototype.operations = function(number, id) {
  account = bankList.findAccount(id);
  account.balance += number;
  showAccountDetails(id);
}

//User Interface Logic ------
let bankList = new BankList();

function operationChoice(userChoice, amount, id) {
  let account = bankList.findAccount(id);
  if (amount < 0) {
    $("#error-message").show().delay(8000);
  }
  if (userChoice === "deposit") {
    account.operations(amount, id);
  } else {
    account.operations(-amount, id);
  }
}

function showAccountDetails(id) {
  $('.hidden').show();
  const account = bankList.findAccount(id);
  $('.name').html(account.name);
  $('.balance').html(account.balance);
  $('.account-number').html(account.id);
}

function registerAccount(account) {
  bankList.addAccount(account);
  showAccountDetails(account.id);
}

function login(name, id) {
  let account = bankList.findAccount(id);
  if (account.name === name) {
    showAccountDetails(id)
  } else {
    $("#error-message").show().delay(8000);
  }
}

$(document).ready(function() {
  
  $("form#register").submit(function(event) {
    event.preventDefault();
    const registerName = $('input#name').val();
    const initialDeposit = parseInt($('input#initial-deposit').val());
    
    $('input#name').val("");
    $('input#initial-deposit').val("");

    let newAccount = new Account(registerName, initialDeposit);
    registerAccount(newAccount);
    
  });

  $("form#login").submit(function(event) {
    event.preventDefault();
    const loginName = $('input#login-name').val();
    const accountNumber = parseInt($('input#account-number').val());
    
    $('input#login-name').val("");
    $('input#account-number').val("");

    login(loginName, accountNumber);
    
  });

  $('button.submit-amount').click(function () {
    let operation = $('input[name="operation"]:checked').val();
    let amount = parseInt($('input#amount').val());
    let id = parseInt($(".account-number").text());
    console.log(id);

    $('input#amount').val("");
    operationChoice(operation, amount, id);
  });
  
});