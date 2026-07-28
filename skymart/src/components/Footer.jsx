

function Footer() {
  return (
    <footer className="bg-sky-navy border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center">
        <p className="text-white font-bold text-lg mb-2">
          <span className="text-sky-blue">✈</span> SkyMart
        </p>
        <p className="text-gray-400 text-sm">
          Fashion that fits your sky-high standards.
        </p>
        <p className="text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} SkyMart. Built as a learning project.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
