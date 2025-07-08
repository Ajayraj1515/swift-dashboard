# 📊 React Comments Dashboard

A responsive and interactive React Dashboard that displays user profile data and comment records using the JSONPlaceholder API. This application includes advanced features like sorting, searching, pagination, and localStorage state persistence.

---

## 🧰 Tech Stack

- **React.js**
- **Bootstrap 5**
- **JavaScript (ES6+)**
- **React Router DOM**
- **Custom Hooks and Components**
- **localStorage for data persistence**
- **CSS & Responsive Layout**

---

## 📦 Features

### 🔹 Profile Header
- Displays the **first user** from the `https://jsonplaceholder.typicode.com/users`.
- Includes initials inside a circle and a button with the full name.
- On click, navigates to `/profile`.

### 🔹 Comments Dashboard
- Fetches data from `https://jsonplaceholder.typicode.com/comments`.
- Displays comments in a structured table.

### 🔹 Search Functionality
- Search by **name** or **email**.
- Input synced with localStorage to preserve search state.

### 🔹 Sorting
- Sort by:
  - **Post ID** (numeric)
  - **Name** (alphabetical)
  - **Email** (alphabetical)
- Sort direction toggles: Ascending 🔼, Descending 🔽
- Each sort option appears inside a visually styled box.

### 🔹 Pagination
- Custom pagination logic with:
  - Dynamic total page calculation.
  - Smooth scroll to top of table on page change.
  - Controlled page size (default: 10).

### 🔹 UI / UX
- Responsive layout (mobile, tablet, desktop)
- Consistent spacing and box styles
- Cards and input boxes with shadows and spacing
- Proper use of utility classes for margins, paddings, and responsiveness

---

## 📁 Folder Structure

src/
│
├── components/
│ ├── Header.jsx // Top navigation with logo and user profile
│ ├── Pagination.jsx // Reusable pagination component
│ ├── SearchBar.jsx // Search input
│ └── TableHeader.jsx // Sortable table headers
│
├── pages/
│ ├── Dashboard.jsx // Main dashboard page with all logic
│ └── Profile.jsx // (Optional) User profile page
│
├── services/
│ └── api.js // API service functions
│
├── utils/
│ └── localStorageUtils.js // Utility for saving/loading from localStorage
│
└── App.js

yaml
Copy code

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git https://github.com/Ajayraj1515/swift-dashboard.git
cd react-comments-dashboard
2. Install Dependencies
bash
Copy code
npm install
3. Start Development Server
bash
Copy code
npm start
App will run at http://localhost:3000