const showPosts = () => {
  const res = fetch(`http://localhost:9000/posts/`);
  return res;
};

export default showPosts;
