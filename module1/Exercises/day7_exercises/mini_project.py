
#Day 7 - Basic Exercises DSA I: Linear Structures & Big-O




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
    ledger = TransactionLedger()

    menu = """MENU
    ========== Ledger: Linear Structures & Big-O ==========
1  Add ledger transaction
2  Show ledger total balance (recursive)
3  Show ledger sorted by amount/date
4  Linear search ledger by amount
5  Binary search ledger by amount
5  Exit
    """

    while True:
        print(menu)
        choice = input("Choice: ").strip()

        if choice == "17":
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