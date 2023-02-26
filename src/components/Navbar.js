import { Link } from "react-router-dom";

const Navbar = () => {
  let links = [
    { link: "/", iconName: "home-outline" },
    { link: "/search", iconName: "search-outline" },
    { link: "/explore", iconName: "compass-outline" },
    { link: "/create", iconName: "add-circle-outline" },
    { link: "/profile", iconName: "person-outline" },
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
          className="text-xl w-full pt-2 pb-2 text-center hover:bg-amber-300"
        >
          <ion-icon size="large" name={link.iconName} />
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
