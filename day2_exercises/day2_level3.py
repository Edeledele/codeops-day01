# Day 2 Level 3
# Advanced Python


# Tip Calculator


def calculate_tip(bill, percentage):

    return bill * percentage / 100



def total_amount(bill, tip):

    return bill + tip



bill = 1000

tip_percentage = 15

people = 5



tip = calculate_tip(bill, tip_percentage)

total = total_amount(bill, tip)

each_person = total / people



print("===== Tip Calculator =====")

print(f"Tip: {tip}")

print(f"Total: {total}")

print(f"Each person pays: {each_person}")




# Quiz Game


def quiz_game():

    score = 0


    answers = [

        True,

        True,

        True,

        True,

        True

    ]


    for answer in answers:

        if answer:

            score += 1


    return score



result = quiz_game()


print("\nQuiz Result")

print(f"Score: {result}/5")



# Default Function


def calculate_final_price(price, tax_rate=0.15, discount=0):


    tax = price * tax_rate

    return price + tax - discount



print("\nFinal Price:")

print(calculate_final_price(1000))

print(calculate_final_price(1000,0.10,100))
