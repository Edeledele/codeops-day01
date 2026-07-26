
# Day 4 -> Encapsulated BankAccount (private balance via property)

class BankAccount:
    def __init__(self, number, name, balance=0):
        self.number = number
        self.name = name
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def withdraw(self, amount):
        if amount > self._balance:
            print("Not enough balance")
            return
        self._balance -= amount


if __name__ == "__main__":
    acc = BankAccount("001", "Abebe", 500)
    acc.deposit(200)
    acc.withdraw(100)
    print(acc.name, acc.balance)