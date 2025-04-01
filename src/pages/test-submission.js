import React, { useState } from "react";

export default function TestSubmission() {
  const [testResult, setTestResult] = useState(""); // Stores test result (Positive/Negative)
  const [image, setImage] = useState(null); // Stores uploaded image
  const [timestamp, setTimestamp] = useState(""); // Stores the timestamp
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Stores confirmation message

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTimestamp = new Date().toISOString();
    setTimestamp(currentTimestamp); // Set the current timestamp

    // Logic to handle form submission (could be an API call to a server)
    console.log("Test Result:", testResult);
    console.log("Uploaded Image:", image);
    console.log("Timestamp:", currentTimestamp);

    // Show a confirmation message after submission
    setConfirmationMessage("Your ATK test result has been successfully submitted!");
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
            accept="image/*"
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
