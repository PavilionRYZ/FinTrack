<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=10d98a&height=200&section=header&text=Finance%20Dashboard&fontSize=50&fontColor=ffffff&fontAlignY=38&desc=Track%20%E2%80%A2%20Analyze%20%E2%80%A2%20Grow&descAlignY=58&descSize=18&animation=fadeIn" width="100%" />

<!-- Badges -->
<p>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-4.2-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/badge/Zustand-State_Management-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Recharts-Visualizations-10d98a?style=flat-square" />
  <img src="https://img.shields.io/badge/Framer_Motion-Animations-EF4444?style=flat-square" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-Components-black?style=flat-square" />
</p>

<br/>

> **A modern, feature-rich personal finance dashboard.**  
> Track income, expenses, and savings with beautiful visualizations and insightful analytics.

<br/>

<a href="#-features"><img src="https://img.shields.io/badge/Features-→-10d98a?style=flat-square" /></a>
&nbsp;
<a href="#-tech-stack"><img src="https://img.shields.io/badge/Tech_Stack-→-3b82f6?style=flat-square" /></a>
&nbsp;
<a href="#-getting-started"><img src="https://img.shields.io/badge/Getting_Started-→-f59e0b?style=flat-square" /></a>
&nbsp;
<a href="#-project-structure"><img src="https://img.shields.io/badge/Project_Structure-→-8b5cf6?style=flat-square" /></a>

</div>

---

## ✨ Features

<details>
<summary><b>📊 Dashboard Overview</b></summary>
<br/>

| Feature | Description |
|---|---|
| **Summary Cards** | View total balance, monthly income, expenses, and savings rate at a glance |
| **Balance Trend Chart** | Interactive line chart showing your balance over time |
| **Spending Breakdown** | Pie chart visualization of expenses by category |
| **Monthly Comparison** | Bar chart comparing income vs expenses month over month |

</details>

<details>
<summary><b>💳 Transaction Management</b></summary>
<br/>

| Feature | Description |
|---|---|
| **Full CRUD Operations** | Add, edit, and delete transactions *(admin only)* |
| **Advanced Filtering** | Filter by category, type (income/expense), and date range |
| **Smart Search** | Search transactions by description |
| **Sorting** | Sort by date, amount, or category |
| **Pagination** | Navigate through large transaction lists efficiently |

</details>

<details>
<summary><b>💡 Financial Insights</b></summary>
<br/>

| Feature | Description |
|---|---|
| **Top Spending Category** | Identify where your money goes |
| **Expense Trends** | Track month-over-month spending changes |
| **Savings Analysis** | Monitor your savings rate progress |
| **Activity Metrics** | View transaction frequency and patterns |

</details>

<details>
<summary><b>🎨 User Experience</b></summary>
<br/>

| Feature | Description |
|---|---|
| **Role-Based Access** | Toggle between Admin and Viewer roles |
| **Dark Mode** | Full dark/light theme with system preference detection |
| **Data Export** | Export transactions to CSV or JSON format |
| **Responsive Design** | Optimized for desktop, tablet, and mobile |
| **Smooth Animations** | Polished UI with Framer Motion transitions |
| **Persistent State** | Your data persists across browser sessions |

</details>

---

## 🛠 Tech Stack

<div align="center">

| Category | Technology |
|---|---|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js_16-000?logo=next.js&logoColor=white&style=flat-square) App Router |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript_5.7-3178C6?logo=typescript&logoColor=white&style=flat-square) |
| **UI Library** | ![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black&style=flat-square) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?logo=tailwind-css&logoColor=white&style=flat-square) + shadcn/ui |
| **State Management** | ![Zustand](https://img.shields.io/badge/Zustand-orange?style=flat-square) with persist middleware |
| **Charts** | ![Recharts](https://img.shields.io/badge/Recharts-10d98a?style=flat-square) |
| **Animations** | ![Framer](https://img.shields.io/badge/Framer_Motion-EF4444?logo=framer&logoColor=white&style=flat-square) |
| **Icons** | ![Lucide](https://img.shields.io/badge/Lucide_React-gray?style=flat-square) + React Icons |
| **Forms** | ![RHF](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square) + Zod |
| **Theming** | ![next-themes](https://img.shields.io/badge/next--themes-black?style=flat-square) |

</div>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `18.17+`
- **npm**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/finance-dashboard.git
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
finance-dashboard/
├── app/
│   ├── globals.css              # Global styles & theme tokens
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Main dashboard page
│
├── components/
│   ├── dashboard/
│   │   ├── dashboard.jsx        # Main dashboard container
│   │   ├── summary-cards.jsx    # KPI cards component
│   │   ├── balance-chart.jsx    # Balance trend line chart
│   │   ├── spending-chart.jsx   # Spending breakdown pie chart
│   │   └── monthly-chart.jsx   # Income vs expenses bar chart
│   │
│   ├── transactions/
│   │   └── transaction-list.jsx # Transaction CRUD & filters
│   │
│   ├── insights/
│   │   └── insights-panel.jsx   # Financial insights section
│   │
│   ├── layout/
│   │   ├── header.jsx           # Top navigation & controls
│   │   └── sidebar.jsx          # Side navigation
│   │
│   ├── providers/
│   │   ├── theme-provider.jsx   # Dark mode provider
│   │   └── store-provider.jsx   # Zustand hydration provider
│   │
│   └── ui/                      # shadcn/ui components
│
├── lib/
│   ├── store.js                 # Zustand store & mock data
│   └── utils.ts                 # Utility functions
│
└── public/                      # Static assets
```

---

## 🔑 Key Features Explained

### State Management

The app uses **Zustand** with `localStorage` persistence — no boilerplate, no context hell.

```javascript
// Access store in any component
const balance      = useStore((state) => state.getTotalBalance());
const transactions = useStore((state) => state.transactions);
```

### Role-Based Access

Toggle between **Admin** and **Viewer** roles to see different UI capabilities:

| Feature | 🛡️ Admin | 👁️ Viewer |
|---|:---:|:---:|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| Add Transaction | ✅ | ❌ |
| Edit Transaction | ✅ | ❌ |
| Delete Transaction | ✅ | ❌ |
| Export Data | ✅ | ✅ |

### Dark Mode

Theme is automatically detected from system preferences and can be toggled manually via the header button.

```jsx
// Powered by next-themes — zero-flash SSR dark mode
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

---

## ⚙️ Customization

### Adding New Categories

Edit the `categories` array in `lib/store.js`:

```javascript
const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  // ✏️ Add your custom categories here
];
```

### Modifying Theme Colors

Update the CSS variables in `app/globals.css`:

```css
:root {
  --primary: 158 64% 52%;
  --accent:  158 64% 52%;
  /* 🎨 Customize colors here */
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repository, then clone your fork
git clone https://github.com/YOUR_USERNAME/finance-dashboard.git

# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m 'feat: add amazing feature'

# 4. Push and open a Pull Request
git push origin feature/amazing-feature
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=10d98a&height=120&section=footer&animation=fadeIn" width="100%" />

Built with ❤️ using **Next.js** · Deployed on **Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/finance-dashboard)

</div>