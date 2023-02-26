import Stories from "./Stories";
import Post from "./Post";

const Home = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex gap-16">
        <div className=" flex flex-col bg-red-500" style={{ width: "470px" }}>
          <Stories />
          <Post />
        </div>
        <div className="mt-8 hidden h-fit bg-amber-200 lg:flex lg:flex-col">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-black"></div>
            <div>@ivaan.barrios</div>
          </div>
          <div className="flex cursor-pointer items-center hover:bg-amber-300">
            <ion-icon
              size="64px"
              name="log-out-outline"
              style={{ fontSize: "32px" }}
            />
            <span className="text-[28px]">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
