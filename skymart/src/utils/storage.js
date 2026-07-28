
const USERS_KEY = "skymart_users";
const CURRENT_USER_KEY = "skymart_current_user";

export function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}


export function registerUser(newUser) {
  const users = getUsers();


  const alreadyExists = users.some((u) => u.email === newUser.email);
  if (alreadyExists) {
    return { success: false, message: "An account with this email already exists." };
  }

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
}

// Check email + password against stored users (very simple auth,
// good enough for a learning project - NOT secure for production).
export function loginUser(email, password) {
  const users = getUsers();
  const found = users.find((u) => u.email === email && u.password === password);

  if (!found) {
    return { success: false, message: "Invalid email or password." };
  }

  // Remember who is logged in right now
  localStorage.setItem(CURRENT_USER_KEY, email);
  return { success: true, user: found };
}

// Log the current user out
export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Get the currently logged-in user's full details (or null)
export function getCurrentUser() {
  const email = localStorage.getItem(CURRENT_USER_KEY);
  if (!email) return null;

  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}

/* ----------------------- CART ----------------------- */

// Each logged-in user gets their own cart, saved under a key
// that includes their email, e.g. "skymart_cart_john@mail.com"
function cartKey(email) {
  return `skymart_cart_${email}`;
}

// Get the cart array for a given user email
export function getCart(email) {
  if (!email) return [];
  const data = localStorage.getItem(cartKey(email));
  return data ? JSON.parse(data) : [];
}

// Save the whole cart array for a given user email
export function saveCart(email, cartItems) {
  if (!email) return;
  localStorage.setItem(cartKey(email), JSON.stringify(cartItems));
}

// Add a product to the cart (or increase quantity if it's already there)
export function addToCart(email, product) {
  const cart = getCart(email);
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(email, cart);
  return cart;
}

// Remove a product completely from the cart
export function removeFromCart(email, productId) {
  const cart = getCart(email).filter((item) => item.id !== productId);
  saveCart(email, cart);
  return cart;
}

// Change the quantity of one product in the cart
export function updateQuantity(email, productId, quantity) {
  const cart = getCart(email);
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity); // never allow less than 1
  }
  saveCart(email, cart);
  return cart;
}
