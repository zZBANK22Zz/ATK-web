import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TestSubmission() {
  const [testResult, setTestResult] = useState(""); // Stores test result (Positive/Negative)
  const [image, setImage] = useState(null); // Stores uploaded image
  const [timestamp, setTimestamp] = useState(""); // Stores the timestamp
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Stores confirmation message

  const r = useRouter()

  const accept_fileType = process.env.NEXT_PUBLIC_FILE_TYPE_ACCEPT
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
        credentials: 'include',
        body: formData,
      });
      if(response.status === 401) {
        alert("Session expired. Please log in again.");
        r.push('/');
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to submit test result");
      }

      setConfirmationMessage("Your ATK test result has been successfully submitted!");
    } catch (error) {
      console.error("Submission error:", error);
      setConfirmationMessage("There was an error submitting your test result.");
    }
  };


  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-center text-4xl mb-4">Submit Your ATK Test Result</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="testResult" className="block text-xl">Test Result:</label>
          <select
            id="testResult"
            value={testResult}
            onChange={(e) => setTestResult(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Result</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-xl">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept={accept_fileType}
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {image && (
            <div className="mt-2">
              <img src={image} alt="Uploaded Image Preview" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>

        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Submit
          </button>
        </div>
      </form>

      {confirmationMessage && (
        <div className="mt-4 text-green-500">
          <p>{confirmationMessage}</p>
        </div>
      )}
    </div>
  );
}
