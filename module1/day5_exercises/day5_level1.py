# Day 5 Level 1
# Inheritance Basics


# ===============================
# 1. Vehicle Inheritance
# ===============================


class Vehicle:


    def __init__(self,name,model,year):

        self.name=name
        self.model=model
        self.year=year



    def info(self):

        print(
            self.name,
            self.model,
            self.year
        )




class Car(Vehicle):


    def __init__(self,name,model,year,color):

        super().__init__(name,model,year)

        self.color=color



    def drive(self):

        print("Car is driving")





class Motorcycle(Vehicle):


    def __init__(self,name,model,year,engine):

        super().__init__(name,model,year)

        self.engine=engine



    def ride(self):

        print("Motorcycle is riding")





car=Car(
    "Toyota",
    "Corolla",
    2024,
    "Black"
)


bike=Motorcycle(
    "Honda",
    "CBR",
    2023,
    "500cc"
)



car.info()

car.drive()


bike.info()

bike.ride()





# ===============================
# 2. SavingsAccount Inheritance
# ===============================


class Account:


    def __init__(self,owner,balance):

        self.owner=owner
        self.balance=balance



    def deposit(self,amount):

        self.balance+=amount



    def withdraw(self,amount):

        if amount<=self.balance:

            self.balance-=amount





class SavingsAccount(Account):


    def __init__(self,owner,balance,interest_rate):

        super().__init__(owner,balance)

        self.interest_rate=interest_rate



    def add_interest(self):

        self.balance += (
            self.balance*self.interest_rate
        )





saving=SavingsAccount(
    "Genet",
    10000,
    0.05
)


saving.add_interest()


print(
saving.balance
)





# ===============================
# 3. Current Account
# ===============================


class CurrentAccount(Account):


    def __init__(self,owner,balance,overdraft_limit):

        super().__init__(owner,balance)

        self.overdraft_limit=overdraft_limit



    def withdraw(self,amount):

        if amount <= self.balance+self.overdraft_limit:

            self.balance-=amount



current=CurrentAccount(
    "Sara",
    1000,
    500
)


current.withdraw(1200)


print(current.balance)