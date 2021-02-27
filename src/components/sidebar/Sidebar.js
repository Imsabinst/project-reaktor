import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ categories }) => {
  return (
    <div className="sidebar-categories">
      <h3>Categories</h3>
      <ul className="cat-items">
        {categories &&
          categories.map((category) => {
            return (
              <li key={category.name}>
                <Link to={category.path}>{category.name}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
