import { url } from "./url";

const deletePost = (postId: number) => {
  const res = fetch(`${url}/deletePost`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });

  return res;
};

export default deletePost;
