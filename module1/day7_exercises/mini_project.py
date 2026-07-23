# Clean Addis Bank System
# Mini Project
# Only this file accepts input


class BankConfig:


    interest=0.05

    overdraft=1000





class Account:


    def __init__(self,number,name,balance):

        self.number=number
        self.name=name
        self.balance=balance



    def deposit(self,amount):

        self.balance+=amount



    def withdraw(self,amount):

        if amount<=self.balance:

            self.balance-=amount

            if amount>3000:

                print(
                "SMS Alert: Large withdrawal"
                )

                print(
                "Audit Log Created"
                )





class SavingsAccount(Account):


    def apply_interest(self):

        self.balance += (
        self.balance *
        BankConfig.interest
        )




class CurrentAccount(Account):


    pass





class AccountFactory:


    @staticmethod
    def create(kind,number,name):


        if kind=="saving":

            return SavingsAccount(
                number,
                name,
                0
            )


        else:

            return CurrentAccount(
                number,
                name,
                0
            )





accounts={}



while True:


    print("\nClean Addis Bank")

    print("1 Create Account")

    print("2 Deposit")

    print("3 Withdraw")

    print("4 Show Accounts")

    print("5 Apply Interest")

    print("6 Exit")



    choice=input("Choice: ")




    if choice=="1":

        number=input("Number: ")

        name=input("Name: ")

        kind=input(
        "saving/current: "
        )


        accounts[number]=AccountFactory.create(
            kind,
            number,
            name
        )




    elif choice=="2":

        number=input("Account: ")

        amount=int(
        input("Amount: ")
        )


        accounts[number].deposit(amount)




    elif choice=="3":

        number=input("Account: ")

        amount=int(
        input("Amount: ")
        )


        accounts[number].withdraw(amount)




    elif choice=="4":

        for acc in accounts.values():

            print(
            acc.name,
            acc.balance
            )




    elif choice=="5":

        for acc in accounts.values():

            if isinstance(acc,SavingsAccount):

                acc.apply_interest()




    elif choice=="6":

        break