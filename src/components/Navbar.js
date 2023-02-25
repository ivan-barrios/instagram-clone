import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="w-2/12 h-screen flex flex-col items-center gap-8 bg-amber-200"
      style={{ minWidth: "5rem" }}
    >
      <div className="m-8 lg:text-6xl md:text-3xl sm:text-xl">Y(icon)?</div>
      <Link to="/" className="w-full pt-2 pb-2 hover:bg-amber-300 text-center">
        Home
      </Link>
      <Link
        to="/search"
        className="w-full pt-2 pb-2 hover:bg-amber-300 text-center"
      >
        Search
      </Link>
      <Link className="w-full pt-2 pb-2 hover:bg-amber-300 text-center">
        Explore
      </Link>
      <Link className="w-full pt-2 pb-2 hover:bg-amber-300 text-center">
        Reels
      </Link>
      <Link className="w-full pt-2 pb-2 hover:bg-amber-300 text-center">
        Messages
      </Link>
      <Link
        to="/create"
        className="w-full pt-2 pb-2 hover:bg-amber-300 text-center"
      >
        Create
      </Link>
      <Link
        to="/profile"
        className="w-full pt-2 pb-2 hover:bg-amber-300 text-center"
      >
        Profile
      </Link>
    </div>
  );
};

export default Navbar;
