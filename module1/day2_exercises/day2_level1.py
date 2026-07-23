# Day 2 Level 1
# Python Fundamentals


# Variables and Data Types

full_name = "Genet Tilahun"
age = 22
height = 1.50
is_student = True
favorite_food = "Pizza"


print("===== Student Information =====")

print(f"My name is {full_name}.")
print(f"I am {age} years old.")
print(f"My height is {height} meters.")
print(f"Student status: {is_student}.")
print(f"My favorite food is {favorite_food}.")



# Arithmetic Operations

number1 = 20
number2 = 5


print("\n===== Arithmetic Operations =====")

print(f"Sum: {number1 + number2}")
print(f"Difference: {number1 - number2}")
print(f"Product: {number1 * number2}")
print(f"Division: {number1 / number2}")
print(f"Floor Division: {number1 // number2}")
print(f"Remainder: {number1 % number2}")



# Type Conversion

birth_year = 2004

current_year = 2026

person_age = current_year - birth_year

print(f"\nYour age is {person_age} years old.")



# If Else

score = 75


if score >= 50:
    print("Result: Pass")
else:
    print("Result: Fail")