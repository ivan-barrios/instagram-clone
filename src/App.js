import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { auth } from "./components/firebase/config";
import { useState } from "react";
import Home from "./components/Home/Home";
import Create from "./components/Create";
import Profile from "./components/Profile";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser !== null);

  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
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
