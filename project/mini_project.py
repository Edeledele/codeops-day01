import heapq
from abc import ABC, abstractmethod


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
            cls._instance.large_withdrawal_threshold = 3000
        return cls._instance


class Observer:
    def update(self, account, amount):
        raise NotImplementedError


class SMSAlert(Observer):
    def update(self, account, amount):
        print(f"SMS Alert: large withdrawal of {amount} on {account.name}'s account")


class AuditLog(Observer):
    def update(self, account, amount):
        print(f"Audit Log: {account.name} withdrew {amount}")


class Account(ABC):
    def __init__(self, number, name, balance=0):
        self.number = number
        self.name = name
        self._balance = balance
        self._observers = []

    @property
    def balance(self):
        return self._balance

    def add_observer(self, observer):
        self._observers.append(observer)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def withdraw(self, amount):
        if amount > self._balance:
            print("Not enough balance")
            return
        self._balance -= amount

        config = BankConfig()
        if amount > config.large_withdrawal_threshold:
            for observer in self._observers:
                observer.update(self, amount)

    @abstractmethod
    def statement(self):
        pass


class SavingsAccount(Account):
    def apply_interest(self):
        config = BankConfig()
        self._balance += self._balance * config.interest_rate

    def statement(self):
        print(f"[Savings] {self.number} | {self.name} | Balance: {self._balance}")


class CurrentAccount(Account):
    def statement(self):
        print(f"[Current] {self.number} | {self.name} | Balance: {self._balance}")


class AccountFactory:
    _types = {"saving": SavingsAccount, "current": CurrentAccount}

    @staticmethod
    def create(kind, number, name):
        account_class = AccountFactory._types.get(kind, CurrentAccount)
        account = account_class(number, name, 0)
        account.add_observer(SMSAlert())
        account.add_observer(AuditLog())
        return account


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



class LedgerTransaction:
    """type should be 'credit' (adds to balance) or 'debit' (subtracts)."""

    def __init__(self, amount, date, ttype):
        self.amount = amount
        self.date = date          # expected format: "YYYY-MM-DD"
        self.type = ttype.lower()

    def __repr__(self):
        return f"{self.date} | {self.type:6} | {self.amount}"


class TransactionLedger:
    def __init__(self):
        self.transactions = []

    def add(self, amount, date, ttype):
        self.transactions.append(LedgerTransaction(amount, date, ttype))

    # ---------- Recursion ----------
    def total_balance(self):
        return self._recursive_total(self.transactions)

    def _recursive_total(self, transactions):
        if not transactions:
            return 0
        first, rest = transactions[0], transactions[1:]
        signed_amount = first.amount if first.type == "credit" else -first.amount
        return signed_amount + self._recursive_total(rest)

    # ---------- Sorting (merge sort) ----------
    def sorted_by(self, field):
        key = (lambda t: t.amount) if field == "amount" else (lambda t: t.date)
        return self._merge_sort(self.transactions, key)

    def _merge_sort(self, items, key):
        if len(items) <= 1:
            return items[:]
        mid = len(items) // 2
        left = self._merge_sort(items[:mid], key)
        right = self._merge_sort(items[mid:], key)
        return self._merge(left, right, key)

    def _merge(self, left, right, key):
        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            if key(left[i]) <= key(right[j]):
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        result.extend(left[i:])
        result.extend(right[j:])
        return result

    # ---------- Searching ----------
    def linear_search_by_amount(self, target_amount):
        matches = []
        for transaction in self.transactions:
            if transaction.amount == target_amount:
                matches.append(transaction)
        return matches

    def binary_search_by_amount(self, target_amount):
        sorted_list = self.sorted_by("amount")
        low, high = 0, len(sorted_list) - 1
        while low <= high:
            mid = (low + high) // 2
            if sorted_list[mid].amount == target_amount:
                return sorted_list[mid]
            elif sorted_list[mid].amount < target_amount:
                low = mid + 1
            else:
                high = mid - 1
        return None


