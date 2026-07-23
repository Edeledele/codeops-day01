# Day 6 Intermediate
# Design Patterns


# =====================================
# 1. SRP + DIP
# =====================================


class Account:


    def __init__(self,owner,balance):

        self.owner=owner
        self.balance=balance



    def deposit(self,amount):

        self.balance+=amount



    def withdraw(self,amount):

        self.balance-=amount





class Database:


    def save(self,account):

        print("Saved to database")




class Notification:


    def send(self,account):

        print("Notification sent")




account=Account(
    "Genet",
    10000
)


account.deposit(1000)


db=Database()

db.save(account)


notify=Notification()

notify.send(account)





# =====================================
# 2. Factory Pattern
# =====================================


class SavingsAccount:


    def info(self):

        print("Savings Account")




class CurrentAccount:


    def info(self):

        print("Current Account")




class FixedDepositAccount:


    def info(self):

        print("Fixed Deposit Account")





class AccountFactory:


    @staticmethod
    def create(kind):

        if kind=="saving":

            return SavingsAccount()

        elif kind=="current":

            return CurrentAccount()

        elif kind=="fixed":

            return FixedDepositAccount()




account=AccountFactory.create(
    "saving"
)


account.info()





# =====================================
# 3. Observer Pattern
# =====================================


class SMSAlert:


    def update(self):

        print("SMS Alert")




class AuditLog:


    def update(self):

        print("Audit saved")




class BankAccount:


    def __init__(self):

        self.observers=[]



    def add(self,observer):

        self.observers.append(observer)



    def withdraw(self,amount):

        print(
        "Withdraw:",
        amount
        )


        if amount>3000:

            for obs in self.observers:

                obs.update()





bank=BankAccount()


bank.add(SMSAlert())

bank.add(AuditLog())


bank.withdraw(5000)





# =====================================
# 4. Interface Segregation
# =====================================


class InterestBearing:


    def calculate_interest(self):

        pass




class Saving(InterestBearing):


    def calculate_interest(self):

        return 500




class Current:


    def info(self):

        print(
        "No interest"
        )



saving=Saving()

print(
saving.calculate_interest()
)