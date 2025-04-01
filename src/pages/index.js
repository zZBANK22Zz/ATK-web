import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login-register/LoginPage");
  }, []);

  useEffect(() => {
    router.push("/test-submission"); //Redirects to the Test Submission Page
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <h1 className="text-center text-4xl">
        Final project, Software Deployment
      </h1>
    </div>
  );
}