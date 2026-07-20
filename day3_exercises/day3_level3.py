# Day 3 Level 3
# Files and Error Handling



# -------------------------
# 8. File Reading Writing
# -------------------------


students = {

    "Abebe":80,
    "Sara":90,
    "Genet":95,
    "Mekdes":85,
    "John":75

}



try:

    # Writing file

    file = open(
        "students.txt",
        "w"
    )


    for name,score in students.items():

        file.write(
            name + "," + str(score) + "\n"
        )


    file.close()



    # Reading file

    file = open(
        "students.txt",
        "r"
    )


    total = 0
    count = 0


    for line in file:

        data=line.strip().split(",")

        score=int(data[1])

        total += score

        count +=1


    average = total/count


    print("Average Score:",average)


    file.close()



except FileNotFoundError:

    print("File does not exist")





# -------------------------
# 9. Error Handling
# -------------------------


try:

    number1 = 10

    number2 = 2


    result = number1 / number2


    print("Result:",result)



except ValueError:

    print("Please enter numbers only")



except ZeroDivisionError:

    print("Cannot divide by zero")



finally:

    print(
        "Calculation attempt completed"
    )
    