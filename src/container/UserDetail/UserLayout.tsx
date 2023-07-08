import { Descriptions, Image } from "antd";

const UserLayout = ({ data }: any) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex flex-row justify-between">
        <div className="basis-1/3   relative">
          {data.imgUrl === "undefined" ||
          data.imgUrl === undefined ||
          data.imgUrl === null ? (
            <Image
              src="http://localhost:9000/img/avatar.jpg "
              className="object-cover w-full h-full"
            />
          ) : (
            <Image src={`http://localhost:9000/img/${data.imgUrl}`} />
          )}
        </div>
        <div className="basis-2/3 flex justify-center items-center py-10 px-5 ">
          <Descriptions title={data.username}>
            <Descriptions.Item label="Phone">Null</Descriptions.Item>
            <Descriptions.Item label="Address">Null</Descriptions.Item>
            <Descriptions.Item label="Status">Null</Descriptions.Item>
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
