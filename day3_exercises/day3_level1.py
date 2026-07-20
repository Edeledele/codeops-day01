# Day 3 Level 1
# Collections: Lists, Tuples, Dictionaries, Sets


# -------------------------
# 1. Lists and Tuples
# -------------------------

# Create a list of favorite foods
foods = [
    "Pizza",
    "Burger",
    "Pasta",
    "Cake",
    "Rice",
    "Chicken"
]

print("Favorite foods:")
print(foods)

# Print first and last food
print("First food:", foods[0])
print("Last food:", foods[-1])


# Add new food
foods.append("Fish")

print("After adding:")
print(foods)


# Remove second food
foods.pop(1)

print("After removing second item:")
print(foods)



# Tuple for Ethiopia coordinates
ethiopia_coordinates = (9.145, 40.489)

# Unpacking tuple
latitude, longitude = ethiopia_coordinates

print("Latitude:", latitude)
print("Longitude:", longitude)



# -------------------------
# 2. Dictionaries
# -------------------------

student = {
    "name": "Genet",
    "age": 22,
    "grade": "A",
    "city": "Addis Ababa",
    "department": "Computer Science"
}


print("\nStudent Information")

print("Name:", student["name"])
print("Department:", student["department"])
print("Grade:", student["grade"])


# Add phone
student["phone"] = "0987654321"


# Update grade
student["grade"] = "A+"


print(student)



# -------------------------
# 3. Sets
# -------------------------

names = [
    "Abebe",
    "Sara",
    "Genet",
    "Abebe",
    "Sara"
]


# Remove duplicates
unique_names = set(names)


# Add new name
unique_names.add("Mekdes")


print("\nUnique Names:")
print(unique_names)