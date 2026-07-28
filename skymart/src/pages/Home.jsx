

import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import ShipmentInfo from "../components/ShipmentInfo";
import products, { categories } from "../data/products";

function Home({ setPage, onAddToCart }) {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      <Hero setPage={setPage} />
      <Highlights />

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              category={cat}
              onClick={() => setPage("products")}
            />
          ))}
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
          <button
            onClick={() => setPage("products")}
            className="text-sky-blue text-sm font-semibold hover:underline"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      <ShipmentInfo />
    </div>
  );
}

export default Home;
