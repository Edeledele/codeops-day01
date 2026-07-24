def run():
    inventory = {}

    menu = """MENU
    ========== Inventory Manager (branch asset tracking) ==========
1  Add/update inventory item
2  View inventory
3  Exit
    """

    while True:
        print(menu)
        choice = input("Choice: ").strip()

        if choice == "15":
            item = input("Item name: ")
            quantity = int(input("Quantity: "))
            inventory[item] = quantity
            print("Inventory updated.")

        elif choice == "16":
            if not inventory:
                print("No inventory yet.")
            for item, quantity in inventory.items():
                print(f"{item}: {quantity}")

        elif choice == "0":
            print("Goodbye")
            break

        else:
            print("Invalid choice")


if __name__ == "__main__":
    run()