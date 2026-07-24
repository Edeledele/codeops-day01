
#Day 6 -> SOLID + Design Patterns (Singleton, Factory, Observer)


from abc import ABC, abstractmethod


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
            cls._instance.large_withdrawal_threshold = 3000
        return cls._instance


class Observer:
    def update(self, account, amount):
        raise NotImplementedError


class SMSAlert(Observer):
    def update(self, account, amount):
        print(f"SMS Alert: large withdrawal of {amount} on {account.name}'s account")


class AuditLog(Observer):
    def update(self, account, amount):
        print(f"Audit Log: {account.name} withdrew {amount}")


class Account(ABC):
    def __init__(self, number, name, balance=0):
        self.number = number
        self.name = name
        self._balance = balance
        self._observers = []

    @property
    def balance(self):
        return self._balance

    def add_observer(self, observer):
        self._observers.append(observer)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def withdraw(self, amount):
        if amount > self._balance:
            print("Not enough balance")
            return
        self._balance -= amount

        config = BankConfig()
        if amount > config.large_withdrawal_threshold:
            for observer in self._observers:
                observer.update(self, amount)

    @abstractmethod
    def statement(self):
        pass


class SavingsAccount(Account):
    def apply_interest(self):
        config = BankConfig()
        self._balance += self._balance * config.interest_rate

    def statement(self):
        print(f"[Savings] {self.number} | {self.name} | Balance: {self._balance}")


class CurrentAccount(Account):
    def statement(self):
        print(f"[Current] {self.number} | {self.name} | Balance: {self._balance}")


class AccountFactory:
    _types = {"saving": SavingsAccount, "current": CurrentAccount}

    @staticmethod
    def create(kind, number, name):
        account_class = AccountFactory._types.get(kind, CurrentAccount)
        account = account_class(number, name, 0)
        account.add_observer(SMSAlert())
        account.add_observer(AuditLog())
        return account


if __name__ == "__main__":
    # Singleton demo
    cfg1 = BankConfig()
    cfg2 = BankConfig()
    print("Singleton check:", cfg1 is cfg2)

    # Factory + Observer demo
    acc = AccountFactory.create("saving", "S100", "Liya")
    acc.deposit(4000)
    acc.withdraw(3500)  # above large_withdrawal_threshold -> observers fire
    acc.statement()