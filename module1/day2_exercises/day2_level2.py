# Day 2 Level 2
# Intermediate Python


# Grade Classifier


score = 85


if score >= 90:
    print("Excellent")

elif score >= 80:
    print("Very Good")

elif score >= 70:
    print("Good")

elif score >= 50:
    print("Pass")

else:
    print("Fail")



# Number Pattern


print("\nOdd Numbers:")


for number in range(1,21):

    if number % 2 != 0:

        print(number)



print("\nNumbers divisible by 5:")


for number in range(1,21):

    if number % 5 == 0:

        print(number)



# While Loop


total = 0

numbers = [10,20,30]


index = 0


while index < len(numbers):

    total += numbers[index]

    index += 1


print("\nTotal:", total)



# Functions


def greet(name):

    print(f"Welcome {name}")



def square(number):

    return number * number



def is_even(number):

    return number % 2 == 0



greet("Genet")

print(square(5))

print(is_even(10))