import { auth } from "./components/firebase/config";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, signInWithGoogle, logOut }) => {
  let links = [
    { name: "Home", link: "/", iconName: "home-outline" },
    { name: "Search", link: "/search", iconName: "search-outline" },
    { name: "Explore", link: "/explore", iconName: "compass-outline" },
    { name: "Create", link: "/create", iconName: "add-circle-outline" },
    {
      name: "Profile",
      link: "/profile",
      iconName: "person-outline",
      photoURL: auth?.currentUser?.photoURL,
    },
  ];

  return (
    <nav className="fixed bottom-0 flex h-fit w-full items-center justify-center gap-2 bg-amber-200 md:sticky md:top-0 md:h-screen md:w-2/12 md:flex-col md:gap-8">
      <div className="absolute cursor-pointer text-transparent md:top-12 md:text-black">
        <Link to="/">
          <ion-icon size="large" name="logo-instagram"></ion-icon>
        </Link>
      </div>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.link}
          className="flex w-full flex-col items-center pt-2 pb-2 text-center hover:bg-amber-300"
        >
          {loggedIn && link.name === "Profile" ? (
            <img
              className="h-10 w-10 rounded-full"
              src={auth.currentUser.photoURL}
              alt="Profile"
            />
          ) : (
            <ion-icon size="large" name={link.iconName} />
          )}
          <p className="hidden md:block">{link.name}</p>
        </Link>
      ))}
      {loggedIn ? (
        <div
          className="flex w-full cursor-pointer items-center justify-center p-2 hover:bg-amber-300 md:hidden"
          onClick={logOut}
        >
          <ion-icon size="large" name="log-out-outline"></ion-icon>
        </div>
      ) : (
        <div
          className="flex w-full cursor-pointer items-center justify-center p-2 hover:bg-amber-300 md:hidden"
          onClick={signInWithGoogle}
        >
          <ion-icon size="large" name="log-in-outline" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
