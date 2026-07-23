# Personal Finance Tracker


income = 0
expense = 0



def add_income():

    global income

    money = float(input("Enter income: "))

    income += money



def add_expense():

    global expense

    money = float(input("Enter expense: "))

    expense += money



def show_balance():

    balance = income - expense

    print("\n===== Summary =====")

    print("Income:", income)

    print("Expense:", expense)

    print("Balance:", balance)



while True:


    print("""
1. Add Income
2. Add Expense
3. Show Balance
4. Exit
""")


    choice = input("Choose option: ")



    if choice == "1":

        add_income()



    elif choice == "2":

        add_expense()



    elif choice == "3":

        show_balance()



    elif choice == "4":

        show_balance()

        print("Goodbye")

        break



    else:

        print("Invalid option")