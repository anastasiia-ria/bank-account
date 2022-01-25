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

AddressBook.prototype.findAccount = function(id) {
  if (this.account[id] != undefined) {
    return this.account[id];
  }
  return false;
};

//Business Logic for Account
function BankAccount(name, balance) {
  this.name = name;
  this.balance = balance;
}