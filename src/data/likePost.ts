import axios from "axios";
interface propType {
  postId: number;
  username: string;
}
const likePost = ({ postId, username }: propType) => {
  axios
    .post("http://localhost:9000/like", {
      id: JSON.stringify(postId),
      username: JSON.stringify(username),
    })
    .then(function (response) {
      console.log(response.data);
      if (response.data == true) {
        return true;
      } else {
        return false;
      }
    });
};

export default likePost;
