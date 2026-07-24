
# Exercise 6a: Recursively reverse a string

def reverse_string(s):
    
    if len(s) <= 1:
        return s
    return reverse_string(s[1:]) + s[0]

# Exercise 6b: Recursively count occurrences of a target in a list

def count_occurrences(numbers, target):
    """
    Counts how many times target appears in the list, using recursion.
    Base case: empty list -> 0 occurrences.
    Recursive case: (1 if first element matches, else 0) + count in the rest.
    """
    if len(numbers) == 0:
        return 0
    first_match = 1 if numbers[0] == target else 0
    return first_match + count_occurrences(numbers[1:], target)

# Exercise 7: Sorting Comparison - Selection Sort vs Insertion Sort
# Both track number of comparisons and swaps so we can compare them.

def selection_sort(arr):
    
    a = arr.copy()
    n = len(a)
    comparisons = 0
    swaps = 0

    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            comparisons += 1
            if a[j] < a[min_index]:
                min_index = j
        if min_index != i:
            a[i], a[min_index] = a[min_index], a[i]
            swaps += 1

    return a, comparisons, swaps


def insertion_sort(arr):
    a = arr.copy()
    comparisons = 0
    swaps = 0

    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if a[j] > key:
                a[j + 1] = a[j]   # shift element right
                swaps += 1
                j -= 1
            else:
                break
        a[j + 1] = key

    return a, comparisons, swaps

# Exercise 8: Two Pointer Technique - Pair sum in a sorted array

def two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return (arr[left], arr[right])
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return None   # no pair found

# Demonstration / quick tests

if __name__ == "__main__":
    print("=== Reverse String (recursive) ===")
    word = "recursion"
    print(f"reverse_string('{word}') = '{reverse_string(word)}'")

    print("\n=== Count Occurrences (recursive) ===")
    nums = [1, 3, 2, 3, 3, 5, 3]
    print(f"count_occurrences({nums}, 3) = {count_occurrences(nums, 3)}")

    print("\n=== Sorting Comparison: Selection Sort vs Insertion Sort ===")
    test_list = [64, 25, 12, 22, 11, 90, 5]

    sel_sorted, sel_comp, sel_swaps = selection_sort(test_list)
    ins_sorted, ins_comp, ins_swaps = insertion_sort(test_list)

    print(f"Original list: {test_list}")
    print(f"Selection Sort -> {sel_sorted} | comparisons={sel_comp}, swaps={sel_swaps}")
    print(f"Insertion Sort -> {ins_sorted} | comparisons={ins_comp}, swaps={ins_swaps}")
    print("Note: Selection Sort always does the same number of comparisons")
    print("(regardless of input order), while Insertion Sort does fewer")
    print("comparisons/swaps on lists that are already close to sorted.")

    print("\n=== Two Pointer Technique ===")
    sorted_arr = [2, 7, 11, 15, 18, 24]
    target_sum = 22
    result = two_sum_sorted(sorted_arr, target_sum)
    print(f"Array: {sorted_arr}, target: {target_sum}")
    print(f"Pair found: {result}")