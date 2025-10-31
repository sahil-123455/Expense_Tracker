import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';

/**
 * This is the  root component which wraps this entire application and also manage dark mode state.
 * it also  read and write the theme preference from the local storage
 */
const App = () => {
    // here we initialize the  dark mode state based on what is saved in the local storage defaulting to light
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // this is the effect to apply the dark class to the root HTML element and save the preference
    useEffect(() => {
        const root = document.documentElement;
        
        if (isDarkMode) {
            root.classList.add('dark') 
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    /**
     * this is the function to toggle the dark mode state  passed down to the components.
     */
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        // here we apply dynamic background classes to the wrapper container.
        <div className={`min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-emerald-50 text-gray-900'}`}>
            {/* Import Inter font for a modern look */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                .font-sans {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
            
            {/* this is where we pass the dark mode state and toggle function down to the HomePage */}
            <HomePage 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode} 
            />  
        </div>
    );
};

export default App;