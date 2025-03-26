import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (!isAuthenticated) {
      router.push("/login-register/LoginPage");
    } else {
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) return null;

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <h1 className="text-center text-4xl">
        Final project, Software Deployment
      </h1>
    </div>
  );
}