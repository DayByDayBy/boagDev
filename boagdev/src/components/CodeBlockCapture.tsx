import React, { useState } from "react";

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#2d2d2d",
        color: "#ccc",
        padding: "1rem",
        borderRadius: "4px",
        marginTop: "16px",
        fontSize: "0.875rem",
      }}
    >
      <pre
        style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
      >
        <code>{code}</code>
      </pre>

      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          padding: "6px 12px",
          background: isCopied ? "#28a745" : "rgba(255, 255, 255, 0.1)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};
