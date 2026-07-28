

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import {
  getCurrentUser,
  logoutUser,
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} from "./utils/storage";

function App() {
  // "authView" controls which screen we show BEFORE login: login or signup
  const [authView, setAuthView] = useState("login");

  // The logged-in user's info, or null if nobody is logged in yet.
  // We check localStorage once when the app first loads, so a user
  // who refreshes the page stays logged in.
  const [user, setUser] = useState(() => getCurrentUser());

  // Which main page is visible: "home" | "products" | "about"
  const [page, setPage] = useState("home");

  // The logged-in user's shopping cart
  const [cart, setCart] = useState([]);

  // Whenever the logged-in user changes, load THEIR cart from localStorage
  useEffect(() => {
    if (user) {
      setCart(getCart(user.email));
    }
  }, [user]);

  /* ---------------- Auth handlers ---------------- */

  function handleLoginSuccess(loggedInUser) {
    setUser(loggedInUser);
    setPage("home");
  }

  function handleSignupSuccess() {
    // After signing up, send them to the Login page to log in
    setAuthView("login");
  }

  function handleLogout() {
    logoutUser();
    setUser(null);
    setCart([]);
  }

  /* ---------------- Cart handlers ---------------- */
  /* Each of these updates localStorage AND the on-screen state,
     so the UI reacts immediately. */

  function handleAddToCart(product) {
    const updatedCart = addToCart(user.email, product);
    setCart(updatedCart);
  }

  function handleRemoveFromCart(productId) {
    const updatedCart = removeFromCart(user.email, productId);
    setCart(updatedCart);
  }

  function handleUpdateQuantity(productId, quantity) {
    const updatedCart = updateQuantity(user.email, productId, quantity);
    setCart([...updatedCart]);
  }

  /* ---------------- Render ---------------- */

  // 1) Not logged in yet -> show Login or Signup
  if (!user) {
    return authView === "login" ? (
      <Login
        onLoginSuccess={handleLoginSuccess}
        goToSignup={() => setAuthView("signup")}
      />
    ) : (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        goToLogin={() => setAuthView("login")}
      />
    );
  }

  // 2) Logged in -> show the main app with Navbar + current page + Footer
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-sky-navy flex flex-col">
      <Navbar
        currentPage={page}
        setPage={setPage}
        cartCount={totalCartItems}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {page === "home" && (
          <Home setPage={setPage} onAddToCart={handleAddToCart} />
        )}
        {page === "products" && (
          <Products
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
        {page === "about" && <About />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
