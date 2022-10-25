import React from "react";
import IPagePorps from "../interfaces/page";
import { Link } from "react-router-dom";

const HomePage: React.FC<IPagePorps> = () => {
  return (
    <div>
      <p>Welcome to this page that is protected</p>
      <p>
        Change your password <Link to="/change">here.</Link>
      </p>
      <p>
        Click <Link to="/logout">here</Link> to logout.
      </p>
      
    </div>
  );
};

export default HomePage;
