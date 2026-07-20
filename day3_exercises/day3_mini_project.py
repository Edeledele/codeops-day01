# Inventory Manager
# This project accepts user input


inventory = {}



while True:


    print("\nInventory Manager")

    print("1. Add new product")

    print("2. Update quantity")

    print("3. View products")

    print("4. Save file")

    print("5. Load file")

    print("6. Exit")



    choice=input("Choose option: ")



    if choice=="1":

        product=input("Product name: ")

        quantity=int(
            input("Quantity: ")
        )


        inventory[product]=quantity



    elif choice=="2":

        product=input(
            "Product name: "
        )


        if product in inventory:

            quantity=int(
                input("New quantity: ")
            )

            inventory[product]=quantity

        else:

            print("Product not found")



    elif choice=="3":

        print(inventory)



    elif choice=="4":

        file=open(
            "inventory.txt",
            "w"
        )


        for item,quantity in inventory.items():

            file.write(
                item+","+str(quantity)+"\n"
            )


        file.close()


        print("Saved")



    elif choice=="5":

        try:

            file=open(
                "inventory.txt",
                "r"
            )


            for line in file:

                item,quantity=line.strip().split(",")

                inventory[item]=int(quantity)


            file.close()


            print("Loaded")


        except FileNotFoundError:

            print("No file found")



    elif choice=="6":

        print("Goodbye")

        break



    else:

        print("Invalid choice")