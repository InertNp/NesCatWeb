const deletePost = (postId: number) => {
  const res = fetch("http://localhost:9000/deletePost", {
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
