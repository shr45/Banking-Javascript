class Account{
    constructor(bankId,fullName,Balance){
        this.bankId=bankId
        this.fullName=fullName
        this.Balance=Balance
    }
    getAccountID(){
        return this.bankId
    }
    getAccountFullName()
    {
        return this.fullName
    }
    getBalance()
    {
        return this.Balance
    }
   
}
module.exports = Account