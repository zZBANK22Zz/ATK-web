import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const recaptchaRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    console.log("Login Submitted:", {
      email,
      password,
      recaptchaToken,
    });

    // Optional: Reset reCAPTCHA
    recaptchaRef.current.reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block mb-2 text-sm font-semibold">Email</label>
        <input
          type="email"
          required
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-sm font-semibold">Password</label>
        <input
          type="password"
          required
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mb-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LfoUwArAAAAAA7Ob7o8Xx83J6m0Ly7zi3xJVpag"
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Log in
        </button>
        <div className="flex gap-2">
          <p>If you doesn't have any account click:</p>
          <a href="./RegisterPage" className="underline text-blue-700">register</a>
        </div>
      </form>
    </div>
  );
}
