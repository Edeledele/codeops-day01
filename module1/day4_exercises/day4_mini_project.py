# Addis Bank Account System
# Mini Project
# This is the only file using input()


class BankAccount:


    def __init__(self,name,balance):

        self.name=name

        self.__balance=balance



    @property
    def balance(self):

        return self.__balance



    def deposit(self,amount):

        if amount>0:

            self.__balance+=amount



    def withdraw(self,amount):

        if amount <= self.__balance:

            self.__balance-=amount

        else:

            print("Not enough balance")





accounts={}



while True:


    print("\nAddis Bank")

    print("1.Create Account")

    print("2.Deposit")

    print("3.Withdraw")

    print("4.Check Balance")

    print("5.View Account")

    print("6.Exit")



    choice=input("Choose: ")




    if choice=="1":

        number=input("Account number: ")

        name=input("Name: ")

        account=BankAccount(name,0)

        accounts[number]=account



        print("Account Created")




    elif choice=="2":

        number=input("Account number: ")

        amount=int(input("Amount: "))


        accounts[number].deposit(amount)




    elif choice=="3":

        number=input("Account number: ")

        amount=int(input("Amount: "))


        accounts[number].withdraw(amount)




    elif choice=="4":

        number=input("Account number: ")


        print(
        accounts[number].balance
        )




    elif choice=="5":

        number=input("Account number: ")


        print(
        "Owner:",
        accounts[number].name
        )


        print(
        "Balance:",
        accounts[number].balance
        )




    elif choice=="6":

        break



    else:

        print("Wrong option")
        