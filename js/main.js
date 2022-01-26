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

function login(userName, userId) {
  account = bankList.findAccount(userId);
  if (account.name === userName) {
    showAccountDetails(userId);
  } else {
    $("#error-message").show().delay(8000);
  }
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

$(document).ready(function() {
  let account = 0;

  $("form#register").submit(function(event) {
    event.preventDefault();
    const registerName = $('input#name').val();
    const initialDeposit = parseInt($('input#initial-deposit').val());
    
    $('input#name').val("");
    $('input#initial-deposit').val("");

    let newAccount = new Account(registerName, initialDeposit);
    registerAccount(newAccount);
    
    let account = bankList.findAccount(newAccount.id);
    console.log(account);
    $(".submit-amount").removeAttr("id");
    $(".submit-amount").attr("id","submit-register");
    
    console.log(newAccount.id)
    
  });

  $('button.submit-amount').click(function () {
    let operation = $('input[name="operation"]:checked').val();
    let amount = parseInt($('input#amount').val());
  
    $('input#amount').val("");
    
    console.log(operation)
    console.log(amount)
    console.log(account.id)
    operationChoice(operation, amount, account.id);
    
  });

  /*$("form#login").submit(function() {
    const loginName = $('input#login-name').val();
    const accountNumber = parseInt($('input#account-number').val());
    
    console.log(loginName)
    console.log(accountNumber)
    $('input#login-name').val("");
    $('input#account-number').val("");
    
    login(loginName, accountNumber);

    $(".submit-amount").removeAttr("id");
    $(".submit-amount").attr("id","submit-login");

    $('button#submit-login').click(function (event) {
      event.preventDefault();
       operation = $('input[name="operation"]:checked').val();
      let amount = parseInt($('input#amount').val());
    
      $('input#amount').val("");
      console.log(operation)
      console.log(amount)
      console.log(accountNumber)

      operationChoice(operation, amount, accountNumber);
      
    });
  });*/
});