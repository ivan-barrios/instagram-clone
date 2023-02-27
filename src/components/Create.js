import { auth, db } from "./firebase/config";
import { storage } from "./firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";

//To create a new post in personal profile
const Create = ({ userID, posts, setPosts }) => {
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
    <div>
      <input
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      <button
        id={userID}
        onClick={() => {
          uploadImage();
          updatePostsQuantity(userID);
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default Create;
