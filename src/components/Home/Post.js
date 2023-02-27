import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostInfo = ({ email, url, setClickedEmail }) => {
  return (
    <div className="flex h-[600px] w-[95%] flex-col items-center rounded-lg bg-amber-200">
      <Link
        email={email}
        to="/userprofile"
        className="cursor-pointer p-2 text-[20px]"
        onClick={() => setClickedEmail(email)}
      >
        {email}
      </Link>
      <div className="flex h-[90%] w-[70%] flex-col items-center justify-center p-1 text-white">
        <img className="h-auto w-[90%] rounded-lg" src={url} alt="Post" />
      </div>
    </div>
  );
};

const Post = ({ setClickedEmail }) => {
  const [imageList, setImageList] = useState([]);

  //To get all users email
  const userInfoCollection = collection(db, "users");
  const getUserInfo = async () => {
    //Read data
    try {
      const data = await getDocs(userInfoCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return filteredData;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function getPosts() {
      const usersList = await getUserInfo();
      const usersEmails = usersList.map((user) => user.email);
      setImageList([]);
      usersEmails.forEach((email) => {
        const imageListRef = ref(storage, `images/${email}`);
        listAll(imageListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageList((prev) => [...prev, { email, url }]);
            });
          });
        });
      });
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-4 flex flex-col items-center gap-10">
      {imageList.map((info, index) => (
        <PostInfo
          key={index}
          email={info.email}
          url={info.url}
          setClickedEmail={setClickedEmail}
        />
      ))}
    </div>
  );
};

export default Post;
