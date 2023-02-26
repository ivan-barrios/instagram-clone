import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { auth } from "./firebase-config";
import { useState } from "react";
import Home from "./components/Home/Home";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser !== null);

  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
