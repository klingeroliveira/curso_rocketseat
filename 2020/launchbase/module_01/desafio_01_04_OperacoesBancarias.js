const user = {
    name: 'Mariana',
    transactions: [],
    balance: 0
}

function createTransaction(transact) {
    user.transactions.push(transact)
    calculateBalance(transact)
}

function calculateBalance(transact) {
    if (transact.type == 'credit'){
        user.balance = user.balance + transact.value
    } else {
        user.balance = user.balance - transact.value
    }
}

createTransaction({type: 'credit', value: 50})
createTransaction({type: 'debit', value: 80})
createTransaction({type: 'credit', value: 120})
createTransaction({type: 'debit', value: 30})

console.log(user)

function getHigherTransactionByType(typeTransact) {

    for(let i=0; i < user.transactions.length; i++) {
        if((typeTransact.type == user.transactions[i].type) && (user.transactions[i].value) > typeTransact.value) {
            typeTransact.value = user.transactions[i].value
        }
    }

    return typeTransact
}

console.log(getHigherTransactionByType({type:'credit', value:'0'}))
console.log(getHigherTransactionByType({type:'debit', value:'0'}))

function getAverageTransactionValue() {
    let value = 0

    for(let i=0; i < user.transactions.length; i++){
        value = value + user.transactions[i].value
    }

    return value / user.transactions.length
}

console.log(getAverageTransactionValue())

function getTransactionsCount() {
    let transactionCount = {credit:0, debit:0}

    for(let i=0; i < user.transactions.length; i++){
        if(user.transactions[i].type == 'credit'){
            transactionCount.credit = transactionCount.credit + 1
        } else transactionCount.debit = transactionCount.debit + 1
    }

    return transactionCount
}

console.log(getTransactionsCount())