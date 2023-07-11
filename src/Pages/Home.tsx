import Popular from "../container/Home/Popular";
import ShowPost from "../container/Home/ShowPost";

const Home = () => {
  return (
    <div className="flex pr-20 pl-0 ">
      <div className="basis-2/6">
        <Popular />
      </div>
      <div className="basis-4/6">
        <ShowPost />
      </div>
    </div>
  );
};

export default Home;
