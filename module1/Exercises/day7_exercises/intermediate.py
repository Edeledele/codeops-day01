
# Day 7 - Intermediate Exercises
# DSA I: Linear Structures & Big-O


# Exercise 5: Big-O Analysis
print("=== Exercise 5: Big-O Analysis ===")

def find_max(numbers):
    
    if not numbers:
        return None
    max_value = numbers[0]
    for num in numbers:          # single loop -> n iterations
        if num > max_value:
            max_value = num
    return max_value


def has_duplicate_pair_sum(numbers, target):

    n = len(numbers)
    for i in range(n):           # outer loop -> n iterations
        for j in range(n):       # inner loop -> n iterations each time
            if i != j and numbers[i] + numbers[j] == target:
                return True, (numbers[i], numbers[j])
    return False, None


sample = [3, 7, 2, 9, 4, 1]
print("List:", sample)
print("Maximum value (O(n)):", find_max(sample))
found, pair = has_duplicate_pair_sum(sample, 11)
print(f"Pair summing to 11 exists (O(n^2))? {found}, pair={pair}")

# Exercise 6: Linked List Basics
print("\n=== Exercise 6: Linked List Basics ===")

class Node:
    def __init__(self, value):
        self.value = value   # data stored in the node
        self.next = None     # reference to the next node (None = end)


class LinkedList:
    def __init__(self):
        self.head = None      # first node in the list

    def append(self, value):
       
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node

    def print_list(self):
        """
        Prints all values in the list from head to tail.
        Time Complexity: O(n) -> must visit every node once.
        """
        values = []
        current = self.head
        while current is not None:
            values.append(str(current.value))
            current = current.next
        print(" -> ".join(values) if values else "(empty list)")


ll = LinkedList()
for name in ["Abebe", "Selam", "Dawit"]:
    ll.append(name)
print("Linked list contents:")
ll.print_list()



# Exercise 7: Stack (LIFO)

print("\n=== Exercise 7: Stack (LIFO) ===")

class Stack:
    """A simple stack implemented using a Python list."""
    def __init__(self):
        self._items = []

    def push(self, item):
        """Add item to the top of the stack. Time Complexity: O(1) amortized."""
        self._items.append(item)

    def pop(self):
        """Remove and return the top item. Time Complexity: O(1)."""
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        """Look at the top item without removing it. Time Complexity: O(1)."""
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)


def reverse_string(text):
   
    stack = Stack()
    for char in text:
        stack.push(char)

    reversed_chars = []
    while not stack.is_empty():
        reversed_chars.append(stack.pop())

    return "".join(reversed_chars)


original = "Addis Ababa"
reversed_text = reverse_string(original)
print(f"Original: '{original}'")
print(f"Reversed: '{reversed_text}'")


# Exercise 8: Queue (FIFO)
print("\n=== Exercise 8: Queue (FIFO) ===")

from collections import deque

class Queue:
  
    def __init__(self):
        self._items = deque()

    def enqueue(self, item):
        """Add item to the back of the queue. Time Complexity: O(1)."""
        self._items.append(item)

    def dequeue(self):
        """Remove and return the item at the front. Time Complexity: O(1)."""
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._items.popleft()

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)


bank_queue = Queue()
customers = ["Customer A", "Customer B", "Customer C", "Customer D"]

print("Customers arriving:")
for customer in customers:
    bank_queue.enqueue(customer)
    print(f"  {customer} joined the queue.")

print("\nServing customers in order (FIFO):")
while not bank_queue.is_empty():
    served = bank_queue.dequeue()
    print(f"  Now serving: {served}")