def run():
    accounts = AccountBST()
    branches = BranchTree()
    transfers = TransferGraph()
    urgent = TransactionHeap()
    ledger = TransactionLedger()  

    income = 0
    expense = 0
    inventory = {}

    menu = """MENU
    ========== Clean Addis Bank System ==========
 1  Add new branch / employee        (Tree)
 2  Add money transfer connection    (Graph)
 3  Show all connected customers     (BFS/DFS)
 4  Add urgent transaction           (Heap)
 5  Process highest priority txn     (Heap)
 6  Search for customer account      (BST)
 7  Create account
 8  Deposit
 9  Withdraw
10  Show all accounts
11  Apply interest (savings)
12  Add income
13  Add expense
14  Show finance summary
15  Add/update inventory item
16  View inventory
17  Add ledger transaction                    
18  Show ledger total balance (recursive)      
19  Show ledger sorted by amount/date          
20  Linear search ledger by amount             
21  Binary search ledger by amount             
 0  Exit
    """

    while True:
        print(menu)
        choice = input("Choice: ").strip()

        if choice == "1":
            parent = input(f"Parent name (Enter for '{branches.root.name}'): ") or branches.root.name
            name = input("New branch/employee name: ")
            role = input("Role (Branch/Manager/Employee): ")
            branches.add_node(parent, name, role)

        elif choice == "2":
            a = input("Customer/account A: ")
            b = input("Customer/account B: ")
            transfers.add_transfer(a, b)
            print(f"Transfer link added between {a} and {b}")

        elif choice == "3":
            start = input("Start from customer/account: ")
            method = input("BFS or DFS? ").strip().lower()
            if method == "dfs":
                print("Connected customers (DFS):", transfers.dfs(start))
            else:
                print("Connected customers (BFS):", transfers.bfs(start))

        elif choice == "4":
            number = input("Account number: ")
            description = input("Description: ")
            priority = int(input("Priority (higher number = more urgent): "))
            urgent.add(priority, number, description)
            print("Urgent transaction queued.")

        elif choice == "5":
            urgent.process_highest()

        elif choice == "6":
            number = input("Account number to search: ")
            account = accounts.search(number)
            if account:
                account.statement()
            else:
                print("Account not found.")

        elif choice == "7":
            number = input("Account number: ")
            name = input("Name: ")
            kind = input("Type (saving/current): ")
            account = AccountFactory.create(kind, number, name)
            accounts.insert(account)
            transfers.add_customer(number)
            print("Account created.")

        elif choice == "8":
            number = input("Account: ")
            amount = float(input("Amount: "))
            account = accounts.search(number)
            account.deposit(amount) if account else print("Account not found.")

        elif choice == "9":
            number = input("Account: ")
            amount = float(input("Amount: "))
            account = accounts.search(number)
            account.withdraw(amount) if account else print("Account not found.")

        elif choice == "10":
            all_accounts = accounts.in_order()
            if not all_accounts:
                print("No accounts yet.")
            for account in all_accounts:
                account.statement()

        elif choice == "11":
            for account in accounts.in_order():
                if isinstance(account, SavingsAccount):
                    account.apply_interest()
            print("Interest applied to all savings accounts.")

        elif choice == "12":
            amount = float(input("Income amount: "))
            income += amount
            print(f"Income of {amount} added. Total income: {income}")

        elif choice == "13":
            amount = float(input("Expense amount: "))
            expense += amount
            print(f"Expense of {amount} added. Total expense: {expense}")

        elif choice == "14":
            print("\n===== Personal Finance Summary =====")
            print("Income:", income)
            print("Expense:", expense)
            print("Balance:", income - expense)

        elif choice == "15":
            item = input("Item name: ")
            quantity = int(input("Quantity: "))
            inventory[item] = quantity
            print("Inventory updated.")

        elif choice == "16":
            if not inventory:
                print("No inventory yet.")
            for item, quantity in inventory.items():
                print(f"{item}: {quantity}")

        # ---------------- Day 7 additions ----------------
        elif choice == "17":
            amount = float(input("Amount: "))
            date = input("Date (YYYY-MM-DD): ")
            ttype = input("Type (credit/debit): ")
            ledger.add(amount, date, ttype)
            print("Ledger transaction added.")

        elif choice == "18":
            print("Ledger total balance (recursive):", ledger.total_balance())

        elif choice == "19":
            field = input("Sort by 'amount' or 'date': ").strip().lower() or "amount"
            for t in ledger.sorted_by(field):
                print(t)

        elif choice == "20":
            amount = float(input("Amount to find: "))
            matches = ledger.linear_search_by_amount(amount)
            print(f"Found {len(matches)} match(es):" if matches else "No match found.")
            for t in matches:
                print(t)

        elif choice == "21":
            amount = float(input("Amount to find: "))
            result = ledger.binary_search_by_amount(amount)
            print(result if result else "No match found.")

        elif choice == "0":
            print("Goodbye")
            break

        else:
            print("Invalid choice")


if __name__ == "__main__":
    run()