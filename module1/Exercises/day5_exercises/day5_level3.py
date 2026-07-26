# Day 5 Level 3
# Full Account Hierarchy


from abc import ABC,abstractmethod



class Account(ABC):


    def __init__(self,owner,balance):

        self.owner=owner

        self._balance=balance



    @property
    def balance(self):

        return self._balance



    def deposit(self,amount):

        if amount>0:

            self._balance+=amount



    def withdraw(self,amount):

        if amount<=self._balance:

            self._balance-=amount



    @abstractmethod
    def calculate_interest(self):

        pass





class SavingsAccount(Account):


    def __init__(self,owner,balance,rate):

        super().__init__(owner,balance)

        self.rate=rate



    def calculate_interest(self):

        return self._balance*self.rate






class CurrentAccount(Account):


    def __init__(self,owner,balance,limit):

        super().__init__(owner,balance)

        self.limit=limit



    def withdraw(self,amount):

        if amount <= self._balance+self.limit:

            self._balance-=amount



    def calculate_interest(self):

        return 0





saving=SavingsAccount(
    "Genet",
    5000,
    0.05
)


current=CurrentAccount(
    "Sara",
    3000,
    1000
)



saving.deposit(500)

current.withdraw(3500)



print(saving.balance)

print(current.balance)
