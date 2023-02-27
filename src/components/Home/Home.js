import Stories from "./Stories";
import Post from "./Post";
import AuthDisplay from "./AuthDisplay";

const Home = ({ loggedIn, signInWithGoogle, logOut }) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex gap-4">
        <div className=" flex w-[90%] flex-col items-center md:w-[470px]">
          <Stories />
          <Post />
        </div>
        <AuthDisplay
          loggedIn={loggedIn}
          signInWithGoogle={signInWithGoogle}
          logOut={logOut}
        />
      </div>
    </div>
  );
};

export default Home;
