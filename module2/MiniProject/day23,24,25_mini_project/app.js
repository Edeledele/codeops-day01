// ============================================
// Budget App — app.js
// Handles state, persistence, rendering, and events
// ============================================

const STORAGE_KEY = 'budgetApp.transactions';

const CATEGORY_COLORS = {
    Food: '#f59e0b',
    Transport: '#3b82f6',
    Bills: '#ef4444',
    Shopping: '#a855f7',
    Entertainment: '#ec4899',
    Other: '#64748b'
};

// ---------- State ----------
let transactions = loadTransactions();
let activeFilter = 'all';

// ---------- Elements ----------
const modal = document.getElementById('transactionModal');
const form = document.getElementById('transactionForm');
const typeSelect = document.getElementById('type');
const categoryGroup = document.getElementById('categoryGroup');
const categorySelect = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const formNotification = document.getElementById('formNotification');

const incomeDisplay = document.getElementById('incomeDisplay');
const expenseDisplay = document.getElementById('expenseDisplay');
const balanceDisplay = document.getElementById('balanceDisplay');
const savingRateDisplay = document.getElementById('savingRateDisplay');

const transactionList = document.getElementById('transactionList');
const emptyState = document.getElementById('emptyState');
const filterTabs = document.getElementById('filterTabs');
const breakdownList = document.getElementById('breakdownList');
const breakdownEmpty = document.getElementById('breakdownEmpty');

const openModalButtons = [
    document.getElementById('getStartedBtn'),
    document.getElementById('heroGetStartedBtn'),
    document.getElementById('heroAddBtn')
];
const closeFormBtn = document.getElementById('closeFormBtn');

// ---------- Persistence ----------
function loadTransactions() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error('Could not load saved transactions:', err);
        return [];
    }
}

function saveTransactions() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (err) {
        console.error('Could not save transactions:', err);
    }
}

// ---------- Helpers ----------
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function showNotification(message, type = 'success') {
    formNotification.textContent = message;
    formNotification.className = `notification-box notification-${type}`;
    formNotification.style.display = 'block';
}

function hideNotification() {
    formNotification.style.display = 'none';
}

// ---------- Modal control ----------
function openModal() {
    modal.style.display = 'flex';
    dateInput.valueAsDate = dateInput.valueAsDate || new Date();
    document.body.style.overflow = 'hidden';
    descriptionInput.focus();
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    form.reset();
    categoryGroup.style.display = 'none';
    hideNotification();
}

openModalButtons.forEach(btn => btn && btn.addEventListener('click', openModal));
closeFormBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
});

// Show category picker only for expenses
typeSelect.addEventListener('change', () => {
    categoryGroup.style.display = typeSelect.value === 'expense' ? 'flex' : 'none';
});

// ---------- Form submit ----------
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = typeSelect.value;
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const category = type === 'expense' ? categorySelect.value : 'Income';

    if (!type || !description || !date || isNaN(amount) || amount <= 0) {
        showNotification('Please fill in every field with a valid amount.', 'error');
        return;
    }

    const transaction = {
        id: generateId(),
        type,
        description,
        category,
        amount,
        date
    };

    transactions.unshift(transaction);
    saveTransactions();
    render();

    showNotification(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`, 'success');
    form.reset();
    categoryGroup.style.display = 'none';

    setTimeout(closeModal, 700);
});

// ---------- Delete ----------
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    render();
}

// ---------- Filters ----------
filterTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    [...filterTabs.children].forEach(tab => tab.classList.toggle('active', tab === btn));
    render();
});

// ---------- Rendering ----------
function computeStats() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    const savingRate = income > 0 ? Math.max(0, ((income - expense) / income) * 100) : 0;
    return { income, expense, balance, savingRate };
}

function renderStats() {
    const { income, expense, balance, savingRate } = computeStats();
    incomeDisplay.textContent = formatCurrency(income);
    expenseDisplay.textContent = formatCurrency(expense);
    balanceDisplay.textContent = formatCurrency(balance);
    savingRateDisplay.textContent = `${savingRate.toFixed(0)}%`;
    balanceDisplay.style.color = balance < 0 ? '#ef4444' : '#10b981';
}

function renderTable() {
    const filtered = transactions
        .filter(t => activeFilter === 'all' || t.type === activeFilter)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    transactionList.innerHTML = '';

    const listWrapper = transactionList.closest('.transaction-list');
    if (transactions.length === 0) {
        listWrapper.querySelector('table').style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }
    listWrapper.querySelector('table').style.display = 'table';
    emptyState.style.display = 'none';

    if (filtered.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" class="no-results">No ${activeFilter} transactions to show.</td>`;
        transactionList.appendChild(row);
        return;
    }

    filtered.forEach(t => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="badge badge-${t.type}">${t.type}</span></td>
            <td>${escapeHtml(t.description)}</td>
            <td><span class="category-chip">${escapeHtml(t.category)}</span></td>
            <td class="${t.type === 'income' ? 'income-amount' : 'expense-amount'}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </td>
            <td>${formatDate(t.date)}</td>
            <td>
                <button class="btn-delete" title="Delete transaction" data-id="${t.id}">Delete</button>
            </td>
        `;
        transactionList.appendChild(row);
    });

    transactionList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteTransaction(btn.dataset.id));
    });
}

function renderBreakdown() {
    const expenses = transactions.filter(t => t.type === 'expense');

    if (expenses.length === 0) {
        breakdownList.innerHTML = '';
        breakdownEmpty.style.display = 'block';
        breakdownList.appendChild(breakdownEmpty);
        return;
    }
    breakdownEmpty.style.display = 'none';

    const totals = {};
    expenses.forEach(t => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

    const totalExpense = Object.values(totals).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

    breakdownList.innerHTML = '';
    sorted.forEach(([category, amount]) => {
        const pct = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
        const color = CATEGORY_COLORS[category] || '#64748b';

        const row = document.createElement('div');
        row.className = 'breakdown-row';
        row.innerHTML = `
            <div class="breakdown-label">
                <span>${escapeHtml(category)}</span>
                <span>${formatCurrency(amount)} · ${pct.toFixed(0)}%</span>
            </div>
            <div class="breakdown-bar-track">
                <div class="breakdown-bar-fill" style="width:${pct}%; background:${color};"></div>
            </div>
        `;
        breakdownList.appendChild(row);
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function render() {
    renderStats();
    renderTable();
    renderBreakdown();
}

// ---------- Init ----------
render();