
# How to Add a New Component

This guide will walk you through the process of adding a new component to the component library. By following these steps, you'll ensure that your new component is consistent with the existing component structure and easy for other developers to use.

## 1. Choose the Right Location

Before you create a new component, decide where it should live. The `src/components` directory is organized into the following subdirectories:

*   `src/components/layout/`: For major layout components that define the structure of the application (e.g., `Header`, `Footer`, `Sidebar`).
*   `src/components/ui/`: For general-purpose, reusable UI elements that can be used in multiple places (e.g., `Button`, `Input`, `Modal`).
*   `src/components/widgets/`: For more complex, feature-specific components that are composed of smaller UI elements (e.g., `UserProfileCard`, `ActivityFeed`).

Place your new component in the directory that best fits its purpose.

## 2. Create the Component File

Once you've chosen a location, create a new file for your component. The file should be named in `PascalCase` and have a `.tsx` extension. For example, if you're creating a new `Button` component, the file should be named `Button.tsx`.

Inside the file, create a new React functional component. The component should be well-typed with TypeScript.

### Example: `src/components/ui/Button.tsx`

```tsx
import React from 'react';

interface ButtonProps {
  /**
   * The content of the button.
   */
  children: React.ReactNode;
  /**
   * A function to be called when the button is clicked.
   */
  onClick: () => void;
  /**
   * The visual style of the button.
   */
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

## 3. Define Props with TypeScript

Define a TypeScript `interface` for your component's props. This will ensure that your component is used correctly and provide autocompletion and type checking in your IDE.

*   Use descriptive names for your props.
*   Provide JSDoc comments for each prop to explain its purpose.
*   Make props optional by adding a `?` after the prop name if they are not required.
*   Provide default values for optional props where appropriate.

## 4. Write the Component Logic

Write the JSX and any necessary logic for your component. Keep your components focused on a single responsibility. If a component becomes too complex, consider breaking it down into smaller, more manageable components.

## 5. Style the Component

Currently, the project uses standard CSS files for styling. You can create a new CSS file for your component and import it into the component file.

For consistency, consider using a utility-first CSS framework like Tailwind CSS or a CSS-in-JS library in the future.

## 6. Export the Component

Export your component as the default export from the file. This allows other components to import it easily.

```tsx
export default Button;
```

## 7. Use the Component

Once your component is created, you can import it into other components and use it in your application.

```tsx
import Button from './ui/Button';

function MyComponent() {
  return (
    <div>
      <Button onClick={() => console.log('Button clicked!')}>
        Click Me
      </Button>
    </div>
  );
}
```

By following these steps, you can create new components that are consistent, reusable, and easy to maintain.

## 8. Displaying Your Component with Code Examples

To make your components easy for others to use and test, you should display them with a code example. This allows visitors to see how the component works and copy the code to use in their own projects. We use the `CodeExample` component for this purpose.

### How to Use the `CodeExample` Component

The `CodeExample` component takes two props:

*   `code`: A string containing the code for your component.
*   `children`: The component itself.

Here's how you would use it to display a `MyButton` component:

```tsx
import React from 'react';
import { CodeExample } from './CodeExampleGrabber';

// Your component
const MyButton = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

// A string version of your component's code
const myButtonCode = `
import React from 'react';
const MyButton = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);
`;

// The component that displays your button with the code example
const MyButtonExample = () => {
  return (
    <CodeExample code={myButtonCode}>
      <MyButton text="Click Me" onClick={() => alert('Button clicked!')} />
    </CodeExample>
  );
};

export default MyButtonExample;
```

When you add a new component, create a corresponding example file that uses the `CodeExample` component to display it. This is a core part of our component library and is expected for all new components.

## Tips for Junior Devs

Here are a few tips to help you as you work on this project:

1.  **Read the Existing Code:** Before you write any new code, take some time to read the existing code in the project. This will help you understand the coding style, patterns, and conventions that we use.
2.  **Keep Components Small and Focused:** Try to keep your components small and focused on a single responsibility. If a component is doing too much, break it down into smaller, more manageable components.
3.  **Write Clear and Concise Props:** Use TypeScript to define the props for your components. This will make your components easier to use and help prevent bugs.
4.  **Don't Be Afraid to Ask Questions:** If you're not sure about something, don't hesitate to ask another developer for help. It's better to ask a question than to spend hours struggling with a problem.
5.  **Test Your Components:** Before you submit your code for review, make sure you've tested your components thoroughly. This will help ensure that your code is working as expected and won't cause any regressions.

