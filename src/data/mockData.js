export const CATEGORIES = {
  expense: [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
  ],
  income: ['Salary', 'Freelance', 'Investment', 'Refund'],
};

export const ALL_CATEGORIES = [...CATEGORIES.expense, ...CATEGORIES.income];

export const CATEGORY_COLORS = {
  'Food & Dining': '#f97316',
  Shopping: '#8b5cf6',
  Transportation: '#06b6d4',
  Entertainment: '#ec4899',
  'Bills & Utilities': '#64748b',
  Healthcare: '#ef4444',
  Education: '#3b82f6',
  Travel: '#14b8a6',
  Salary: '#10b981',
  Freelance: '#22c55e',
  Investment: '#a3e635',
  Refund: '#6ee7b7',
};

const transactions = [
  // ─── October 2025 ───
  { id: '1', date: '2025-10-01', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '2', date: '2025-10-03', description: 'Grocery Store', amount: 89.5, type: 'expense', category: 'Food & Dining' },
  { id: '3', date: '2025-10-05', description: 'Electric Bill', amount: 124.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '4', date: '2025-10-07', description: 'Gas Station', amount: 45.0, type: 'expense', category: 'Transportation' },
  { id: '5', date: '2025-10-09', description: 'Netflix Subscription', amount: 15.99, type: 'expense', category: 'Entertainment' },
  { id: '6', date: '2025-10-11', description: 'Restaurant Dinner', amount: 67.8, type: 'expense', category: 'Food & Dining' },
  { id: '7', date: '2025-10-14', description: 'Online Course — React', amount: 49.99, type: 'expense', category: 'Education' },
  { id: '8', date: '2025-10-16', description: 'Freelance Project', amount: 850.0, type: 'income', category: 'Freelance' },
  { id: '9', date: '2025-10-18', description: 'New Running Shoes', amount: 129.99, type: 'expense', category: 'Shopping' },
  { id: '10', date: '2025-10-22', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'Bills & Utilities' },
  { id: '11', date: '2025-10-25', description: 'Doctor Visit Co-pay', amount: 30.0, type: 'expense', category: 'Healthcare' },
  { id: '12', date: '2025-10-28', description: 'Coffee Shop', amount: 18.5, type: 'expense', category: 'Food & Dining' },

  // ─── November 2025 ───
  { id: '13', date: '2025-11-01', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '14', date: '2025-11-02', description: 'Gym Membership', amount: 40.0, type: 'expense', category: 'Healthcare' },
  { id: '15', date: '2025-11-04', description: 'Grocery Store', amount: 112.3, type: 'expense', category: 'Food & Dining' },
  { id: '16', date: '2025-11-06', description: 'Uber Ride', amount: 22.5, type: 'expense', category: 'Transportation' },
  { id: '17', date: '2025-11-08', description: 'Movie Tickets', amount: 28.0, type: 'expense', category: 'Entertainment' },
  { id: '18', date: '2025-11-10', description: 'Phone Bill', amount: 85.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '19', date: '2025-11-12', description: 'Winter Jacket', amount: 189.99, type: 'expense', category: 'Shopping' },
  { id: '20', date: '2025-11-15', description: 'Freelance Design Work', amount: 1200.0, type: 'income', category: 'Freelance' },
  { id: '21', date: '2025-11-18', description: 'Thanksgiving Groceries', amount: 156.75, type: 'expense', category: 'Food & Dining' },
  { id: '22', date: '2025-11-20', description: 'Electric Bill', amount: 138.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '23', date: '2025-11-22', description: 'Book — System Design', amount: 34.99, type: 'expense', category: 'Education' },
  { id: '24', date: '2025-11-25', description: 'Gas Station', amount: 52.0, type: 'expense', category: 'Transportation' },
  { id: '25', date: '2025-11-28', description: 'Dividend Payment', amount: 125.0, type: 'income', category: 'Investment' },

  // ─── December 2025 ───
  { id: '26', date: '2025-12-01', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '27', date: '2025-12-03', description: 'Grocery Store', amount: 95.4, type: 'expense', category: 'Food & Dining' },
  { id: '28', date: '2025-12-05', description: 'Holiday Gifts', amount: 345.0, type: 'expense', category: 'Shopping' },
  { id: '29', date: '2025-12-07', description: 'Concert Tickets', amount: 120.0, type: 'expense', category: 'Entertainment' },
  { id: '30', date: '2025-12-09', description: 'Car Insurance', amount: 165.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '31', date: '2025-12-11', description: 'Restaurant — Holiday Party', amount: 88.5, type: 'expense', category: 'Food & Dining' },
  { id: '32', date: '2025-12-13', description: 'Freelance Consulting', amount: 950.0, type: 'income', category: 'Freelance' },
  { id: '33', date: '2025-12-15', description: 'Electric Bill', amount: 155.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '34', date: '2025-12-18', description: 'Flight — Holiday Trip', amount: 320.0, type: 'expense', category: 'Travel' },
  { id: '35', date: '2025-12-20', description: 'Hotel Booking', amount: 280.0, type: 'expense', category: 'Travel' },
  { id: '36', date: '2025-12-22', description: 'Pharmacy', amount: 42.5, type: 'expense', category: 'Healthcare' },
  { id: '37', date: '2025-12-26', description: 'Year-End Bonus', amount: 2000.0, type: 'income', category: 'Salary' },
  { id: '38', date: '2025-12-28', description: 'New Year Supplies', amount: 76.0, type: 'expense', category: 'Shopping' },

  // ─── January 2026 ───
  { id: '39', date: '2026-01-01', description: 'Monthly Salary', amount: 5400, type: 'income', category: 'Salary' },
  { id: '40', date: '2026-01-03', description: 'Grocery Store', amount: 102.8, type: 'expense', category: 'Food & Dining' },
  { id: '41', date: '2026-01-05', description: 'Gym Membership', amount: 40.0, type: 'expense', category: 'Healthcare' },
  { id: '42', date: '2026-01-07', description: 'Uber Rides', amount: 35.0, type: 'expense', category: 'Transportation' },
  { id: '43', date: '2026-01-09', description: 'Streaming Services', amount: 32.98, type: 'expense', category: 'Entertainment' },
  { id: '44', date: '2026-01-11', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'Bills & Utilities' },
  { id: '45', date: '2026-01-14', description: 'Electric Bill', amount: 142.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '46', date: '2026-01-16', description: 'Online Workshop', amount: 79.0, type: 'expense', category: 'Education' },
  { id: '47', date: '2026-01-18', description: 'Freelance App Dev', amount: 1500.0, type: 'income', category: 'Freelance' },
  { id: '48', date: '2026-01-20', description: 'Winter Clothing Sale', amount: 95.0, type: 'expense', category: 'Shopping' },
  { id: '49', date: '2026-01-23', description: 'Restaurant', amount: 54.0, type: 'expense', category: 'Food & Dining' },
  { id: '50', date: '2026-01-27', description: 'Amazon Refund', amount: 45.99, type: 'income', category: 'Refund' },

  // ─── February 2026 ───
  { id: '51', date: '2026-02-01', description: 'Monthly Salary', amount: 5400, type: 'income', category: 'Salary' },
  { id: '52', date: '2026-02-03', description: 'Grocery Store', amount: 88.6, type: 'expense', category: 'Food & Dining' },
  { id: '53', date: '2026-02-05', description: 'Valentine Dinner', amount: 125.0, type: 'expense', category: 'Food & Dining' },
  { id: '54', date: '2026-02-07', description: 'Gas Station', amount: 48.0, type: 'expense', category: 'Transportation' },
  { id: '55', date: '2026-02-09', description: 'Phone Bill', amount: 85.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '56', date: '2026-02-11', description: 'Electric Bill', amount: 131.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '57', date: '2026-02-13', description: 'Gift — Valentine', amount: 75.0, type: 'expense', category: 'Shopping' },
  { id: '58', date: '2026-02-15', description: 'Freelance Writing', amount: 600.0, type: 'income', category: 'Freelance' },
  { id: '59', date: '2026-02-18', description: 'Dentist Visit', amount: 90.0, type: 'expense', category: 'Healthcare' },
  { id: '60', date: '2026-02-20', description: 'Movie Night', amount: 24.0, type: 'expense', category: 'Entertainment' },
  { id: '61', date: '2026-02-23', description: 'Dividend Payment', amount: 150.0, type: 'income', category: 'Investment' },
  { id: '62', date: '2026-02-26', description: 'Taxi Ride', amount: 18.0, type: 'expense', category: 'Transportation' },

  // ─── March 2026 ───
  { id: '63', date: '2026-03-01', description: 'Monthly Salary', amount: 5400, type: 'income', category: 'Salary' },
  { id: '64', date: '2026-03-03', description: 'Grocery Store', amount: 97.2, type: 'expense', category: 'Food & Dining' },
  { id: '65', date: '2026-03-05', description: 'Car Maintenance', amount: 210.0, type: 'expense', category: 'Transportation' },
  { id: '66', date: '2026-03-07', description: 'Spotify Subscription', amount: 11.99, type: 'expense', category: 'Entertainment' },
  { id: '67', date: '2026-03-09', description: 'Electric Bill', amount: 118.0, type: 'expense', category: 'Bills & Utilities' },
  { id: '68', date: '2026-03-11', description: 'Weekend Getaway Hotel', amount: 195.0, type: 'expense', category: 'Travel' },
  { id: '69', date: '2026-03-13', description: 'Restaurant — Birthday', amount: 145.0, type: 'expense', category: 'Food & Dining' },
  { id: '70', date: '2026-03-15', description: 'Freelance Project', amount: 1100.0, type: 'income', category: 'Freelance' },
  { id: '71', date: '2026-03-18', description: 'New Headphones', amount: 159.99, type: 'expense', category: 'Shopping' },
  { id: '72', date: '2026-03-20', description: 'Online Course — Python', amount: 59.99, type: 'expense', category: 'Education' },
  { id: '73', date: '2026-03-23', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'Bills & Utilities' },
  { id: '74', date: '2026-03-25', description: 'Gym Membership', amount: 40.0, type: 'expense', category: 'Healthcare' },
  { id: '75', date: '2026-03-28', description: 'Coffee & Snacks', amount: 22.5, type: 'expense', category: 'Food & Dining' },
];

export default transactions;
