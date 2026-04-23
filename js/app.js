import { calculateIncome,calculateExpense,calculateBalance } from './balance.js';
import { saveTransactions, loadTransactions } from './storage.js';
import { Transaction } from './transaction.js';

const state = {
    // lista de transações do usuário
    transactions: loadTransactions(),
}

function addTransaction(title, amount, type){
    const id = crypto.randomUUID()
    const transaction = new Transaction(id, title, Number(amount), type);

    state.transactions.push(transaction);

    saveTransactions(state.transactions);

    update();
}

function update(){
    const transactions = state.transactions;

    const income = calculateIncome(transactions);
    const expense = calculateExpense(transactions);
    const balance = calculateBalance(transactions);

    console.log(income, expense, balance)
}