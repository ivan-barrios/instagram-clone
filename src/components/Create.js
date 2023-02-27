import { auth } from "./firebase/config";
import { storage } from "./firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";

//To create a new post in personal profile
const Create = () => {
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

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
};

export default Create;
