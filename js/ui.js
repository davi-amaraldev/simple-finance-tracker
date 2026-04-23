const incomeDisplay = document.querySelector('#incomeDisplay');
const expenseDisplay = document.querySelector('#expenseDisplay');
const balanceDisplay = document.querySelector('#balanceDisplay');
const transactionsList = document.querySelector('#transactionsList')

function formatCurrency(value){
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function renderSummary(income, expense, balance){
    incomeDisplay.textContent = formatCurrency(income);
    expenseDisplay.textContent = formatCurrency(expense);
    balanceDisplay.textContent = formatCurrency(balance);
 
}

export function renderTransactions(transactions){
    transactionsList.innerHTML = '';

    for (const transaction of transactions){
        const typeLabel = transaction.type === 'income' ? 'Receita' : 'Despesa';
        const sign = transaction.type === 'income' ? '+' : '-';

        transactionsList.insertAdjacentHTML('beforeend', `
            <article class="transaction-item ${transaction.type}">
                <div>
                    <h4>${transaction.title}</h4>
                    <p class="transaction-type">${typeLabel}</p>
                </div>

                <div class="transaction-right">
                    <strong>${sign} ${formatCurrency(transaction.amount)}</strong>
                    <button 
                        class="delete-btn" 
                        type="button"
                        data-id="${transaction.id}"
                    >
                        Remover
                    </button>
                </div>
            </article>
        `);
    }
}

