import { auth } from "./firebase/config";
import { Link } from "react-router-dom";

const Profile = ({ loggedIn }) => {
  const profileInfo = [
    { name: "Posts", number: 5 },
    { name: "Followers", number: 420 },
    { name: "Following", number: 501 },
  ];

  return (
    <div className="flex h-screen w-full justify-center">
      {loggedIn ? (
        <div className="flex h-screen w-full flex-col items-center bg-blue-500">
          <div className="mt-8 grid h-fit w-[470px] grid-cols-2 justify-items-center rounded-lg bg-amber-200 p-2">
            <img
              className="rounded-full"
              src={auth.currentUser.photoURL}
              alt="Profile"
            />
            <div className="flex items-center justify-evenly gap-4">
              {profileInfo.map((info) => (
                <div className="flex flex-col items-center gap-1">
                  <div>{info.name}</div>
                  <div>{info.number}</div>
                </div>
              ))}
            </div>
            <div>{auth.currentUser.email}</div>
          </div>
          <div>
            <div>Posts</div>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex h-fit w-[470px] flex-col items-center gap-4 bg-amber-200">
          <div className="text-[25px]">First you need to Log In</div>
          <Link
            className="rounded-lg p-2 text-[30px] hover:bg-amber-300"
            to="/"
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
