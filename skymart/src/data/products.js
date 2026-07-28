/* ==============================================================
   products.js
   ------------------------------------------------------------
   Sample product data for SkyMart. In a real app this would come
   from a backend/database - here we keep it as a simple array so
   the whole project can run with zero backend setup.
   ============================================================== */

const products = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    category: "Men",
    price: 2499,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    isNew: true,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Flowy Summer Dress",
    category: "Women",
    price: 1899,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    isNew: true,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Kids Cartoon Hoodie",
    category: "Kids",
    price: 999,
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=500&q=80",
    isNew: false,
    rating: 4.3,
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    price: 3299,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    isNew: true,
    rating: 4.8,
  },
  {
    id: 5,
    name: "Slim Fit Chinos",
    category: "Men",
    price: 1599,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
    isNew: false,
    rating: 4.2,
  },
  {
    id: 6,
    name: "Aviator Sunglasses",
    category: "Accessories",
    price: 1299,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    isNew: false,
    rating: 4.6,
  },
  {
    id: 7,
    name: "Women's Trench Coat",
    category: "Women",
    price: 3999,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80",
    isNew: true,
    rating: 4.9,
  },
  {
    id: 8,
    name: "Kids Denim Overalls",
    category: "Kids",
    price: 1199,
    image: "https://images.unsplash.com/photo-1519457851430-e2f3e4f4d6f9?w=500&q=80",
    isNew: false,
    rating: 4.1,
  },
  {
    id: 9,
    name: "Running Sneakers",
    category: "Men",
    price: 2799,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    isNew: false,
    rating: 4.4,
  },
  {
    id: 10,
    name: "Silk Scarf",
    category: "Accessories",
    price: 799,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80",
    isNew: false,
    rating: 4.0,
  },
  {
    id: 11,
    name: "Women's Knit Sweater",
    category: "Women",
    price: 1699,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80",
    isNew: true,
    rating: 4.5,
  },
  {
    id: 12,
    name: "Kids Party Frock",
    category: "Kids",
    price: 1499,
    image: "https://images.unsplash.com/photo-1622290291165-d5c303c5e5e2?w=500&q=80",
    isNew: true,
    rating: 4.6,
  },
];

// The four main categories shown on the Home page
export const categories = [
  { name: "Men", icon: "👔", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80" },
  { name: "Women", icon: "👗", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" },
  { name: "Kids", icon: "🧸", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80" },
  { name: "Accessories", icon: "👜", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" },
];

export default products;
