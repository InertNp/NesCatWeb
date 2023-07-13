import { url } from "./url";

const showPosts = () => {
  const res = fetch(`${url}/posts/`);
  return res;
};

export default showPosts;
