import { Descriptions, Image } from "antd";
import { url } from "../../data/url";

const UserLayout = ({ data }: any) => {
  // console.log(data);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex flex-row justify-between">
        <div className="basis-1/3   relative">
          {data.imgUrl === "undefined" ||
          data.imgUrl === undefined ||
          data.imgUrl === null ? (
            <Image
              src={`${url}/img/avatar.jpg `}
              className="object-cover"
              width={400}
              height={400}
            />
          ) : (
            <Image
              className="object-cover "
              src={`${url}/img/${data.imgUrl}`}
              fallback={`${url}/img/avatar.jpg`}
              width={400}
              height={400}
            />
          )}
        </div>
        <div className="basis-2/3 flex justify-center items-center py-10 px-5 ">
          <Descriptions title={"User Details"} column={1}>
            <Descriptions.Item label="Username">
              {data.username}
            </Descriptions.Item>
            <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
            <Descriptions.Item label="Created Date">
              {data.created_date || "Null"}
            </Descriptions.Item>
            <Descriptions.Item label="Last Online">
              {data.last_login || "Null"}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
