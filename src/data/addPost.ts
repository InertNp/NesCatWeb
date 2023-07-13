import { url } from "./url";

const addPost = (value: any) => {
  const res = fetch(`${url}/post`, {
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
