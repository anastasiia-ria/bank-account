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

BankList.prototype.findAccount = function(id, name) {
  if (this.account[id] != undefined ||  this.account.name === name) {
    return this.account[id];
  }
  return false;
};

//Business Logic for Account
function BankAccount(name, balance) {
  this.name = name;
  this.balance = balance;
}

BankAccount.prototype.operations = function(number) {
  this.balance += number;
}

function login(userId, userName) {
  account = findAccount(userId, userName);
  if (account.name === userName) {
    showAccountDetails(userId);
  } else {
    $("#error-message").show().delay(800);
  }
}

$(document).ready(function() {
  $("form#form1").submit(function(event) {
    event.preventDefault();
    const registerName = $('input#name').val();
    const initialDeposit = $('input#initial-deposit').val();
    const loginName = $('input#login-name').val();
    const accountNumber = $('input#account-number').val();
    const operation = $('input[name="operation"]:checked').val();
    const amount = $('input#amount').val();

    $('input#name').val("");
    $('input#initial-deposit').val("");
    $('input#login-name').val("");
  });
});