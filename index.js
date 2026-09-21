let transactions = [];
let editingId = null;
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const addBtn = document.getElementById("addBtn");
const container = document.getElementById("container");



addBtn.addEventListener('click', () => {
    const newTransaction = {
    id: editingId ? editingId : Date.now(),
    descriptionInput: descriptionInput.value.toLowerCase(),
    amountInput: Number(amountInput.value),
    categoryInput: categoryInput.value,
    dateInput: dateInput.value
   } 


        if(editingId) {
            transactions = transactions.map(transaction => {
            if (transaction.id === editingId) {
                return newTransaction;
            }
            return transaction;
        });

        editingId = null; 
    }else {
           transactions.push(newTransaction)
    }


    addExpense();
    displayTransaction(transactions)
       descriptionInput.value = '';
       amountInput.value = '';
       categoryInput.value = '';
       dateInput.value = '';

})

function displayTransaction(transactionArray) {
    container.innerHTML = transactionArray.map( transaction => {
        return `
          <div class="transaction">
                        <div class="transaction-left">
                            <div class="transaction-icon">
                                🍔
                            </div>
                            <div>
                                <div class="transaction-name">
                                    ${transaction.descriptionInput}
                                </div>
                                <div class="transaction-category">
                                      ${transaction.categoryInput}
                                </div>
                            </div>

                        </div>
                        <div>
                            <div class="transaction-amount expense">
                                - GH₵ 25.00
                            </div>

                            <div class="transaction-date">
                                ${transaction.dateInput}
                            </div>
                        </div>
                        <div class="transaction-actions">
    <button class="edit-btn" data-id="${transaction.id}">Edit</button>
    <button class="delete-btn" data-id="${transaction.id}">Delete</button>
</div>
                    </div>
`;
    }).join('');

}

container.addEventListener('click' ,(event) => {
        const id = Number(event.target.dataset.id);
        
    if(event.target.classList.contains('delete-btn')) {
        
        transactions = transactions.filter(transaction => transaction.id !== id);
        displayTransaction(transactions);      
    }
    
      if(event.target.classList.contains('edit-btn')) {
              const transaction = transactions.find(t => t.id === id);
               descriptionInput.value = transaction.descriptionInput;
               amountInput.value = transaction.amountInput;
               categoryInput.value = transaction.categoryInput;
               dateInput.value = transaction.dateInput;

               editingId = id
    }
})