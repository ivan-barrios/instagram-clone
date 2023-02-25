import Stories from "./Stories";
import Post from "./Post";
import ProfileAuth from "./ProfileAuth";

const Home = () => {
  return (
    <div className="">
      <Stories />
      <ProfileAuth />
      <Post />
    </div>
  );
};

export default Home;
