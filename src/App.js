import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, googleProvider } from "./components/firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import Navbar from "./Navbar";
import Home from "./components/Home/Home";
import Create from "./components/Create";
import Profile from "./components/Profile";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser !== null);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row">
        <Navbar
          loggedIn={loggedIn}
          signInWithGoogle={signInWithGoogle}
          logOut={logOut}
        />
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
          <Route
            path="/"
            element={
              <Home
                loggedIn={loggedIn}
                signInWithGoogle={signInWithGoogle}
                logOut={logOut}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
