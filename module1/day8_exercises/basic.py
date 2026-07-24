
# Exercise 1: Recursion Basics - Factorial

def factorial_recursive(n):
    """
    Returns n! using recursion.
    Base case: 0! = 1 and 1! = 1
    Recursive case: n! = n * (n-1)!
    """
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n == 0 or n == 1:          # base case stops the recursion
        return 1
    return n * factorial_recursive(n - 1)   # recursive call


def factorial_iterative(n):
    """
    Returns n! using a simple loop (no recursion).
    Useful to compare performance/readability with the recursive version.
    """
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Exercise 2: Recursion with Lists - Sum of a list

def sum_list(numbers):
    """
    Returns the sum of all numbers in a list using recursion.
    Base case: an empty list sums to 0.
    Recursive case: first element + sum of the rest of the list.
    """
    if len(numbers) == 0:         # base case
        return 0
    return numbers[0] + sum_list(numbers[1:])  # recursive call on the "rest" of the list



# Demonstration / quick tests

if __name__ == "__main__":
    print("=== Factorial ===")
    n = 6
    print(f"factorial_recursive({n}) = {factorial_recursive(n)}")
    print(f"factorial_iterative({n}) = {factorial_iterative(n)}")

    print("\n=== Sum of a list (recursive) ===")
    nums = [3, 7, 1, 9, 4]
    print(f"sum_list({nums}) = {sum_list(nums)}")