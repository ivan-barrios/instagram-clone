import Stories from "./Stories";
import Post from "./Post";
import AuthDisplay from "./AuthDisplay";

const Home = ({ loggedIn, setLoggedIn }) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex gap-4">
        <div className=" flex flex-col" style={{ width: "470px" }}>
          <Stories />
          <Post />
        </div>
        <AuthDisplay loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
    </div>
  );
};

export default Home;
