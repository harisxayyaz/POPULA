import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const WebsiteAnalysis: React.FC = () => {
  const [text, setText] = useState<string>("https://");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/submit-text", { text });
      setIframeKey((prevKey) => prevKey + 1); // Update the iframe key to refresh the iframe
    } catch (error) {
      console.error("Error submitting text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const toggleIframeSize = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="h-full ">
      <h1 className="text-custom-purple text-2xl font-bold">
        Website Analysis
      </h1>
      {!expanded && (
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center space-y-4"
          >
            <label htmlFor="text">Enter website's URL:</label>
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              className="border-2 border-black h-10 p-4 w-1/3"
              placeholder="Enter website's URL"
            />
            <button
              type="submit"
              className="bg-custom-purple text-white w-20 h-10 rounded"
              disabled={loading}
              onClick={() => setClicked(true)}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            {loading && <ClipLoader color="#72388D" size={50} />}
          </form>
        </div>
      )}
      {!loading && clicked && (
        <div className="relative w-full border-gray-300 border-2 mt-4">
          <iframe
            key={iframeKey}
            title="Lighthouse Report"
            src="/report.report.html"
            className={`transition-all duration-500 ${
              expanded ? "h-[80vh]" : "h-1/4"
            } `}
            style={{ width: "100%", border: "none" }}
          />
          <button
            type="button" // Ensure this button does not submit the form
            onClick={toggleIframeSize}
            className="absolute bottom-0 right-0 mb-4 mr-4 p-2 bg-custom-purple text-white rounded"
          >
            {expanded ? "↑" : "↓"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WebsiteAnalysis;
