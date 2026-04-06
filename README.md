# FinSight — Finance Dashboard

A clean, interactive finance dashboard built with **React**, **Tailwind CSS**, **Recharts**, and **Zustand**. Designed to help users track financial activity, explore transactions, and understand spending patterns at a glance.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## Features

### 1. Dashboard Overview
- **Summary cards** — Total Balance, Monthly Income, Monthly Expenses, and Savings Rate with month-over-month change indicators.
- **Balance Trend chart** — Area chart showing cumulative balance and income over time.
- **Spending Breakdown** — Donut chart visualizing expense distribution by category.
- **Recent Transactions** — Quick list of the 5 most recent transactions.

### 2. Transactions
- Paginated, sortable transaction table with **desktop table** and **mobile card** layouts.
- **Search** by description or category.
- **Filter** by category and transaction type (income / expense).
- **Sort** by date, amount, or category.
- Admin users can **add**, **edit**, and **delete** transactions via a modal form with validation.

### 3. Role-Based UI (RBAC)
- Toggle between **Viewer** and **Admin** roles using the header switcher.
- **Viewer** — read-only access; add/edit/delete controls are hidden.
- **Admin** — full CRUD access to transactions.
- Role selection persists across page refreshes via localStorage.

### 4. Insights
- **Metric cards** — Top spending category, average expense, month-over-month trend, income/expense ratio.
- **Monthly comparison bar chart** — Income vs. Expenses side by side for each month.
- **Category ranking** — Horizontal progress bars showing spending per category.
- **Key observations** — Contextual insights like largest single expense, most frequent category, and total earnings.

### 5. State Management
- **Zustand** store with `persist` middleware for localStorage-backed state.
- Manages transactions, filters, active page, user role, and sidebar state.
- Computed selectors for filtered/sorted transaction lists.

### 6. UI / UX
- **Responsive design** — fully functional on mobile, tablet, and desktop.
- **Dark mode** — system-preference aware with manual toggle; persisted in localStorage.
- **Animations** — subtle fade-in and slide-up transitions for cards and page content.
- **Empty states** — graceful handling when no data matches current filters.
- **Custom scrollbar** and clean typography via Inter font.

### 7. Optional Enhancements (Implemented)
| Feature | Status |
|---|---|
| Dark mode | ✅ |
| Data persistence (localStorage) | ✅ |
| Export to CSV | ✅ |
| Export to JSON | ✅ |
| Animations & transitions | ✅ |
| Mobile-responsive design | ✅ |

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 | Component model, hooks, ecosystem |
| Build Tool | Vite 6 | Fast HMR, modern ESM-first bundler |
| Styling | Tailwind CSS 3.4 | Utility-first, responsive, dark mode |
| Charts | Recharts 2 | Declarative, React-native chart library |
| State | Zustand 5 | Minimal boilerplate, built-in persist |
| Icons | Lucide React | Lightweight, tree-shakeable icon set |
| Dates | date-fns 4 | Modular, immutable date utilities |

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/        # Summary cards, charts, dashboard page
│   ├── insights/         # Metrics, observations, monthly chart
│   ├── layout/           # Sidebar, Header, Layout shell
│   ├── transactions/     # Table, filters, modal, transactions page
│   └── ui/               # Reusable UI primitives (EmptyState)
├── context/
│   └── ThemeContext.jsx   # Dark mode context + provider
├── data/
│   └── mockData.js       # 75 realistic transactions (6 months)
├── store/
│   └── useStore.js       # Zustand store with persist middleware
├── utils/
│   ├── export.js          # CSV / JSON export utilities
│   └── formatters.js      # Currency, date, percent formatters
├── App.jsx                # Page routing via store state
├── index.css              # Tailwind directives + custom styles
└── main.jsx               # React root + ThemeProvider
```

---

## Design Decisions

1. **State-based routing** instead of react-router — keeps the project simpler for a single-page dashboard without URL requirements.
2. **Zustand over Context for global state** — avoids prop drilling and unnecessary re-renders while keeping the API minimal.
3. **Mobile-first responsive** — sidebar collapses to a slide-out drawer on smaller screens; transaction table switches to card layout.
4. **Persist middleware** — transactions, role, and page state survive browser refreshes without backend.
5. **Tailwind `@layer components`** — reusable `.card`, `.btn-*`, `.input`, and `.select` classes to reduce repetition while keeping styles co-located.

---

## Assumptions

- Mock data covers October 2025 through March 2026 with realistic salary, freelance, and expense transactions.
- Currency is USD; locale is `en-US`.
- "Current month" for summary cards is based on `new Date()` — the March 2026 data will show as current if viewed in that month; otherwise, cards will show `$0` for months without data (empty state handled gracefully).
- RBAC is simulated entirely on the frontend with no authentication or backend enforcement.

---

## License

MIT
