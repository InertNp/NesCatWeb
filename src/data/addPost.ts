const addPost = (value: any) => {
  const res = fetch("http://localhost:9000/post", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  return res;
};

export default addPost;
