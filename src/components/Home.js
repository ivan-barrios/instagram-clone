import Stories from "./Stories";
import Post from "./Post";

const Home = () => {
  return (
    <div className="flex w-full justify-center">
      <div className=" flex flex-col bg-red-500" style={{ width: "470px" }}>
        <Stories />
        <Post />
      </div>
    </div>
  );
};

export default Home;
