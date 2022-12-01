import React from "react";
import "./Section.css";

function Section({ Cover, Reveal, title, color, selected }) {
  return (
    <div
      className={`section ${selected && "section--selected"}`}
      style={{
        borderBottom: `8px solid ${color}`,
        color: `${selected && color}`,
      }}
    >
      <div className="animated-images">
      <img src={Cover} />
      <img src={Reveal} />
      </div>
   
    </div>
  );
}

export default Section;
