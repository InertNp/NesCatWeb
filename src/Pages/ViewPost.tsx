import { useParams } from "react-router-dom";
import Comments from "../container/Post/Comments";
import CommentBox from "../container/Post/CommentBox";
import Post from "../container/Post/Post";
import { useState } from "react";

const ViewPost = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState("");
  return (
    <div className="flex flex-col gap-5 relative">
      <Post
        id={id}
        author={(e: string) => {
          setAuthor(e);
        }}
      />

      <CommentBox id={id} />

      <Comments id={id} author={author} />
    </div>
  );
};

export default ViewPost;
