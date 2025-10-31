💰 Daily Expense Tracker (React & Tailwind CSS)

Live Demo 
Click here to view the live, fully functional application: [https://expense-tracker-mu-two-19.vercel.app/]

🎯 Project Overview:

This application is a robust, responsive expense tracker built using React Hooks and styled with Tailwind CSS. It was developed as a technical assignment to demonstrate competence in essential frontend skills, including: State Management (Hooks), Immutability, Advanced Validation, and Responsive Design.

✨ Key Features and Technical Highlights:

This project goes beyond basic CRUD operations by focusing on performance and user experience:

🛡️ Strict Input and Validation Control

We implemented robust validation at the input level. This includes inline validation (errors appear instantly upon leaving the field) and JavaScript RegEx filtering on the Amount input to strictly prevent users from typing any non-numeric characters. Furthermore, validation logic actively prevents the user from manually entering a future date, providing immediate error feedback if they attempt to do so.

⚡ Performance Optimization

We used modern React techniques to ensure smooth performance:

useMemo:

Used to cache the filtered and processed expense data, ensuring the filtering logic only runs when its inputs change.

useCallback:

Used on event handlers (handleAddExpense, handleDeleteExpense) to maintain stable function references, which prevents unnecessary re-renders in child components.

🧠 Dynamic Filtering and Data Flow

The application features a dynamic filter system where the user can choose the filter type (Category or Date) first. The corresponding input field appears, and the list, chart, and summary update instantly based on the active selection. Data persistence is handled via a dedicated Service Layer that uses localStorage for reliable storage.

🌙 Advanced UX/UI Features

The app includes two high-value UX enhancements:

A fully functional Dark Mode toggle, implemented using the Tailwind class strategy for theme persistence.

A View Details Modal for mobile users. This ensures that essential data (Summary, Date), which is hidden on small screens, remains accessible when the user clicks the expense row.

💻 Technical Architecture:

The application adheres strictly to professional standards for clean code and scalability.

📁 File Structure (Separation of Concerns)

We used the standard, modular file structure:

src/pages/: Contains the State Orchestrator (HomePage.jsx).

src/components/: Houses all Presentation Components (ExpenseForm, ExpenseList, etc.).

src/services/: The Data Layer (expense-service.js).

🧠 Core Logic

Immutability: The service layer uses Array.filter() for deletion, ensuring the old state is never directly modified, which is crucial for reliable React state updates.

Theme Control: The Dark Mode feature relies on the Tailwind class strategy. A useEffect hook in App.jsx controls the global .dark class, which Tailwind reads to flip the theme.
