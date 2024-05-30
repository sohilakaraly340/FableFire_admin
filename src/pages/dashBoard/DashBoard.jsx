import Table from "../../components/Table";
import itemIcon from "../../assets/images/icons/itemsIcon.svg";
import userIcon from "../../assets/images/icons/ordersIcon.svg";
import orderIcon from "../../assets/images/icons/usersIcon.svg";
import { useContext } from "react";
import { Context } from "../../contexts/Context";

export default function Dashboard() {
  const boxs = [
    { title: "All Items", count: 2599, icon: itemIcon, color: "#e7fef6" },
    { title: "All Orders", count: 299, icon: orderIcon, color: "#FDE2E1" },
    { title: "Our Users", count: 5000, icon: userIcon, color: "#FEDFAC" },
  ];

  const { header1, header2, data1, data2 } = useContext(Context);

  return (
    <>
      <p className="text-2xl font-bold px-8">Over View</p>

      <div className="px-20 ">
        <div className="flex flex-wrap justify-center gap-5 py-6">
          {boxs.map((box) => (
            <div
              className={`bg-[${box.color}] p-2 w-[300px] border border-none rounded-md`}
            >
              <div className="flex gap-1 mb-3">
                <img src={box.icon} width="40px" />
                <p className="font-medium">{box.title}</p>
              </div>
              <p className="font-medium">{box.count}</p>
            </div>
          ))}
        </div>

        <hr className="w-3/4 mx-auto border " />

        <div className="py-9">
          <p className="text-xl font-semibold mb-8">New Arrival</p>
          <Table columns={header1} data={data1} />
        </div>
        <hr className="w-3/4 mx-auto border" />

        <div className="py-9">
          <p className="text-xl  font-semibold mb-8">Recent Orders</p>
          <Table columns={header2} data={data2} />
        </div>
      </div>
    </>
  );
}
