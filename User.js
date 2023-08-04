class User{
    static allUser=[]
    static ID=0
    constructor(fullName,gender,country,isAdmin){

        this.fullName=fullName
        this.gender=gender
        this.country=country
        this.isAdmin=isAdmin
        this.accounts = []

    }

    newUser(fullName,gender,country){
        //validation

        if(!isAdmin){
            return "UnAuthorized"
        }
        
        let userObj = new User(fullName, gender, country, false)
            User.allUsers.push(userObj)
            return userObj
    }
    static newAdmin(fullName,gender,country)
    {

        return new User(fullName,gender,country,true)
    }
    getAllUsers(){
        if(!isAdmin){
            return "UnAuthorized"
        }
        return User.allUser;

    }

    findUser(userID){
        if(!isAdmin){
            return "UnAuthorized"
        }
        for(index=0;index<User.allUser.length;index++)
        {

            if(userID == User.allUser[index].ID)
            {
                 return index
            }
            return "Not found"
        }


    }
    updateUser(userID,parameter,newValue){
        //validation for userID
        if(!isAdmin){
            return "UnAuthorized"
        }
        let indexOfUser = this.findUser(userId)
            switch (parameter) {
                case "fullName": 
                    User.allUsers[indexOfUser].fullName = newValue
                    return User.allUsers[indexOfUser]
                case "gender": 
                    User.allUsers[indexOfUser].gender = newValue
                    return User.allUsers[indexOfUser]
                case "country": 
                    User.allUsers[indexOfUser].country = newValue
                    return User.allUsers[indexOfUser]
                default: 
                return("parameter not found") 
            }
    }
    deleteUser(userID){
        if (!this.isAdmin) {
           return("you are not admin")
        }
        let indexOfUser = this.findUser(userId)
        User.allUsers.splice(indexOfUser, 1)
        return User.allUsers
    }


    //CRUD ON 
    createAccount() {
        if (this.isAdmin) {
            return "Unauthorized";
        }

        let createdAccount = new Account(this.fullName);
        this.accounts.push(createdAccount);
        return createdAccount;
    }

    getAllAccounts() {
        return this.accounts;
    }

    findAccount(accountID) {
        if (this.isAdmin) {
            return "Unauthorized";
        }

        for (let index = 0; index < this.accounts.length; index++) {
            if (accountID === this.accounts[index].getAccountID()) {
                return index;
            }
        }
        return "Not found account ID";
    }

    updateAccount(accountID, parameter, newValue) {
        if (this.isAdmin) {
            throw new Error("Unauthorized");
        }

        let indexOfAccount = this.findAccount(accountID);

        switch (parameter) {
            case "fullName":
                this.accounts[indexOfAccount].fullName = newValue;
                return this.accounts[indexOfAccount];
            case "balance":
                this.accounts[indexOfAccount].balance = newValue;
                return this.accounts[indexOfAccount];
            default:
                return "Parameter not found";
        }
    }
    deposit(userId, accountId, amount) {
        const account = this.getAccount(userId, accountId);
        if (!account) return false;
    
        account.balance += amount;
        return true;
      }
      
    withdraw(userId, accountId, amount) {
        const account = this.getAccount(userId, accountId);
        if (!account || account.balance < amount) return false;
    
        account.balance -= amount;
        return true;
      }
    
      transfer(senderUserId, senderAccountId, recipientAccountId, amount) {
        const senderAccount = this.getAccount(senderUserId, senderAccountId);
        const recipientAccount = this.getAccount(senderUserId, recipientAccountId);
    
        if (!senderAccount || !recipientAccount || senderAccount.balance < amount) {
          return false;
        }
    
        senderAccount.balance -= amount;
        recipientAccount.balance += amount;
        return true;
      }
      
}