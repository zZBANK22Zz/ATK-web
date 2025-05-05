import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TestSubmission() {
  const [testResult, setTestResult] = useState(""); // Stores test result (Positive/Negative)
  const [image, setImage] = useState(null); // Stores uploaded image
  const [timestamp, setTimestamp] = useState(""); // Stores the timestamp
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Stores confirmation message
  const [username, setUsername] = useState("");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const r = useRouter();

  const accept_fileType = process.env.NEXT_PUBLIC_FILE_TYPE_ACCEPT;
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTimestamp = new Date().toISOString();
    setTimestamp(currentTimestamp);

    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];

    const formData = new FormData();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first.");
      return;
    }
    formData.append("userId", userId);
    formData.append("result", testResult.toLowerCase()); // convert to lowercase to match backend enum
    formData.append("image", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/atk`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.status === 401) {
        alert("Session expired. Please log in again.");
        r.push("/login-register/LoginPage");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to submit test result");
      }

      setConfirmationMessage(
        "Your ATK test result has been successfully submitted!"
      );
      setShowBanner(true);
    } catch (error) {
      console.error("Submission error:", error);
      setConfirmationMessage("There was an error submitting your test result.");
      setShowBanner(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 bg-white shadow mb-8">
        <img
          src="https://www.computing.psu.ac.th/th/wp-content/uploads/2018/03/PSU-logo-Original.png"
          alt="Logo"
          className="w-16 h-16 object-contain"
        />
        <h1 className="text-2xl font-bold text-center flex-1">
          Submit your test result
        </h1>
        <p className="text-xl text-right w-32 font-bold">Hi, {username}</p>
      </header>

      {/* Form Section: 2 columns */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center px-6">
        {/* Left - Test Result Selection */}
        <div className="w-full md:w-1/2">
          <p className="text-xl font-bold mb-4">Select your test result:</p>

          {/* Positive Option */}
          <label
            className={`flex flex-col p-4 border rounded-lg cursor-pointer mb-4 ${
              testResult === "Positive"
                ? "bg-blue-100 border-blue-400"
                : "bg-white"
            }`}
          >
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="testResult"
                value="Positive"
                checked={testResult === "Positive"}
                onChange={(e) => setTestResult(e.target.value)}
                className="mr-2"
              />
              <span className="text-lg font-semibold">Positive</span>
            </div>
            <img src="/image/positive.png" alt="positive"></img>
          </label>

          {/* Negative Option */}
          <label
            className={`flex flex-col p-4 border rounded-lg cursor-pointer ${
              testResult === "Negative"
                ? "bg-blue-100 border-blue-400"
                : "bg-white"
            }`}
          >
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="testResult"
                value="Negative"
                checked={testResult === "Negative"}
                onChange={(e) => setTestResult(e.target.value)}
                className="mr-2"
              />
              <span className="text-lg font-semibold">Negative</span>
            </div>
            <img src="/image/negative.png" alt="negative"></img>
          </label>
        </div>

        {/* Right - Upload Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col items-center"
        >
          <p className="text-xl font-bold mb-2">ATK result image</p>
          <label
            htmlFor="image"
            className="w-full h-100 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer text-gray-500 relative overflow-hidden"
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <span>Drop your image here</span>
            )}
            <input
              type="file"
              id="image"
              accept={accept_fileType}
              onChange={handleImageChange}
              className="hidden"
              required
            />
          </label>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
          >
            Submit
          </button>

          {showBanner && (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
              <div className="bg-white rounded-[10px] shadow-lg px-6 py-5 w-[400px] text-center relative border border-black/20">
                <h2 className="text-lg font-semibold text-left">Completed</h2>
                <button
                  onClick={() => setShowBanner(false)}
                  className="absolute top-3 right-4 text-xl font-light"
                >
                  ×
                </button>
                <p className="text-base mt-6 mb-5">
                  {confirmationMessage}
                </p>
                <button
                  onClick={() => setShowBanner(false)}
                  className="w-full bg-green-200 hover:bg-green-300 text-black py-2 rounded-[10px] font-semibold"
                >
                  ok
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
