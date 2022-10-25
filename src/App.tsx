import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { auth } from "./config/firebase";
import routes from "./config/routes";

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? console.log("User detected") : console.log("No User detected");
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
