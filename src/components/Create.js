import { auth, db } from "./firebase/config";
import { storage } from "./firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import { Link } from "react-router-dom";

//To create a new post in personal profile
const Create = ({ loggedIn, userID, posts, setPosts }) => {
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/${auth.currentUser.email}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("Image Uploaded");
    });
  };

  const updatePostsQuantity = async (userID) => {
    const userDoc = doc(db, "users", userID);
    await updateDoc(userDoc, { Posts: posts + 1 });
    setPosts(posts + 1);
  };

  return (
    <div className="flex w-full justify-center">
      {loggedIn ? (
        <div className="mt-4 flex w-[470px] flex-col items-center gap-4 rounded-lg bg-amber-200 p-4">
          <div className=" text-[30px]">Add a new Post to your Profile!</div>
          <input
            className="hidden"
            type="file"
            id="file-input"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
          <label
            className="cursor-pointer rounded-lg bg-blue-700 p-3 text-white hover:bg-blue-800"
            htmlFor="file-input"
          >
            Choose a file
          </label>
          <button
            className="rounded-lg bg-amber-300 py-2 px-4 hover:bg-amber-400"
            id={userID}
            onClick={() => {
              uploadImage();
              updatePostsQuantity(userID);
            }}
          >
            Upload
          </button>
        </div>
      ) : (
        <div className="mt-4 flex w-[470px] flex-col items-center gap-4 rounded-lg bg-amber-200 p-4 text-[30px]">
          <div>You need to log in first!</div>
          <Link to="/">Back</Link>
        </div>
      )}
    </div>
  );
};

export default Create;
