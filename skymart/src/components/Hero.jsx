

function Hero({ setPage }) {
  return (
    <section className="bg-sky-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col md:flex-row items-center gap-10">
    
        <div className="flex-1 fade-up">
          <span className="inline-block bg-sky-blue/10 text-sky-blue text-xs font-semibold px-4 py-1 rounded-full mb-4">
            NEW SEASON COLLECTION
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Fashion That Fits Your{" "}
            <span className="text-sky-blue">Sky-High</span> Standards
          </h1>
          <p className="text-gray-300 mb-8 max-w-md">
            Discover premium clothing and accessories for the whole family,
            curated for comfort, style, and everyday confidence.
          </p>
          <div className="flex gap-4">
            <button className="btn-primary" onClick={() => setPage("products")}>
              Shop Now
            </button>
            <button className="btn-outline" onClick={() => setPage("about")}>
              Learn More
            </button>
          </div>
        </div>

  
        <div className="flex-1 fade-up">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
            alt="SkyMart fashion collection"
            className="rounded-3xl w-full h-80 object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
