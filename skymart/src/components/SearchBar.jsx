/* ==============================================================
   SearchBar.jsx
   ------------------------------------------------------------
   A simple text input used to search/filter products by name.
   Props:
   - value    : the current search text (comes from parent state)
   - onChange : function called with the new text as the user types
   ============================================================== */

function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-md">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full bg-sky-navy-light text-white placeholder-gray-400
                   pl-11 pr-4 py-3 rounded-full outline-none
                   focus:ring-2 focus:ring-sky-blue"
      />
    </div>
  );
}

export default SearchBar;
