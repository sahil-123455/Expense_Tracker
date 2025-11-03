💰 Daily Expense Tracker (React + Tailwind CSS)

🔗 Live Demo

Check out the fully functional app here:
👉 https://expense-tracker-mu-two-19.vercel.app/

🎯 Project Overview

This project is a responsive, feature-rich daily expense tracker built with React Hooks and styled using Tailwind CSS.
It was created as a technical assignment to demonstrate practical frontend skills such as state management, immutability, validation, and responsive design.

✨ Key Features & Highlights
🛡️ Smart Input Handling & Validation

The app comes with real-time validation to ensure accurate data entry.

Inline error messages appear instantly when a field loses focus.

The Amount field uses a RegEx filter to block non-numeric input.

The Date field prevents selecting any future dates, giving immediate feedback if users try to do so.

These small details make the form feel much more reliable and user-friendly.

⚡ Optimized for Performance

To keep things smooth, I used modern React optimization techniques:

useMemo() – Caches filtered data so the filtering logic runs only when needed.

useCallback() – Keeps event handlers (like add or delete) stable across renders, preventing unnecessary re-renders of child components.

Together, they help maintain a responsive and efficient UI even as the data grows.

🧠 Dynamic Filtering System

The app supports a flexible filtering experience.
Users can choose to filter expenses by Category or Date. Once a filter type is selected, the appropriate input appears automatically, and the expense list, chart, and summary update instantly.

All expense data is stored using a dedicated service layer built on localStorage, ensuring data persistence across sessions.

🌙 Enhanced UX/UI Features

A few thoughtful UI details make the app stand out:

Dark Mode Toggle: Implemented using Tailwind’s .dark class strategy, with theme preference saved for persistence.

Mobile-Friendly “View Details” Modal: On smaller screens, some data (like summary or date) gets hidden for space. The modal ensures mobile users can still access that information easily.

💻 Technical Architecture

The codebase follows a clean, modular structure that keeps logic and UI clearly separated.

📁 Folder Structure:

src/
 ├── pages/         # Main pages like HomePage.jsx (state orchestrator)
 ├── components/    # All UI components (ExpenseForm, ExpenseList, etc.)
 └── services/      # Data service layer (expense-service.js)

🧩 Core Implementation Details

Immutability: The service layer uses methods like Array.filter() to handle deletions safely, ensuring the original state remains untouched — a must for reliable React updates.

Theme Management: Dark mode is controlled globally via a useEffect in App.jsx, which toggles Tailwind’s .dark class at the document level.

This project was designed to show not just how to build a functional expense tracker, but how to do it cleanly, efficiently, and with a focus on user experience.
