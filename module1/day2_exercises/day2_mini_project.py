def run():
    income = 0
    expense = 0

    menu = """MENU
    ========== Personal Finance Tracker ==========
1   Add income
2   Add expense
3   Show finance summary
4   Exit
    """

    while True:
        print(menu)
        choice = input("Choice: ").strip()

        if choice == "12":
            amount = float(input("Income amount: "))
            income += amount
            print(f"Income of {amount} added. Total income: {income}")

        elif choice == "13":
            amount = float(input("Expense amount: "))
            expense += amount
            print(f"Expense of {amount} added. Total expense: {expense}")

        elif choice == "14":
            print("\n===== Personal Finance Summary =====")
            print("Income:", income)
            print("Expense:", expense)
            print("Balance:", income - expense)

        elif choice == "0":
            print("Goodbye")
            break

        else:
            print("Invalid choice")


if __name__ == "__main__":
    run()