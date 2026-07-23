# Day 6 Advanced
# SOLID + Design Patterns


# =====================================
# Singleton Pattern
# =====================================


class BankConfig:


    _instance=None



    def __new__(cls):

        if cls._instance is None:

            cls._instance=super().__new__(cls)

            cls._instance.rate=0.05


        return cls._instance





config1=BankConfig()

config2=BankConfig()



print(
config1.rate
)


print(
config1 is config2
)





# =====================================
# Factory + New Account Type
# =====================================


class SavingsAccount:


    def show(self):

        print("Savings")




class InvestmentAccount:


    def show(self):

        print("Investment")




class AccountFactory:


    @staticmethod
    def create(type):

        if type=="saving":

            return SavingsAccount()


        elif type=="investment":

            return InvestmentAccount()





acc=AccountFactory.create(
    "investment"
)


acc.show()





# =====================================
# Observer Example
# =====================================


class Observer:


    def update(self):

        pass





class SMS(Observer):


    def update(self):

        print(
        "SMS sent"
        )





class Account:


    def __init__(self):

        self.listeners=[]



    def add(self,obj):

        self.listeners.append(obj)



    def withdraw(self,amount):

        if amount>3000:

            for item in self.listeners:

                item.update()





account=Account()


account.add(
SMS()
)


account.withdraw(5000)