import { auth, storage, db } from "./firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = ({ loggedIn }) => {
  const [mainInfo, setMainInfo] = useState();
  const [loaded, setLoaded] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [showPostOptions, setShowPostOptions] = useState(false);

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
            (data) => data.email === auth.currentUser.email
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
  }, [loggedIn]);

  const imageListRef = ref(storage, `images/${auth?.currentUser?.email}`);
  useEffect(() => {
    setImageList([]);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const deletePost = async () => {
    //How to delete storage?
  };

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
                className="w-full cursor-pointer rounded-xl"
                key={index}
                src={url}
                alt="post"
                onClick={() => setShowPostOptions(!showPostOptions)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex w-[470px] flex-col items-center gap-4 rounded-lg bg-amber-200 p-4 text-[30px]">
          <div>You need to log in first!</div>
          <Link to="/">Back</Link>
        </div>
      )}
      {showPostOptions ? (
        <div
          onClick={() => setShowPostOptions(!showPostOptions)}
          className="absolute top-0 left-0 flex h-full w-full flex-col items-center bg-black bg-opacity-70 pt-12"
        >
          <div className="text-[50px] text-white">OPTIONS:</div>
          <button
            onClick={deletePost}
            className="w-fit rounded-xl bg-red-500 text-[30px] hover:bg-red-600"
          >
            DELETE
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
