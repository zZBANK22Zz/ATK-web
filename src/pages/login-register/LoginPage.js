import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";

export default function LoginPage() {
  const recaptchaRef = useRef(null);
  const [username, setUername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recapchaSitekey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

  const r = useRouter();
  //=====================================================================
  //ฟังก์ชั่นนี้เป็นการทำงานของการ Login ซึ่งอยู่ใน process ของการเข้าระบบโดยที่
  //หาก user มี account อยู่แล้วสามารถใช้แค่ gmail และ password เข้าระบบได้เลย
  //Important: user ทุกคนจะต้องยืนยันตัวตนโดย recapcha by google console
  //writed by Ananthichai S.
  const handleLogin = async (e) => {
    e.preventDefault();
    //1. Check user comfirm recapcha or not.
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    const userLogin = await fetch('http://localhost:8000/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    })

    console.log("Login Submitted:", {
      username,
      password,
      recaptchaToken,
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
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block mb-2 text-sm font-semibold">username</label>
        <input
          type="username"
          required
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUername(e.target.value)}
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
            sitekey={recapchaSitekey}
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
          <a href="./RegisterPage" className="underline text-blue-700">
            register
          </a>
        </div>
      </form>
    </div>
  );
}
