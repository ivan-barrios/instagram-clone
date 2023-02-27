import { db, storage } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";

const UserProfile = ({ clickedEmail }) => {
  const [mainInfo, setMainInfo] = useState();
  const [loaded, setLoaded] = useState(false);
  const [imageList, setImageList] = useState([]);

  const userInfoCollection = collection(db, "users");
  useEffect(() => {
    const getUserInfo = async () => {
      //Read data
      try {
        const data = await getDocs(userInfoCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const profileData = filteredData.find(
          (data) => clickedEmail === data.email
        );
        setMainInfo(profileData);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageListRef = ref(storage, `images/${clickedEmail}`);
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
  }, []);

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="flex h-screen w-full flex-col items-center">
        <div className="mt-8 grid h-fit w-[470px] grid-cols-2 justify-items-center rounded-lg bg-amber-200 p-2">
          <img
            className="rounded-full"
            src={mainInfo?.profilePhotoURL}
            alt="Profile"
          />
          <div className="flex items-center justify-evenly gap-4">
            <div className="flex flex-col items-center">
              <div>Posts</div>
              {loaded ? <div>{mainInfo?.Posts}</div> : null}
            </div>
            <div className="flex flex-col items-center">
              <div>Followers</div>
              {loaded ? <div>{mainInfo?.Followers}</div> : null}
            </div>
            <div className="flex flex-col items-center">
              <div>Following</div>
              {loaded ? <div>{mainInfo?.Following}</div> : null}
            </div>
          </div>
          <div>{clickedEmail}</div>
        </div>
        <div className="mt-4 mb-16 grid w-[470px] grid-cols-3 gap-2 rounded-xl bg-amber-200 p-4">
          {imageList.map((url, index) => (
            <img
              className="w-full cursor-pointer rounded-xl"
              key={index}
              src={url}
              alt="post"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
