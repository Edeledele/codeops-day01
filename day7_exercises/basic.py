# Day 6 Basic Exercises
# SOLID Principles


# =====================================
# 1. Single Responsibility Principle
# =====================================


class Employee:

    def __init__(self,name,salary):

        self.name=name
        self.salary=salary



# Salary responsibility

class SalaryCalculator:


    def calculate(self,employee):

        return employee.salary




# File responsibility

class EmployeeSaver:


    def save(self,employee):

        print(
            "Saving",
            employee.name
        )



# Email responsibility

class EmailSender:


    def send(self,employee):

        print(
            "Email sent to",
            employee.name
        )




employee=Employee(
    "Genet",
    5000
)


calculator=SalaryCalculator()

print(
calculator.calculate(employee)
)


saver=EmployeeSaver()

saver.save(employee)


email=EmailSender()

email.send(employee)





# =====================================
# 2. Open Closed Principle
# =====================================


class Bonus:


    def bonus(self):

        pass




class Manager(Bonus):


    def bonus(self):

        return 5000




class Developer(Bonus):


    def bonus(self):

        return 3000




employees=[

Manager(),

Developer()

]



for emp in employees:

    print(
    emp.bonus()
    )





# =====================================
# 3. Liskov Substitution Principle
# =====================================


class Bird:


    def move(self):

        print("Bird can move")




class FlyingBird(Bird):


    def fly(self):

        print("Flying")




class Penguin(Bird):


    def swim(self):

        print("Penguin swimming")





def make_bird_move(bird):

    bird.move()



make_bird_move(
    Penguin()
)





# =====================================
# 4. SOLID Violation Example
# =====================================


print(

)
