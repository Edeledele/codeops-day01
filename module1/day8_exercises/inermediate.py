

# Exercise 3: Linear Search

def linear_search(arr, target):

    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1



# Exercise 4: Binary Search

def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1          # target must be in the right half
        else:
            high = mid - 1         # target must be in the left half

    return -1   # target not found

# Exercise 5: Bubble Sort (prints array after each pass)

def bubble_sort(arr):
   
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]   # swap
                swapped = True
        print(f"After pass {i + 1}: {arr}")
        if not swapped:   # optimization: stop early if already sorted
            break
    return arr

# Demonstration / quick tests

if __name__ == "__main__":
    print("=== Linear Search ===")
    data = [4, 2, 9, 6, 5, 1]
    target = 6
    print(f"Array: {data}, target: {target}")
    print(f"Index found: {linear_search(data, target)}")

    print("\n=== Binary Search ===")
    sorted_data = [1, 2, 4, 5, 6, 9]   # must be sorted first!
    print(f"Sorted array: {sorted_data}, target: {target}")
    print(f"Index found: {binary_search(sorted_data, target)}")

    print("\n=== Bubble Sort ===")
    unsorted = [5, 1, 4, 2, 8]
    print(f"Original array: {unsorted}")
    bubble_sort(unsorted)
    print(f"Final sorted array: {unsorted}")