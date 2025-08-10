import React from "react";

const CentralLogo: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "var(--font-primary)",
        fontWeight: "600",
        fontSize: "2rem",
        color: "var(--primary-color)",
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
      aria-label="boagDev logo"
    >
      boagDev
    </div>
  );
};

export default CentralLogo;