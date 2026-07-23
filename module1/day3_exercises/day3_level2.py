# Day 3 Level 2
# Intermediate Collections


# -------------------------
# 4. List Operations
# -------------------------

numbers = [10,25,40,15,60,30]


print("Numbers greater than 30:")

for number in numbers:
    if number > 30:
        print(number)



numbers.sort()

print("Sorted list:")
print(numbers)



total = sum(numbers)

average = total / len(numbers)


print("Sum:", total)
print("Average:", average)



# -------------------------
# 5. Dictionary Operations
# -------------------------


products = {

    "Laptop":50000,
    "Phone":15000,
    "Keyboard":1000,
    "Mouse":500,
    "Monitor":8000

}



print("\nProduct List")

for product,price in products.items():

    print("----------------")
    print("Product:",product)
    print("Price:",price,"ETB")



# No user input
# Showing product price using get()

search_product = "Laptop"


price = products.get(
    search_product,
    "Product not found"
)


print("\nSearching:")
print(search_product,price)



# -------------------------
# 6. List Comprehension
# -------------------------


numbers_1_20 = [
    x for x in range(1,21)
]


even_numbers = [
    x for x in range(1,31)
    if x % 2 == 0
]


odd_numbers = [
    x for x in range(1,11)
    if x % 2 !=0
]


print(numbers_1_20)

print("Even:")
print(even_numbers)


print("Odd:")
print(odd_numbers)



# -------------------------
# 7. Modules Import
# -------------------------


from utils import add_tax


price = 1000


final_price = add_tax(price)


print("Price with tax:",final_price)