// not an actual component, really just here as a ref/example for the capture code concept; boilerplate-adjacent, an aide-memoire and teaching tool

import React from "react";
import { CodeExample } from "./CodeExampleGrabber";

const MyButton = ({ text, onClick }) => (
  <button
    style={{
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    }}
    onClick={onClick}
  >
    {text}
  </button>
);

const myButtonCode = `
import React from 'react';
const MyButton = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button> );
`;

const MyWeePage = () => {
  return (
    <div>
      <h1>Component Examples</h1>

      <CodeExample code={myButtonCode}>
        <MyButton
          text="je suis un button m8"
          onClick={() => alert("ca va, yeah?")}
        />
      </CodeExample>
    </div>
  );
};

export default MyWeePage;



// // for custom hooks:

// <CodeExample code = "const useCustomHook = () => { /* ... */ };">
// {/* render a component that's using the hook */}
// <p>hello, i am the custom hook placeholder text, put your own custom hook here</p>
// </CodeExample>
