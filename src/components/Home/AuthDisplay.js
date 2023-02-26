import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";

//Display if not logged in
const NotLoggedIn = ({ setLoggedIn }) => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4 hidden rounded-lg bg-amber-200 p-2 md:block">
      <div
        className="flex cursor-pointer items-center rounded-lg  p-2 text-[24px] hover:bg-amber-300"
        onClick={signInWithGoogle}
      >
        <ion-icon name="log-in-outline" />
        <span>Log In</span>
      </div>
      <div>Made By Ivan Barrios</div>
    </div>
  );
};

//Display if logged in
const LoggedIn = ({ setLoggedIn }) => {
  const logOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4 hidden flex-col gap-4 rounded-lg bg-amber-200 p-2 md:flex">
      <div className="flex flex-wrap items-center gap-4">
        <img
          className="h-12 w-12 rounded-full"
          src={auth.currentUser.photoURL}
          alt="Profile"
        />
        <div>{auth.currentUser.email}</div>
      </div>
      <div
        className="flex w-fit cursor-pointer items-center rounded-lg p-2 text-[24px] hover:bg-amber-300"
        onClick={logOut}
      >
        <ion-icon name="log-out-outline"></ion-icon>
        <span>Log Out</span>
      </div>
      <div>Made By Ivan Barrios</div>
    </div>
  );
};

const AuthDisplay = ({ loggedIn, setLoggedIn }) => {
  return (
    <div>
      {loggedIn ? (
        <LoggedIn setLoggedIn={setLoggedIn} />
      ) : (
        <NotLoggedIn setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
};

export default AuthDisplay;
