import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseList from '../components/ExpenseList';
import ChartComponent from '../components/ChartComponent';
import { getExpenses, addExpense, deleteExpense } from '../services/expense-service';

/**
 * this is the main page component that manages the state of all expenses and handles complex filtering!
 */
const HomePage = ({ isDarkMode, toggleDarkMode }) => {
    // this is the expense state
    const [expenses, setExpenses] = useState([]);
    
    // NEW STATE: this will track what the user is filtering by (category, date, or all)
    const [filterType, setFilterType] = useState('all'); 
    
    // this is the category filter state 
    const [filterCategory, setFilterCategory] = useState('All');
    
    //this is the date filter state
    const [filterDate, setFilterDate] = useState(''); 
    
    //this will load all the initial data when the page first loads.
    useEffect(() => {
        const initialExpenses = getExpenses();
        setExpenses(initialExpenses);
    }, []);

    // this are the handlers for add and delete expense 
    const handleAddExpense = useCallback((newExpense) => {
        const updatedExpenses = addExpense(newExpense); 
        setExpenses(updatedExpenses);
    }, []);

    const handleDeleteExpense = useCallback((id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            const updatedExpenses = deleteExpense(id);
            setExpenses(updatedExpenses);
        }
    }, []);

    // LOGIC: Filter by Filter Type (Category OR Date)
    const processedExpenses = useMemo(() => {
        let filtered = expenses;
        
        // Apply the filter based on the selected type
        if (filterType === 'category' && filterCategory !== 'All') {
            // filter by category
            filtered = filtered.filter(exp => exp.category === filterCategory);
        } else if (filterType === 'date' && filterDate) {
            // filter by single date
            filtered = filtered.filter(exp => exp.date === filterDate);
        }
        
        // here the list will remain sorted by date descending due to the service layer's getExpenses logic
        return filtered;

    }, [expenses, filterType, filterCategory, filterDate]); // dependencies will be  updated

    return (
        <div className="w-full max-w-6xl mx-auto">
            <header className={`text-center mb-10 p-4 rounded-xl shadow-lg border-b-4 
                ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-600'}`}>
                <div className="flex justify-between items-center">
                    <div className="w-10"></div>
                    <h1 className={`text-3xl sm:text-4xl font-extrabold 
                        ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>
                        Daily Expense Tracker
                    </h1>
                    <button 
                        onClick={toggleDarkMode} 
                        className={`p-2 rounded-full transition duration-300 
                            ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                </div>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Track daily expenses with category summaries.
                </p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <ExpenseForm onSubmit={handleAddExpense} isDarkMode={isDarkMode} />
                </div>
                <div className="lg:col-span-1">
                    <ExpenseSummary expenses={expenses} isDarkMode={isDarkMode} /> 
                </div>
            </div>

            <ChartComponent expenses={expenses} isDarkMode={isDarkMode} />

            {/* Expense List - Passing all the filter props */}
            <ExpenseList 
                expenses={processedExpenses} 
                onDelete={handleDeleteExpense}
                
                // filter type controls
                filterType={filterType}
                setFilterType={setFilterType}
                
                //category controls
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                
                // date controls
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                
                isDarkMode={isDarkMode}
            />
        </div>
    );
};

export default HomePage;