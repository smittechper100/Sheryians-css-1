

import { useState } from "react";
import { loginUser } from "../utils/storage";

function Login({ onLoginSuccess, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const result = loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    onLoginSuccess(result.user);
  }

  return (
    <div className="min-h-screen bg-sky-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-sky-navy-light rounded-2xl p-8 fade-up">
      
        <div className="text-center mb-6">
          <p className="text-white font-extrabold text-2xl">
            <span className="text-sky-blue">✈</span> Sky
            <span className="text-sky-blue">Mart</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">Welcome back! Please log in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full bg-sky-navy text-white placeholder-gray-500
                         px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-blue"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full bg-sky-navy text-white placeholder-gray-500
                         px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-blue"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            Log In
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?{" "}
          <button
            onClick={goToSignup}
            className="text-sky-blue font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
