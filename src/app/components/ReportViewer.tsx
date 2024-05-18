import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

const ReportViewer: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  useEffect(() => {
    axios
      .get<string>("http://localhost:3001/api/get-report")
      .then((response) => {
        setHtmlContent(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching HTML file:", error);
      });
  }, []);

  return (
    <div>
      <div>{ReactHtmlParser(htmlContent)}</div>
    </div>
  );
};

export default ReportViewer;
