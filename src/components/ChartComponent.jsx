import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { calculateSummary } from './ExpenseSummary'; 

// it is a must to register Chart.js elements once at the start.
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * this will display a Pie Chart showing the distribution of expenses by category.
 */
const ChartComponent = ({ expenses, isDarkMode }) => {
    const { categoryTotals } = useMemo(() => calculateSummary(expenses), [expenses]);

    // different colour for different categories
    const colorPalette = [
        '#059669', // Emerald
        '#2563eb', // Blue
        '#f59e0b', // Amber
        '#dc2626', // Red
        '#6366f1', // Indigo
        '#34d399', // Light Emerald
        '#a855f7', // Violet
        '#06b6d4', // Cyan
        '#6b7280', // Gray
        '#f97316'  // Orange
    ];

    // it prepares the data structure that  Chart.js needs.
    const chartData = useMemo(() => {
        const labels = Object.keys(categoryTotals);
        const dataValues = Object.values(categoryTotals);
        
        return {
            labels: labels,
            datasets: [
                {
                    data: dataValues,
                    // assign colors from the distinct colours, cycling through the array
                    backgroundColor: labels.map((_, index) => colorPalette[index % colorPalette.length]),
                    borderColor: isDarkMode ? '#1f2937' : '#ffffff', // Border color based on theme
                    borderWidth: 1,
                },
            ],
        };
    }, [categoryTotals, isDarkMode]);

    // this is to set chart options dynamically for changing the legend text color for dark mode.
    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    // change the text color to dark mode
                    color: isDarkMode ? '#d1d5db' : '#374151', 
                },
            },
        },
    };

    if (expenses.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500 italic">Add expenses to see the chart visualization.</div>
        );
    }

    return (
        // this is the main card dark mode styling
        <div className={`mt-8 p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl 
                        ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:shadow-gray-700' : 'bg-white border-emerald-200'}`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Category Visualization</h3>
            <div className="w-full max-w-md mx-auto">
                {/* to apply dynamic options to the Pie chart */}
                <Pie data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default ChartComponent;