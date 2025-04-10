import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const recaptchaRef = useRef(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [password, setpassword] = useState("");
  const recapchaSitekey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

  const r = useRouter();
  //=====================================================================
  //เป็นฟังก์ชั่นให้ user สมัคร เข้าใช้งานระบบ เช่นเดียวกับการ Login แต่ฟังก์ชั่นนี้จะเป็น การ create user account
  const handleRegister = (e) => {
    e.preventDefault();
    //1. Check user comfirm recapcha or not.
    if (!recaptchaToken) {
      alert("Please complete the reCAPCHA");
      return;
    }

    console.log("Register Submitted:", {
      firstname,
      lastname,
      email,
      recaptchaToken,
      password,
    });
    // Optional: Reset reCAPTCHA after login success
    recaptchaRef.current.reset();
    //2. push to index page after log in successes
    r.push("/");
  };
  //=====================================================================

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <label className="block mb-2 text-sm font-semibold">Firstname</label>
        <input
          type="text"
          required
          className="w-full mb-4 p-2 border rounded"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label className="block mb-2 text-sm font-semibold">Lastname</label>
        <input
          type="text"
          required
          className="w-full mb-4 p-2 border rounded"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
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
