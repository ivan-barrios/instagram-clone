import { auth, storage } from "./firebase/config";
import { db } from "./firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = ({ loggedIn }) => {
  const [mainInfo, setMainInfo] = useState();
  const [loaded, setLoaded] = useState(false);
  const [imageList, setImageList] = useState([]);

  //Use Effect for the user data
  const userInfoCollection = collection(db, "users");
  useEffect(() => {
    if (auth.currentUser !== null) {
      const getUserInfo = async () => {
        //Read data
        try {
          const data = await getDocs(userInfoCollection);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const profileData = filteredData.find(
            (data) => data.username === auth.currentUser.email
          );
          setMainInfo(profileData);
          setLoaded(true);
        } catch (err) {
          console.error(err);
        }
      };
      getUserInfo();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const imageListRef = ref(storage, `images/${auth?.currentUser?.email}`);
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-full justify-center">
      {loggedIn ? (
        <div className="flex h-screen w-full flex-col items-center">
          <div className="mt-8 grid h-fit w-[470px] grid-cols-2 justify-items-center rounded-lg bg-amber-200 p-2">
            <img
              className="rounded-full"
              src={auth.currentUser.photoURL}
              alt="Profile"
            />
            <div className="flex items-center justify-evenly gap-4">
              <div className="flex flex-col items-center">
                <div>Posts</div>
                {loaded ? <div>{mainInfo.Posts}</div> : null}
              </div>
              <div className="flex flex-col items-center">
                <div>Followers</div>
                {loaded ? <div>{mainInfo.Followers}</div> : null}
              </div>
              <div className="flex flex-col items-center">
                <div>Following</div>
                {loaded ? <div>{mainInfo.Following}</div> : null}
              </div>
            </div>
            <div>{auth.currentUser.email}</div>
          </div>
          <div className="mt-4 mb-16 grid w-[470px] grid-cols-3 gap-2 rounded-xl bg-amber-200 p-4">
            {imageList.map((url, index) => (
              <img
                className="w-full rounded-xl"
                key={index}
                src={url}
                alt="post"
              />
            ))}
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
