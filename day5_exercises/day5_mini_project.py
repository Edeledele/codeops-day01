# Addis Bank System Version 2
# Only this project uses input()


from abc import ABC,abstractmethod



class Account(ABC):


    def __init__(self,number,name,balance):

        self.number=number
        self.name=name
        self.balance=balance



    def deposit(self,amount):

        self.balance+=amount



    def withdraw(self,amount):

        if amount<=self.balance:

            self.balance-=amount



    @abstractmethod
    def statement(self):

        pass





class SavingsAccount(Account):


    def __init__(self,number,name,balance):

        super().__init__(number,name,balance)

        self.rate=0.05



    def interest(self):

        self.balance += self.balance*self.rate



    def statement(self):

        print(
        "Savings",
        self.name,
        self.balance
        )







class CurrentAccount(Account):


    def statement(self):

        print(
        "Current",
        self.name,
        self.balance
        )






accounts={}



while True:


    print("\nAddis Bank")

    print("1 Create Savings")

    print("2 Create Current")

    print("3 Deposit")

    print("4 Withdraw")

    print("5 Statement")

    print("6 Apply Interest")

    print("7 Show All")

    print("8 Exit")



    choice=input("Choose: ")




    if choice=="1":

        number=input("Account number:")

        name=input("Name:")


        accounts[number]=SavingsAccount(
            number,
            name,
            0
        )



    elif choice=="2":

        number=input("Account number:")

        name=input("Name:")


        accounts[number]=CurrentAccount(
            number,
            name,
            0
        )



    elif choice=="3":

        number=input("Account:")

        amount=int(input("Amount:"))

        accounts[number].deposit(amount)




    elif choice=="4":

        number=input("Account:")

        amount=int(input("Amount:"))

        accounts[number].withdraw(amount)




    elif choice=="5":

        number=input("Account:")

        accounts[number].statement()




    elif choice=="6":

        for account in accounts.values():

            if isinstance(account,SavingsAccount):

                account.interest()




    elif choice=="7":

        for account in accounts.values():

            account.statement()




    elif choice=="8":

        break
    