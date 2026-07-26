
#Day 8 -> Data Structures (Tree, Graph, Heap, BST)


import heapq


class BSTNode:
    def __init__(self, account):
        self.account = account
        self.left = None
        self.right = None


class AccountBST:
    def __init__(self):
        self.root = None

    def insert(self, account):
        self.root = self._insert(self.root, account)

    def _insert(self, node, account):
        if node is None:
            return BSTNode(account)
        if account.number < node.account.number:
            node.left = self._insert(node.left, account)
        elif account.number > node.account.number:
            node.right = self._insert(node.right, account)
        else:
            node.account = account
        return node

    def search(self, number):
        return self._search(self.root, number)

    def _search(self, node, number):
        if node is None:
            return None
        if number == node.account.number:
            return node.account
        if number < node.account.number:
            return self._search(node.left, number)
        return self._search(node.right, number)

    def in_order(self):
        result = []
        self._in_order(self.root, result)
        return result

    def _in_order(self, node, result):
        if node:
            self._in_order(node.left, result)
            result.append(node.account)
            self._in_order(node.right, result)


class BranchNode:
    def __init__(self, name, role="Branch"):
        self.name = name
        self.role = role
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def display(self, level=0):
        print("  " * level + f"- {self.name} ({self.role})")
        for child in self.children:
            child.display(level + 1)


class BranchTree:
    def __init__(self, root_name="Addis Bank HQ"):
        self.root = BranchNode(root_name, "Head Office")
        self.nodes = {root_name: self.root}

    def add_node(self, parent_name, name, role):
        parent = self.nodes.get(parent_name)
        if parent is None:
            print("Parent branch/employee not found")
            return
        node = BranchNode(name, role)
        parent.add_child(node)
        self.nodes[name] = node
        print(f"Added {name} under {parent_name}")

    def show(self):
        self.root.display()


class TransferGraph:
    def __init__(self):
        self.adjacency = {}

    def add_customer(self, number):
        self.adjacency.setdefault(number, [])

    def add_transfer(self, from_number, to_number):
        self.add_customer(from_number)
        self.add_customer(to_number)
        self.adjacency[from_number].append(to_number)
        self.adjacency[to_number].append(from_number)

    def bfs(self, start):
        if start not in self.adjacency:
            return []
        visited = [start]
        queue = [start]
        while queue:
            node = queue.pop(0)
            for neighbor in self.adjacency[node]:
                if neighbor not in visited:
                    visited.append(neighbor)
                    queue.append(neighbor)
        return visited

    def dfs(self, start):
        if start not in self.adjacency:
            return []
        visited = []
        self._dfs(start, visited)
        return visited

    def _dfs(self, node, visited):
        visited.append(node)
        for neighbor in self.adjacency[node]:
            if neighbor not in visited:
                self._dfs(neighbor, visited)


class TransactionHeap:
    def __init__(self):
        self._heap = []
        self._counter = 0

    def add(self, priority, account_number, description):
        self._counter += 1
        heapq.heappush(self._heap, (-priority, self._counter, account_number, description))

    def process_highest(self):
        if not self._heap:
            print("No urgent transactions.")
            return None
        neg_priority, _, account_number, description = heapq.heappop(self._heap)
        priority = -neg_priority
        print(f"Processing priority {priority}: {description} (Account {account_number})")
        return account_number, description, priority