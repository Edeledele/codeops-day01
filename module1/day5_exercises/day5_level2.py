# Day 5 Level 2
# Polymorphism and Abstraction


from abc import ABC, abstractmethod



# ===============================
# Abstract Account
# ===============================


class Account(ABC):


    def __init__(self,owner,balance):

        self.owner=owner
        self.balance=balance



    def deposit(self,amount):

        self.balance+=amount



    @abstractmethod
    def calculate_interest(self):

        pass



    def statement(self):

        print(
            "Owner:",
            self.owner,
            "Balance:",
            self.balance
        )






class SavingsAccount(Account):


    def __init__(self,owner,balance,rate):

        super().__init__(owner,balance)

        self.rate=rate



    def calculate_interest(self):

        return self.balance*self.rate



    def statement(self):

        print(
            "Savings Account",
            self.owner,
            self.balance,
            "Interest:",
            self.rate
        )







class CurrentAccount(Account):


    def __init__(self,owner,balance,limit):

        super().__init__(owner,balance)

        self.limit=limit



    def calculate_interest(self):

        return 0



    def statement(self):

        print(
            "Current Account",
            self.owner,
            self.balance,
            "Overdraft:",
            self.limit
        )







class NormalAccount(Account):


    def calculate_interest(self):

        return 0







accounts=[

SavingsAccount(
    "Genet",
    10000,
    0.05
),


CurrentAccount(
    "Sara",
    5000,
    1000
),


NormalAccount(
    "John",
    3000
)

]




# Polymorphism

for account in accounts:

    account.statement()

    account.deposit(100)

    print(
    "After deposit:",
    account.balance
    )