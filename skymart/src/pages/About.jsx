

const services = [
  {
    icon: "🚚",
    title: "Free & Fast Shipping",
    text: "Enjoy free shipping on all orders above ₹999, with delivery across 500+ cities in 3-5 business days.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    text: "All transactions are encrypted end-to-end so your card and account details always stay safe.",
  },
  {
    icon: "↩️",
    title: "Easy 7-Day Returns",
    text: "Not happy with your order? Return it within 7 days for a full refund, no questions asked.",
  },
  {
    icon: "🎧",
    title: "24/7 Customer Support",
    text: "Our support team is available around the clock through chat, email, and phone to help you out.",
  },
  {
    icon: "🏷️",
    title: "Best Price Guarantee",
    text: "We work directly with brands to bring you quality fashion at honest, everyday-low prices.",
  },
  {
    icon: "🌱",
    title: "Sustainable Sourcing",
    text: "A growing part of our catalogue comes from eco-conscious brands using responsibly sourced materials.",
  },
];

function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

      <div className="text-center mb-14 fade-up">
        <h1 className="text-3xl font-bold text-white mb-4">About SkyMart</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          SkyMart is an online fashion store on a mission to make quality
          clothing accessible to everyone. From everyday essentials to
          statement pieces, we curate collections for men, women, and kids -
          all delivered right to your doorstep.
        </p>
      </div>


      <h2 className="text-xl font-bold text-white mb-6">Our Services</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-sky-navy-light rounded-2xl p-6 fade-up"
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <h3 className="text-white font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm">{s.text}</p>
          </div>
        ))}
      </div>

   
      <div className="mt-16 bg-gradient-to-r from-sky-blue/20 to-sky-navy-light rounded-3xl p-8 text-center">
        <h3 className="text-white font-bold text-xl mb-2">Need Help?</h3>
        <p className="text-gray-300 mb-4">
          Reach out anytime - we usually reply within a few hours.
        </p>
        <p className="text-sky-blue font-semibold">support@skymart.com</p>
      </div>
    </div>
  );
}

export default About;
