# Utility functions


def add_tax(price, rate=0.15):

    tax = price * rate

    total = price + tax

    return total