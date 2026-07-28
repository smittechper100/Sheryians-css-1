# SkyMart 🛒✈️

A beginner-friendly clone of the SkyMart shopping app, built with:

- **React** (Vite) – UI components
- **Tailwind CSS** – styling
- **localStorage** – accounts, login session, and shopping cart (no backend/server needed)

---

## 1. Install and run

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## 2. How to use the app

1. On first visit you'll see the **Sign Up** page. Create an account (name, email, password).
2. You'll be sent to the **Log In** page — log in with the same email/password.
3. Once logged in you get the full app with 3 sections in the navbar:
   - **Home** – hero banner, highlights, shop-by-category, new arrivals, shipment info
   - **Products** – search bar, category filters, all products with **Add to Cart**, and a live cart summary on the right
   - **About** – information about SkyMart's services
4. Click **Logout** in the navbar to end your session (your account and cart are still saved for next time).

## 3. Folder structure

```
skymart/
├── index.html
├── tailwind.config.js       # Tailwind setup + custom navy/sky-blue colors
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx                # Auth gate + page routing + cart state (the "brain")
    ├── index.css              # Tailwind imports + small reusable classes
    │
    ├── pages/                 # One file per full page/screen
    │   ├── Login.jsx
    │   ├── Signup.jsx
    │   ├── Home.jsx
    │   ├── Products.jsx
    │   └── About.jsx
    │
    ├── components/            # Small reusable UI pieces used inside pages
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── Highlights.jsx
    │   ├── CategoryCard.jsx
    │   ├── ProductCard.jsx
    │   ├── SearchBar.jsx
    │   └── ShipmentInfo.jsx
    │
    ├── data/
    │   └── products.js        # Sample product + category data
    │
    └── utils/
        └── storage.js         # Every localStorage read/write lives here
```

## 4. How the data flows (for learning)

- **`utils/storage.js`** is the only file that touches `localStorage` directly.
  Every other file calls its functions (`registerUser`, `loginUser`, `addToCart`, etc.)
  instead of using `localStorage.getItem/setItem` itself. This keeps things organized.
- **`App.jsx`** holds the "top level" state: who is logged in, which page is
  active, and the cart contents. It passes this state down to pages as **props**.
- Pages pass things further down to components as props too (e.g. `Products.jsx`
  gives each `ProductCard` an `onAddToCart` function to call).

This one-way flow (state lives at the top, data flows down through props,
events flow up through function calls) is the core pattern used in most React apps.

## 5. Notes

- Passwords are stored in plain text in localStorage for **learning purposes only** —
  never do this in a real production app (use a real backend + hashed passwords).
- All data lives in your browser's localStorage. Clearing your browser data / using
  a different browser will reset accounts and carts.
