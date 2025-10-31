import React, { useMemo } from 'react';

/**
 * this is the helper function that calculates the total amount and category breakdown.
 */
export const calculateSummary = (expenses) => {
    let totalAmount = 0;
    const categoryTotals = {};

    expenses.forEach(expense => {
        totalAmount += expense.amount;
        const category = expense.category || 'Uncategorized';
        categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
    });

    return { totalAmount, categoryTotals };
};


/**
 * this will display the overall total spending and the total breakdown for each category.
 */
const ExpenseSummary = ({ expenses, isDarkMode }) => { 
    const { totalAmount, categoryTotals } = useMemo(() => calculateSummary(expenses), [expenses]);
    const categoryList = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a);

    return (
        // this is the main card dark mode
        <div className={`p-6 rounded-xl shadow-xl h-full transition duration-300 hover:shadow-2xl 
                        ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:shadow-gray-700' : 'bg-white border-emerald-200'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Spending Summary</h2>
            
            {/* overall total card */}
        <div className={`mb-4 p-4 rounded-xl border-l-4 shadow-sm transition duration-300 transform hover:scale-[1.01]
                         ${isDarkMode ? 'bg-gray-700 border-emerald-500' : 'bg-emerald-50 border-emerald-500'}`}>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>TOTAL SPENT</p>
                <p className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-emerald-900'} mt-1`}>
                    ₹ {totalAmount.toFixed(2)}
                </p>
            </div>
            
            {/* this is for category breakdown */}
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total per Category</h3>
            <ul className="space-y-2 max-h-56 overflow-y-auto pr-2">
                {categoryList.length > 0 ? (
                    categoryList.map(([category, total]) => (
                        // here is the individual list item and dark mode styling
                        <li key={category} className={`flex justify-between items-center text-sm p-3 rounded-lg transition-colors duration-200 hover:shadow-md
                            ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}
                        >
                            <span className="font-medium">{category}</span>
                            <span className="font-semibold">₹ {total.toFixed(2)}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 italic text-sm">No expenses to summarize.</p>
                )}
            </ul>
        </div>
    );
};

export default ExpenseSummary;
