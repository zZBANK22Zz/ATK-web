import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const recaptchaRef = useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [password, setpassword] = useState("");
  const recapchaSitekey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

  const r = useRouter();
  //=====================================================================
  //เป็นฟังก์ชั่นให้ user สมัคร เข้าใช้งานระบบ เช่นเดียวกับการ Login แต่ฟังก์ชั่นนี้จะเป็น การ create user account
  const handleRegister = async (e) => {
    e.preventDefault();
    //1. Check user comfirm recapcha or not.
    if (!recaptchaToken) {
      alert("Please complete the reCAPCHA");
      return;
    }

    const createUser = await fetch("http://localhost:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        recaptchaToken,
      }),
    });

    if (!createUser.ok) {
      const errorData = await createUser.json();
      alert(errorData.message || "Registration failed");
      return;
    }

    const response = await createUser.json();
    console.log("Registration successful:", response);
    if (!response.id) {
      console.error("Register response does not contain user id:", response);
      alert("Registration failed: userId not found.");
      return;
    }
    localStorage.setItem("userId", response.id.toString());
    // Optional: Reset reCAPTCHA after registration success
    recaptchaRef.current.reset();
    // Push to index page after registration success
    r.push("/test-submission");
  };
  //=====================================================================

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <label className="block mb-2 text-sm font-semibold">Username</label>
        <input
          type="text"
          required
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          onChange={(e) => setpassword(e.target.value)}
        />

        <div className="mb-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recapchaSitekey}
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
