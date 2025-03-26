import React from "react";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <p>Page not found</p>
      <a href="/" style={{ color: "blue" }}>
        Go back to home
      </a>
    </div>
  );
};

export default ErrorPage;
