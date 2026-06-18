/*
 This is the entry point of our React application. We import the necessary modules and components, and then we render our App component into the DOM. The createRoot method is used to create a root for our application, and we specify the element with the id 'root' as the container for our app. The React.StrictMode is a development tool that helps us identify potential issues in our application by activating additional checks and warnings.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";


/*
Looking for a doorway in the index.html, then we create a root and render our App component inside it. The React.StrictMode is a wrapper that helps us identify potential problems in our application during development. It doesn't affect the production build, but it can help us catch issues early on.
*/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);