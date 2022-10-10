import React from "react";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutIconList = () => {
  return (
    <div className="about-link">
      <Link to="/about-link">
        <FaQuestion size={30} />
      </Link>
    </div>
  );
};

export default AboutIconList;
