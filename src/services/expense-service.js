/**
 * it handles all the data operations.. like reading and writing from the local storage!!
 */

// this is the key which we will use to store data and retrive data in the browser local storage..
const STORAGE_KEY = 'expenseTrackerData';

/**
 * all the expenses will be retrived from the local storage,it will also load the saved data
  @returns {Array<Object>} the list of expenses are sorted so the newest one will be first.
 */
export const getExpenses = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const expenses = data ? JSON.parse(data) : [];
        
        // this will sort the expenses so the newest one  will appear at top of the list.
        return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        
    } catch (error) {
        console.error("Oops! There was an error reading from Local Storage:", error);
        return [];
    }
};

/**
 *  this will save the current list of expenses back to the local storage.
 */
const saveExpenses = (expenses) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
        console.error("Oops! There was an error writing to Local Storage:", error);
    }
};

/**
 * this will add a new expense item and save the updated list.
 * @returns {Array<Object>} the updated list of expenses.
 */
export const addExpense = (newExpense) => {
    const expenses = getExpenses();
    const expenseWithId = {
        ...newExpense,
        id: Date.now(), // this will create a simple unique ID using the current time

        //this will make sure the amount is saved as a number 
        amount: parseFloat(newExpense.amount) 
    };

    expenses.unshift(expenseWithId); // this will put  the new expense at the start of the list.
    saveExpenses(expenses);
    return expenses;
};

/**
 * here this will delete the expense item by its unique ID and willl save the updated list
 * @param {number} id - this will get the  ID of the expense to be deleted.
 * @returns {Array<Object>} this will return the  updated list of expenses.
 */
export const deleteExpense = (id) => {
    const expenses = getExpenses();
    
    // here we filter out the expense that will match the given ID.
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    
    saveExpenses(updatedExpenses);
    return updatedExpenses;
};