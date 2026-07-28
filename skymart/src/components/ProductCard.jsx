

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-sky-navy-light rounded-2xl overflow-hidden fade-up flex flex-col">
     
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-sky-blue text-sky-navy text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </span>
        )}
      </div>

     
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-sky-blue font-semibold mb-1">
          {product.category}
        </p>
        <h3 className="text-white font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-3">⭐ {product.rating}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-white font-bold">₹{product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-sky-blue hover:bg-sky-blue-dark text-sky-navy text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
