import React from "react";

interface ReportContentProps {
  htmlContent: string;
}

const ReportContent: React.FC<ReportContentProps> = ({ htmlContent }) => {
  // Render the HTML content
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ReportContent;
