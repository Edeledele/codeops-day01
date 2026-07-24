"""
Day 7 - Basic Exercises
DSA I: Linear Structures & Big-O
-----------------------------------
Topics: Big-O notation, comparing complexities, lists, dictionaries
"""
# Exercise 3: Arrays / Lists

print("=== Exercise 3: Arrays / Lists ===")

students = [
    "Abebe", "Kebede", "Marta", "Selam", "Dawit",
    "Ruth", "Yonas", "Hana", "Biruk", "Sara"
]
print("Original list:", students)


print("Student at index 0:", students[0])
print("Student at index 4:", students[4])


students.append("Meron")
print("After append('Meron'):", students)

students.insert(0, "Tesfaye")
print("After insert(0, 'Tesfaye'):", students)

print("\n=== Exercise 4: Hashmaps (Dictionaries) ===")

student_grades = {
    "Abebe": "A",
    "Kebede": "B",
    "Marta": "A",
    "Selam": "C",
    "Dawit": "B"
}
print("Original grades:", student_grades)

# --- Add a new student -> O(1) average ---
student_grades["Ruth"] = "A"
print("After adding Ruth:", student_grades)

# --- Update a grade -> O(1) average ---
student_grades["Kebede"] = "A"
print("After updating Kebede's grade:", student_grades)


name_to_check = "Marta"
if name_to_check in student_grades:
    print(f"{name_to_check} exists with grade: {student_grades[name_to_check]}")
else:
    print(f"{name_to_check} not found.")

name_to_check = "Yonas"
if name_to_check in student_grades:
    print(f"{name_to_check} exists with grade: {student_grades[name_to_check]}")
else:
    print(f"{name_to_check} not found.")