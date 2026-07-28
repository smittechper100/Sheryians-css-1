

function Navbar({ currentPage, setPage, cartCount, onLogout }) {

  const links = [
    { key: "home", label: "Home" },
    { key: "products", label: "Products" },
    { key: "about", label: "About" },
  ];

  return (
    <nav className="bg-sky-navy sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
       
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 text-white font-extrabold text-xl"
        >
          <span className="text-sky-blue text-2xl">✈</span>
          Sky<span className="text-sky-blue">Mart</span>
        </button>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.key}
              onClick={() => setPage(link.key)}
              className={`text-sm font-medium transition-colors ${
                currentPage === link.key
                  ? "text-sky-blue"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Cart + Logout */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage("products")}
            className="relative text-gray-200 hover:text-sky-blue"
            title="View cart in Products page"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-sky-blue text-sky-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={onLogout}
            className="text-sm text-gray-300 hover:text-sky-blue font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile nav links (shown below the logo bar on small screens) */}
      <div className="sm:hidden flex justify-center gap-6 pb-3">
        {links.map((link) => (
          <button
            key={link.key}
            onClick={() => setPage(link.key)}
            className={`text-sm font-medium ${
              currentPage === link.key ? "text-sky-blue" : "text-gray-300"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
