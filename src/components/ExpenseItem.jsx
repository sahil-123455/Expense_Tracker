import React, { useState } from 'react';

/**
 * this is the component to display a single expense entry as a row in the list.
 */
const ExpenseItem = ({ expense, isDarkMode, onDelete }) => {
    // this is the local state to control the visibility of the detail modal
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const { amount, category, date, summary, id } = expense;
    
    // this is to format the date to look clean (e.g., "Oct 28, 2025").
    const displayDate = new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'short', day: 'numeric'
    });

    // this is for the detailed dateand time for modal
    const detailedDateTime = new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    // this is to handle when the row is clicked to open the modal  but only if the screen is small.
    const handleRowClick = () => {
        // first we check the width of the window to see if the element is hidden by CSS 
        // the sm breakpoint is usually 640px.
        if (window.innerWidth < 640) { 
            setIsModalOpen(true);
        }
    };
    
    // here is the detail modal component 
    const DetailModal = () => {
        if (!isModalOpen) return null;

        const modalClasses = isDarkMode ? 
            'bg-gray-800 text-white border-emerald-400' : 
            'bg-white text-gray-900 border-emerald-500';

        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                <div className={`w-full max-w-sm p-5 rounded-xl shadow-2xl border-t-4 ${modalClasses}`}>
                    <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Full Expense Details</h3>
                    <div className="space-y-2 text-sm">
                        <p><strong>Amount:</strong> ₹ {amount.toFixed(2)}</p>
                        <p><strong>Category:</strong> {category}</p>
                        <p><strong>Date:</strong> {detailedDateTime}</p>
                        <p><strong>Summary:</strong> {summary || 'N/A'}</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="mt-5 w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        );
    };
   

    return (
        <>
            {/* this is the main list row ( which is only clickable on mobile) */}
            <div 
                // default grid-cols-3 for small screens, expanding to 5 on 'sm' breakpoint
                className={`grid grid-cols-3 sm:grid-cols-5 gap-2 py-3 px-4 border-b transition duration-300 hover:shadow-sm items-center cursor-pointer 
                            ${isModalOpen ? 'bg-emerald-100 dark:bg-gray-700' : ''} ${isDarkMode ? 'hover:bg-gray-700 border-gray-700' : 'hover:bg-emerald-50 border-gray-100'}`}
                onClick={handleRowClick} // this calls the modal logic on click
            >
                
                {/*  amount */}
                <div className={`col-span-1 font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'} truncate`}>
                    ₹ {amount.toFixed(2)}
                </div>
                
                {/* category */}
                <div className="col-span-1 text-sm text-gray-600 truncate flex flex-col sm:flex-row sm:justify-start sm:items-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-200 text-emerald-800'} mb-1 sm:mb-0`}>{category}</span>
                </div>
                
                {/* summary (hidden on mobile shown on desktop) */}
                <div className={`col-span-2 hidden sm:block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} truncate`}>
                    {summary || '—'}
                </div>
                
                {/* trash icon */}
                <div className="col-span-1 flex items-center justify-end sm:justify-start space-x-1"> 
                    
                    {/* date (visible on tablet/desktop only) */}
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-24 flex-grow text-right pr-2 hidden sm:inline`}>
                        {displayDate}
                    </span>

                    {/* delete button  */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // this is crucial as it prevents the button click from also triggering the handleRowClick (modal)
                            onDelete(id); 
                        }}
                        className="p-1.5 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition duration-150 flex-shrink-0"
                        aria-label="Delete Expense"
                    >
                        {/* trash icon (svg) */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.5H2.5a.75.75 0 000 1.5h15a.75.75 0 000-1.5H14v-.5A2.75 2.75 0 0011.25 1h-2.5zM10 5a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 0110 5zm3.75 5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75z" clipRule="evenodd" />
                            <path d="M4 6.5A.5.5 0 014.5 6h11A.5.5 0 0116 6.5v8a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 013 14.5v-8z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* here we render the modal */}
            <DetailModal />
        </>
    );
};

export default ExpenseItem;