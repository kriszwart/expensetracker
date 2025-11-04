# 💸 Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. Track your personal finances, analyze spending patterns, and manage your budget with an intuitive, responsive interface.

## ✨ Features

### Core Functionality
- **Add Expenses**: Record expenses with date, amount, category, and description
- **Edit & Delete**: Modify or remove existing expenses with confirmation dialogs
- **Smart Filtering**: Filter expenses by category, date range, and search query
- **Data Persistence**: All data is stored locally in your browser using localStorage

### Analytics & Insights
- **Dashboard Overview**: View total spending, monthly expenses, and transaction counts
- **Category Breakdown**: Visual breakdown of spending by category with percentages
- **Top Category Tracking**: Identify where you spend the most
- **Monthly Trends**: Visualize spending patterns over the last 6 months
- **Recent Expenses**: Quick view of your latest transactions

### Categories
- 🍔 Food
- 🚗 Transportation
- 🎬 Entertainment
- 🛍️ Shopping
- 📄 Bills
- 📦 Other

### Additional Features
- **CSV Export**: Download your expense data for external analysis
- **Form Validation**: Smart validation ensures data integrity
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with smooth transitions
- **Loading States**: Visual feedback during data operations
- **Error Handling**: Graceful error handling throughout the app

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expensetracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📱 Usage Guide

### Adding an Expense

1. Click on **"Add Expense"** in the navigation bar
2. Fill in the expense details:
   - **Date**: Select the date of the expense (defaults to today)
   - **Amount**: Enter the amount in USD (e.g., 25.50)
   - **Category**: Choose from the available categories
   - **Description**: Provide a brief description (minimum 3 characters)
3. Click **"Add Expense"** to save

The form validates all inputs and provides clear error messages if any field is invalid.

### Viewing Expenses

1. Navigate to **"Expenses"** from the navigation bar
2. Use the filters to narrow down expenses:
   - **Search**: Search by description, category, or amount
   - **Category**: Filter by specific category or view all
   - **Date Range**: Set start and end dates
   - **Quick Filters**: Use "All Time" or "This Month" buttons
3. View the total amount for filtered expenses
4. Export filtered results to CSV using the **"Export CSV"** button

### Editing an Expense

1. Go to the **"Expenses"** page
2. Click the ✏️ (edit) icon on any expense
3. Modify the details in the modal that appears
4. Click **"Update Expense"** to save changes

### Deleting an Expense

1. Go to the **"Expenses"** page
2. Click the 🗑️ (delete) icon on any expense
3. Confirm the deletion in the dialog
4. The expense will be permanently removed

### Dashboard Analytics

The dashboard provides an at-a-glance view of your finances:

- **Summary Cards**: Key metrics like total spending, monthly spending, total transactions, and top category
- **Category Breakdown**: Visual bars showing spending distribution across categories
- **Recent Expenses**: Latest 5 transactions for quick reference
- **Monthly Trend**: Bar chart showing spending patterns over recent months

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API + Custom Hooks
- **Data Storage**: localStorage (browser-based)
- **Icons**: Unicode Emojis
- **Build Tool**: Next.js built-in compiler

## 📂 Project Structure

```
expensetracker/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard page
│   ├── layout.tsx         # Root layout with providers
│   ├── globals.css        # Global styles
│   ├── add/               # Add expense page
│   └── expenses/          # Expenses list page
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation bar
│   ├── Container.tsx      # Layout container
│   ├── ExpenseProvider.tsx # Context provider
│   ├── ExpenseForm.tsx    # Expense form with validation
│   ├── ExpenseFilters.tsx # Filter controls
│   ├── ExpenseListItem.tsx # Single expense item
│   ├── SummaryCard.tsx    # Dashboard summary cards
│   ├── CategoryBreakdown.tsx # Category visualization
│   ├── RecentExpenses.tsx # Recent expenses list
│   └── SpendingChart.tsx  # Monthly trend chart
├── hooks/                 # Custom React hooks
│   └── useExpenses.ts     # Expense management hook
├── types/                 # TypeScript type definitions
│   └── index.ts           # All type definitions
├── utils/                 # Utility functions
│   ├── localStorage.ts    # localStorage operations
│   ├── formatters.ts      # Date and currency formatters
│   ├── expenseCalculations.ts # Analytics calculations
│   └── categoryHelpers.ts # Category utilities
└── README.md             # This file
```

## 🎨 Design Philosophy

The application follows modern design principles:

- **Simplicity**: Clean, uncluttered interface focusing on essential features
- **Consistency**: Uniform styling and interaction patterns throughout
- **Accessibility**: Semantic HTML and keyboard-friendly navigation
- **Responsiveness**: Adapts beautifully to all screen sizes
- **Feedback**: Visual confirmation for all user actions
- **Performance**: Optimized for fast load times and smooth interactions

## 🔒 Data Privacy

All expense data is stored locally in your browser's localStorage. No data is sent to any external servers. Your financial information stays completely private and under your control.

To clear all data:
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Find localStorage
4. Delete the `expense_tracker_data` key

## 🧪 Testing Features

To test all features, try this workflow:

1. **Add Sample Expenses**:
   - Add 5-10 expenses with different categories and dates
   - Try different amounts and descriptions
   - Validate that form validation works (try invalid inputs)

2. **Test Dashboard**:
   - Verify summary cards show correct totals
   - Check category breakdown displays properly
   - Confirm recent expenses appear in the list
   - Ensure monthly trend chart renders

3. **Test Filtering**:
   - Search for specific expenses
   - Filter by different categories
   - Set date ranges
   - Try the quick filter buttons

4. **Test Edit/Delete**:
   - Edit an expense and verify changes persist
   - Delete an expense with confirmation
   - Verify data updates across all pages

5. **Test Export**:
   - Export expenses to CSV
   - Open the CSV file to verify data format

6. **Test Responsiveness**:
   - Resize browser window to test different breakpoints
   - Test on mobile device or using device emulation

## 🚧 Future Enhancements

Potential features for future versions:

- Multiple user accounts with authentication
- Cloud storage and sync across devices
- Budget setting and tracking
- Recurring expenses
- Receipt photo uploads
- Advanced charts (pie charts, line graphs)
- Expense categories customization
- Multi-currency support
- Data import from CSV/Excel
- Dark mode
- Expense sharing and splitting
- Payment method tracking
- Tags and custom fields

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
