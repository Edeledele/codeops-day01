
# Day 7 - Advanced Exercises
# DSA I: Linear Structures & Big-O


import time
from collections import deque


# ============================================================
# Exercise 9: Performance Comparison
# ============================================================
print("=== Exercise 9: Performance Comparison ===")

# --- 9a: Search in a list (O(n)) vs search in a dictionary (O(1) avg) ---
N = 100_000
data_list = list(range(N))                       # [0, 1, 2, ..., N-1]
data_dict = {i: True for i in range(N)}           # same values, as dict keys

target = N - 1  # worst case: last element -> forces full scan for the list

start = time.perf_counter()
found_in_list = target in data_list               # O(n): scans until found
list_time = time.perf_counter() - start

start = time.perf_counter()
found_in_dict = target in data_dict               # O(1) average: hash lookup
dict_time = time.perf_counter() - start

print(f"Searching for {target} among {N} items:")
print(f"  List search time:       {list_time:.6f} seconds")
print(f"  Dictionary search time:  {dict_time:.6f} seconds")
print("  -> Dictionary lookup is dramatically faster because it uses hashing")
print("     (O(1) average) instead of scanning every element (O(n)).\n")


# --- 9b: Insert 10,000 elements at the beginning: list vs deque ---
INSERTS = 10_000

start = time.perf_counter()
py_list = []
for i in range(INSERTS):
    py_list.insert(0, i)          # O(n) each time -> O(n^2) total
list_insert_time = time.perf_counter() - start

start = time.perf_counter()
py_deque = deque()
for i in range(INSERTS):
    py_deque.appendleft(i)        # O(1) each time -> O(n) total
deque_insert_time = time.perf_counter() - start

print(f"Inserting {INSERTS} elements at the beginning:")
print(f"  list.insert(0, x) total time:       {list_insert_time:.6f} seconds")
print(f"  deque.appendleft(x) total time:     {deque_insert_time:.6f} seconds")
print("  -> list.insert(0, x) is O(n) per call because every existing")
print("     element must shift right. deque.appendleft(x) is O(1) per")
print("     call because deque is a doubly linked list of blocks, so")
print("     it can add to the front without shifting anything.")


# ============================================================
# Exercise 10: Choose the Right Structure
# ============================================================
print("\n=== Exercise 10: Choose the Right Structure ===")


# Exercise 11: Linked List vs Array
print("=== Exercise 11: Linked List vs Array (remove middle element) ===")

def remove_middle_from_list(arr):
   
    if not arr:
        return arr
    mid_index = len(arr) // 2
    arr.pop(mid_index)   # pop from the middle -> O(n) shift
    return arr


class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def to_list(self):
        values = []
        current = self.head
        while current:
            values.append(current.value)
            current = current.next
        return values

    def remove_middle(self):
        
        if self.head is None or self.head.next is None:
            self.head = None
            return

        # Step 1: find the length (O(n))
        length = 0
        current = self.head
        while current:
            length += 1
            current = current.next

        mid_index = length // 2

        # Step 2: walk to the node just before the middle (O(n))
        if mid_index == 0:
            self.head = self.head.next
            return

        current = self.head
        for _ in range(mid_index - 1):
            current = current.next

        # Step 3: unlink the middle node (O(1))
        current.next = current.next.next


# --- Demo: array version ---
arr = [10, 20, 30, 40, 50]
print("Array before:", arr)
remove_middle_from_list(arr)
print("Array after removing middle element:", arr)

# --- Demo: linked list version ---
ll = LinkedList()
for val in [10, 20, 30, 40, 50]:
    ll.append(val)
print("\nLinked list before:", ll.to_list())
ll.remove_middle()
print("Linked list after removing middle element:", ll.to_list())


