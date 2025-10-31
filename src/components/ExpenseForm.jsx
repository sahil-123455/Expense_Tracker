import React, { useState } from 'react';
import { CATEGORIES } from '../utils/constants';

/**
 * this is the form component to handle adding of new expenses.
 */
const ExpenseForm = ({ onSubmit, isDarkMode }) => { 
    
    const [formData, setFormData] = useState({ 
        amount: '', 
        category: '', 
        date: '', 
        summary: '' 
    });

    // now errors are tracked per field
    const [fieldErrors, setFieldErrors] = useState({});
    
    // this is the state for success message notification!!
    const [statusMessage, setStatusMessage] = useState(''); 

    // this is to calculate today's date for max attribute (locking the calendar)
    const todayISO = new Date().toISOString().split('T')[0];

    /**
     * this helper function validates the entire form.
     */
    const validateForm = (data) => {
        const errors = {};
        const parsedAmount = parseFloat(data.amount);

        // this is to check for valid amount
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            errors.amount = 'Please enter a valid positive amount.';
        }
        
        // this is to check for category selection
        if (!data.category) {
            errors.category = 'Please select a category.';
        }
        
        // this is to check for date selection
        if (!data.date) {
            errors.date = 'Please select a date.';
        }
        
        return errors;
    };

    /**
     * this will updates the component state when an input field changes.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStatusMessage(''); 
        
        // here is the strict input filtering for the amount field
        if (name === 'amount') {
            const filteredValue = value.match(/^-?\d*\.?\d*$/) ? value : formData.amount;
            
            // this will clear error for the current field as the user types
            setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
            setFormData(prevData => ({ ...prevData, [name]: filteredValue }));
            
            // this if for the immediate validation display check
            const validationCheck = validateForm({ ...formData, amount: filteredValue });
            if (validationCheck.amount && filteredValue !== '') {
                setFieldErrors(prevErrors => ({ ...prevErrors, amount: validationCheck.amount }));
            }
            return;
        }

        // this is to clear error for other fields
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    /**
     * this will handle validation when user clicks out of an input field 
     */
    const handleBlur = (event) => {
        const { name, value } = event.target;
        const errors = validateForm(formData); 
        
        // this is critical as when a future date is manually typed the browser will invalidate the field 
        // even if our JS check is removed. We show the generic error if a fundamental error exists.
        if (name === 'date' && value && value > todayISO) {
            setFieldErrors(prevErrors => ({ ...prevErrors, date: 'Expense date cannot be in the future.' }));
            return;
        }

        // this is to only show error for the specific field the user just left
        if (errors[name]) {
            setFieldErrors(prevErrors => ({ ...prevErrors, [name]: errors[name] }));
        }
    };

    /**
     * it handle the button click and validates data and submits the expense.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // this will run full validation check for submission
        const errors = validateForm(formData);
        
        // this is to re-check future date here manually in case of direct submit
        if (formData.date && formData.date > todayISO) {
            errors.date = 'Expense date cannot be in the future.';
        }
        
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            setStatusMessage('');
            return;
        }

        // SUCCESS LOGIC
        onSubmit(formData); 
        
        // it will set the success message and removal it after 3 sec..
        setStatusMessage('Expense added successfully! ✅');
        setTimeout(() => setStatusMessage(''), 3000); 

        // this will reset the  form fields for next entry
        setFormData(prevData => ({ 
            ...prevData, 
            amount: '', 
            summary: '',
            category: '', 
            date: '' 
        }));
    };

    // reusable input classes for dark mode
    const inputClass = `mt-1 block w-full border rounded-lg shadow-sm p-2 transition duration-150 
        ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-emerald-500 focus:border-emerald-500' : 
                      'bg-white text-gray-800 border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'}`;
    
    const labelClass = `block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
    const errorMsgClass = 'text-xs text-red-500 mt-1'; // Class for validation messages

    return (
        // apply dark mode styling to the main card
        <div className={`p-6 rounded-xl shadow-xl h-full 
            ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-200'}`}>
            
            <style jsx>{`
                /* Hide the spinner buttons for Chrome/Safari/Edge/Opera */
                input[type='number']::-webkit-inner-spin-button,
                input[type='number']::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                /* Hide the spinner buttons for Firefox */
                input[type='number'] {
                    -moz-appearance: textfield;
                }
            `}</style>
            
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                Add New Expense
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4"> 
                
                {/* this is the amount field */}
                <div>
                    <label htmlFor="amount" className={labelClass}>Amount (₹)</label>
                    <input 
                        type="text" // here we are using type="text" for manual character filtering
                        inputMode="decimal" // Hint for mobile keyboard
                        id="amount" 
                        name="amount" 
                        value={formData.amount} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        className={inputClass} 
                        placeholder="Enter Amount" 
                        required 
                    />
                    {/* inline error message */}
                    {fieldErrors.amount && <p className={errorMsgClass}>{fieldErrors.amount}</p>} 
                </div> 

                {/* category field */}
                <div>
                    <label htmlFor="category" className={labelClass}>Category</label> 
                    <select 
                        id="category" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        className={inputClass} 
                        required
                    >
                        <option value="" disabled>Choose your Category</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {/* inline error message */}
                    {fieldErrors.category && <p className={errorMsgClass}>{fieldErrors.category}</p>}
                </div>

                {/* date field */}
                <div>
                    <label htmlFor="date" className={labelClass}>Date</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        onBlur={handleBlur} // this is crucial as it  checks future date instantly
                        className={inputClass} 
                        max={todayISO} //  this will lock the calendar
                        required 
                    />
                    {/* inline error message */}
                    {fieldErrors.date && <p className={errorMsgClass}>{fieldErrors.date}</p>}
                </div>

                {/* summary field */}
                <div>
                    <label htmlFor="summary" className={labelClass}>Summary (Optional)</label>
                    <input 
                        type="text" 
                        id="summary" 
                        name="summary" 
                        value={formData.summary} 
                        onChange={handleChange} 
                        className={inputClass} 
                        placeholder="Dinner with friends" 
                    />
                </div>

                {/* this is for displaying the success message */}
                {statusMessage && (
                    <div className="p-3 text-sm bg-emerald-100 text-emerald-800 rounded-lg shadow-sm font-medium dark:bg-emerald-800 dark:text-emerald-100">
                        {statusMessage}
                    </div>
                )} 

                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-emerald-600
                    hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 transform
                    hover:scale-[1.01] dark:focus:ring-offset-gray-800"
                >
                    Add Expense
                </button>
            </form> 
        </div>
    );
};

export default ExpenseForm;
