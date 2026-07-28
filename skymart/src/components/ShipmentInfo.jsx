

function ShipmentInfo() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="bg-gradient-to-r from-sky-blue/20 to-sky-navy-light rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="text-6xl">✈️</div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">
            Fast & Reliable Shipment
          </h2>
          <p className="text-gray-300 mb-4 max-w-2xl">
            Every SkyMart order is packed with care and tracked door-to-door.
            Choose standard delivery (3-5 days) or express delivery
            (1-2 days) at checkout - we keep you updated at every step.
          </p>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>✅ Free shipping on orders above ₹999</li>
            <li>✅ Real-time order tracking</li>
            <li>✅ Delivery across 500+ cities</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ShipmentInfo;
