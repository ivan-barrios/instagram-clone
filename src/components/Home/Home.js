import Stories from "./Stories";
import Post from "./Post";
import AuthDisplay from "./AuthDisplay";

const Home = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex gap-4">
        <div className=" flex flex-col" style={{ width: "470px" }}>
          <Stories />
          <Post />
        </div>
        <AuthDisplay />
      </div>
    </div>
  );
};

export default Home;
