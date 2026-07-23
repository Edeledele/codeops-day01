# Day 4 Level 1
# Classes and Objects


# =================================
# 1. Person Class
# =================================


class Person:

    # Constructor
    def __init__(self, name, age):

        self.name = name
        self.age = age


    # Method
    def introduce(self):

        print(
            "Hello my name is",
            self.name
        )



# Create objects

person1 = Person("Genet",22)

person2 = Person("Sara",25)



person1.introduce()

person2.introduce()



# =================================
# 2. Rectangle Class
# =================================


class Rectangle:


    def __init__(self,length,width):

        self.length = length
        self.width = width



    def area(self):

        return self.length * self.width



    def perimeter(self):

        return 2*(self.length+self.width)




rectangle1 = Rectangle(10,5)

rectangle2 = Rectangle(20,8)



print("Rectangle 1 Area:",
      rectangle1.area())


print("Rectangle 1 Perimeter:",
      rectangle1.perimeter())


print("Rectangle 2 Area:",
      rectangle2.area())


print("Rectangle 2 Perimeter:",
      rectangle2.perimeter())





# =================================
# 3. Bank Account Basic
# =================================


class Account:


    def __init__(self,owner,balance):

        self.owner = owner
        self.balance = balance



    def deposit(self,amount):

        self.balance += amount



    def withdraw(self,amount):

        if amount <= self.balance:

            self.balance -= amount

        else:

            print("Not enough money")




account = Account("Genet",5000)


account.deposit(1000)

account.withdraw(2000)


print(
"Account Balance:",
account.balance
)