

const highlights = [
  { icon: "🚚", title: "Free Shipping", text: "On orders above ₹999" },
  { icon: "🔒", title: "Secure Payments", text: "100% protected checkout" },
  { icon: "↩️", title: "Easy Returns", text: "7-day return policy" },
  { icon: "🎧", title: "24/7 Support", text: "We're here to help" },
];

function Highlights() {
  return (
    <section className="bg-sky-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="bg-sky-navy-light rounded-2xl p-5 text-center fade-up"
          >
            <div className="text-3xl mb-2">{h.icon}</div>
            <p className="text-white font-semibold text-sm">{h.title}</p>
            <p className="text-gray-400 text-xs mt-1">{h.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Highlights;
