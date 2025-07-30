import React, { useState } from "react";
import { CodeBlock } from "./CodeBlockCapture";

interface CodeExampleProps {
  code: string;
  children: React.ReactNode;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ code, children }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        padding: "16px",
        borderRadius: "8px",
        position: "relative",
        marginBottom: "24px",
      }}
    >
      <button
        onClick={() => setShowCode(!showCode)}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "none",
          color: "#007bff",
          cursor: "pointer",
          fontSize: "0.8rem",
        }}
      >
        {showCode ? "Hide Code" : "Show Code"}
      </button>

      <div>{children}</div>

      {showCode && <CodeBlock code={code} />}
    </div>
  );
};

