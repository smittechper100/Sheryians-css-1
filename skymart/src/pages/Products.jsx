
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const CATEGORY_FILTERS = ["All", "Men", "Women", "Kids", "Accessories"];

function Products({ cart, onAddToCart, onRemoveFromCart, onUpdateQuantity }) {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_320px] gap-10">

      <div>
        <h1 className="text-2xl font-bold text-white mb-6">All Products</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <SearchBar value={searchText} onChange={setSearchText} />

          <div className="flex gap-2 flex-wrap">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-sky-blue text-sky-navy"
                    : "bg-sky-navy-light text-gray-300 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-400">No products match your search.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>

   
      <aside className="bg-sky-navy-light rounded-2xl p-5 h-fit sticky top-24">
        <h2 className="text-white font-bold text-lg mb-4">
          Your Cart ({cart.length})
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-sm">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-gray-400 text-xs">₹{item.price}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-6 h-6 rounded bg-sky-navy text-white text-xs"
                    >
                      -
                    </button>
                    <span className="text-white text-xs">{item.quantity}</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-6 h-6 rounded bg-sky-navy text-white text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-red-400 text-xs hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="text-gray-300 text-sm">Total</span>
              <span className="text-white font-bold">₹{cartTotal}</span>
            </div>

            <button className="btn-primary w-full">Checkout</button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default Products;
