import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

const PostInfo = ({ url }) => {
  return (
    <div className="h-fit w-full bg-blue-500">
      <div className="">ProfileInfo</div>
      <div className="flex h-[500px] justify-center text-white">
        <img className="h-[500px]" src={url} alt="Post" />
      </div>
    </div>
  );
};

const Post = () => {
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
              setImageList((prev) => [...prev, url]);
            });
          });
        });
      });
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      {imageList.map((url, index) => (
        <PostInfo key={index} url={url} />
      ))}
    </div>
  );
};

export default Post;
