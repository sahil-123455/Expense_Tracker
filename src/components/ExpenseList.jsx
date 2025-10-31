import React from 'react';
import ExpenseItem from './ExpenseItem';
import { CATEGORIES } from '../utils/constants';

/**
 *  it will display the list of expenses with dynamic filter controls.
 */
const ExpenseList = ({ 
    expenses, 
    onDelete, 
    isDarkMode,
    
    // filter type props (pass through props)
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    filterDate,
    setFilterDate,
}) => {
    
    // reusable classes
    const inputClass = `p-2 border rounded-lg shadow-sm text-sm transition duration-150 
        ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-emerald-500 focus:border-emerald-500' : 
                      'bg-white text-gray-800 border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'}`;
    const labelClass = `text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

    // helper function..
    const filterTypeOptions = [
        { value: 'all', label: 'All' },
        { value: 'category', label: 'Category' },
        { value: 'date', label: 'Date' },
    ];
    
    const categoryFilterOptions = ['All', ...CATEGORIES];

    const handleFilterTypeChange = (e) => {
        const newType = e.target.value;
        setFilterType(newType);
        setFilterCategory('All');
        setFilterDate('');
    };

    const renderSecondaryFilter = () => {
        // below is renderSecondaryFilter logic
        if (filterType === 'category') {
            return (
                <div className="flex items-center space-x-2">
                    <label htmlFor="categoryFilter" className={labelClass}>Select Category:</label>
                    <select
                        id="categoryFilter"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className={inputClass}
                    >
                        {categoryFilterOptions.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            );
        } else if (filterType === 'date') {
            return (
                <div className="flex items-center space-x-2">
                    <label htmlFor="filterDate" className={labelClass}>Select Date:</label>
                    <input
                        type="date"
                        id="filterDate"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className={`${inputClass} w-36`}
                    />
                    {filterDate && (
                        <button
                            onClick={() => setFilterDate('')}
                            className={`text-red-500 text-sm hover:text-red-400 cursor-pointer transition duration-150 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
                        >
                            Clear
                        </button>
                    )}
                </div>
            );
        }
        return null;
    };


    return (
        <div className={`mt-8 p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-200'}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Expense History</h2>
                
                {/*  this is the main filter controls container */}
                <div className="flex flex-wrap items-center gap-3">
                    
                    {/* 1. this is primary filter type dropdown */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="filterType" className={labelClass}>Filter By:</label>
                        <select
                            id="filterType"
                            value={filterType}
                            onChange={handleFilterTypeChange}
                            className={inputClass}
                        >
                            {filterTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* 2.this is  conditional secondasry filter */}
                    {renderSecondaryFilter()}

                </div>
            </div>

            {/* this is the list header */}
            <div className={`grid grid-cols-3 sm:grid-cols-5 gap-2 py-2 px-4 border-b-2 font-semibold text-sm rounded-t-lg
                         ${isDarkMode ? 'bg-gray-700 border-gray-600 text-emerald-400' : 'bg-emerald-50 border-emerald-400 text-emerald-700'}`}>
                <div className="col-span-1">Amount</div>
                <div className="col-span-1">Category</div>
                <div className="hidden sm:block col-span-2">Summary</div>
                <div className="col-span-1 ml-4">Date</div>
            </div>
            
            {/* this is the actual list of expense items */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {expenses.length > 0 ? (
                    expenses.map(expense => (
                        <ExpenseItem key={expense.id} expense={expense} isDarkMode={isDarkMode} onDelete={onDelete} />
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500 italic">No expenses found for this filter.</div>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;