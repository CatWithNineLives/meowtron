import React from "react";
import "./App.css";
import cat from "./assets/meowtron-coming-soon.png";

export default function App() {
  return (
    <div className="app-container">
      <div className="cat-wrapper">
        <img src={cat} alt="Meowtron teaser cat" className="meowtron-cat" />
      </div>
    </div>
  );
}

