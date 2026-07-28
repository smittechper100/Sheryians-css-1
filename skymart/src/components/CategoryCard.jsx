
function CategoryCard({ category, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden h-40 group text-left"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sky-navy/90 to-transparent" />
      <div className="absolute bottom-3 left-4 text-white">
        <span className="text-2xl">{category.icon}</span>
        <p className="font-semibold">{category.name}</p>
      </div>
    </button>
  );
}

export default CategoryCard;
