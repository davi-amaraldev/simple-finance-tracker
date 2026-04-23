export function calculateIncome(transactions){
    let total = 0;

    for (let transaction of transactions){
        if(transaction.type === 'income'){
            total += transaction.amount;
        }
    }

    return total;
}

export function calculateExpense(transactions){
    let total = 0;

    for (let transaction of transactions){
        if(transaction.type === 'expense'){
            total += transaction.amount;
        }
    }

    return total;
}

export function calculateBalance(transactions){
    return calculateIncome(transactions) - calculateExpense(transactions);
}