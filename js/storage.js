const STORAGE_KEY = 'simple_finance_tracker_v1';

export function saveTransactions(transactions){
    const data = JSON.stringify(transactions);
    localStorage.setItem(STORAGE_KEY, data);
}

export function loadTransactions(){
    const data = localStorage.getItem(STORAGE_KEY);

    if(!data) return [];
    return JSON.parse(data);

}