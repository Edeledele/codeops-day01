
# Day 9 - Basic Exercises
# DSA III: Trees, Graphs & Heaps



# Exercise 1: Tree Basics

print("=== Exercise 1: Tree Basics ===")

class TreeNode:
   
    def __init__(self, name):
        self.name = name
        self.children = []   # list of TreeNode

    def add_child(self, child_node):
        
        self.children.append(child_node)


def print_tree(node, depth=0):
    
    print("  " * depth + f"- {node.name}")
    for child in node.children:
        print_tree(child, depth + 1)

head_office = TreeNode("Head Office")

bole_branch = TreeNode("Bole Branch")
bole_branch.add_child(TreeNode("Teller"))
bole_branch.add_child(TreeNode("Loan Officer"))

piassa_branch = TreeNode("Piassa Branch")

head_office.add_child(bole_branch)
head_office.add_child(piassa_branch)

print("Bank Hierarchy:")
print_tree(head_office)



# Exercise 2: Binary Search Tree

print("\n=== Exercise 2: Binary Search Tree ===")

class BSTNode:
    """A node in a Binary Search Tree: left child < node < right child."""
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
    
        if self.root is None:
            self.root = BSTNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert_recursive(node.right, value)

    def search(self, value):
      
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node, value):
        if node is None:
            return False
        if node.value == value:
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)


bst = BinarySearchTree()
for val in [50, 30, 70, 20, 40, 60]:
    bst.insert(val)

print("Inserted values: [50, 30, 70, 20, 40, 60]")
print("Search 40:", "Found" if bst.search(40) else "Not found")
print("Search 100:", "Found" if bst.search(100) else "Not found")



# Exercise 3: Graph Basics

print("\n=== Exercise 3: Graph Basics ===")

class Graph:
 
    def __init__(self):
        self.adjacency_list = {}

    def add_customer(self, name):
        """
        Add a new customer (vertex) to the graph.
        Time Complexity: O(1) average (dictionary insert).
        """
        if name not in self.adjacency_list:
            self.adjacency_list[name] = []

    def add_transfer(self, customer_a, customer_b):
        """
        Add an undirected connection (money transfer) between two
        customers.
        Time Complexity: O(1) average — appending to each customer's
        adjacency list, assuming both customers already exist.
        """
        self.add_customer(customer_a)
        self.add_customer(customer_b)
        self.adjacency_list[customer_a].append(customer_b)
        self.adjacency_list[customer_b].append(customer_a)

    def print_graph(self):
        """
        Print each customer and who they've transferred money with.
        Time Complexity: O(V + E) — visits every vertex and every edge once.
        """
        for customer, connections in self.adjacency_list.items():
            print(f"  {customer} -> {', '.join(connections) if connections else '(no connections)'}")


graph = Graph()
for customer in ["Almaz", "Dawit", "Tigist", "Hanna"]:
    graph.add_customer(customer)

# Add some money transfer connections
graph.add_transfer("Almaz", "Dawit")
graph.add_transfer("Almaz", "Tigist")
graph.add_transfer("Tigist", "Hanna")

print("Customer transfer network:")
graph.print_graph()



# Exercise 4: Heap Basics

print("\n=== Exercise 4: Heap Basics ===")

import heapq


urgent_transactions = []

def add_transaction(priority, description):
    """
    Push a transaction onto the heap.
    Time Complexity: O(log n) — heap must "sift up" to restore
    the heap property after insertion.
    """
    # Negate priority so the largest amount behaves like the
    # "smallest" value in Python's min-heap.
    heapq.heappush(urgent_transactions, (-priority, description))

def pop_highest_priority():
    """
    Pop and return the transaction with the highest priority.
    Time Complexity: O(log n) — heap must "sift down" to restore
    the heap property after removal.
    """
    if not urgent_transactions:
        return None
    priority, description = heapq.heappop(urgent_transactions)
    return (-priority, description)


add_transaction(5000, "Big Loan")
add_transaction(200, "Small Deposit")
add_transaction(10000, "Fraud Alert")

print("Transactions added: (5000, 'Big Loan'), (200, 'Small Deposit'), (10000, 'Fraud Alert')")
top_priority = pop_highest_priority()
print(f"Highest priority transaction popped: {top_priority}")