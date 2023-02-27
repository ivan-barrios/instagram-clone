import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db, googleProvider } from "./components/firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import Navbar from "./Navbar";
import Home from "./components/Home/Home";
import Create from "./components/Create";
import Profile from "./components/Profile";
import { collection, getDocs, addDoc } from "firebase/firestore";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser !== null);
  const [userID, setUserID] = useState("");
  const [posts, setPosts] = useState();

  //Log In with google
  const signInWithGoogle = async () => {
    try {
      const usersCollection = collection(db, "users");
      const data = await getDocs(usersCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      await signInWithPopup(auth, googleProvider);
      const profileData = filteredData.find(
        (data) => data.email === auth.currentUser.email
      );
      if (!profileData) {
        //Then add new doc
        await addDoc(usersCollection, {
          email: auth.currentUser.email,
          Followers: 0,
          Following: 0,
          Posts: 0,
        });
      }
      setUserID(profileData.id);
      setPosts(profileData.Posts);
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  //Log Out
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
          <Route
            path="/create"
            element={
              <Create
                loggedIn={loggedIn}
                userID={userID}
                posts={posts}
                setPosts={setPosts}
              />
            }
          />
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
