import { calculateIncome,calculateExpense,calculateBalance } from './balance.js';
import { saveTransactions, loadTransactions } from './storage.js';
import { Transaction } from './transaction.js';
import { renderSummary, renderTransactions } from './ui.js';

const transactionForm = document.querySelector('#transactionForm');
const transactionsList = document.querySelector('#transactionsList');
const titleInput = document.querySelector('#title');
const amountInput = document.querySelector('#amount');
const typeInput = document.querySelector('#type');
const errorDisplay = document.querySelector('#errorDisplay');
let errorTimeout;

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const amount = amountInput.value;
    const type = typeInput.value;

    addTransaction(title, amount, type);

    transactionForm.reset();
})

transactionsList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('delete-btn')) return;

    const id = e.target.dataset.id;
    removeTransaction(id);
})

const state = {
    transactions: loadTransactions(),
}

update();

function addTransaction(title, amount, type){
    const numericAmount = Number(amount);

    if(!title.trim()){
        showError('Não contém título.');
        return;
    }

    if (numericAmount <= 0 || Number.isNaN(numericAmount)) {
        showError('Valor inválido.');
        return;
    }

    const id = crypto.randomUUID()
    const transaction = new Transaction(id, title, numericAmount, type);

    state.transactions.push(transaction);

    saveTransactions(state.transactions);

    update();
}

function removeTransaction(id){
    state.transactions = state.transactions.filter(transaction => {
        return transaction.id !== id;
    });

    saveTransactions(state.transactions);

    update();
}

function update(){
    const transactions = state.transactions;

    const income = calculateIncome(transactions);
    const expense = calculateExpense(transactions);
    const balance = calculateBalance(transactions);

    renderSummary(income, expense, balance);
    renderTransactions(transactions);
}

function showError(msg){
    errorDisplay.textContent = msg;

    clearTimeout(errorTimeout);

    errorTimeout.setTimeout(() => {
        errorDisplay.textContent = '';
    }, 1500)
}