const PostInfo = () => {
  return (
    <div className="h-fit w-full bg-blue-500">
      <div className="">ProfileInfo</div>
      <div className="h-52 bg-black text-white">Photo</div>
      <div>Post Options</div>
    </div>
  );
};

const Post = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
      <PostInfo />
    </div>
  );
};

export default Post;
