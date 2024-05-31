import Table from "../../components/Table";
import itemIcon from "../../assets/images/icons/itemsIcon.svg";
import userIcon from "../../assets/images/icons/ordersIcon.svg";
import orderIcon from "../../assets/images/icons/usersIcon.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/Context";
import useFetch from "../../hooks/useFetch";

export default function Dashboard() {
  const [newArrival, setNewArrival] = useState([]);
  const [newOrders, setNewOrders] = useState([]);

  const { header1, header2, data1, data2 } = useContext(Context);

  const {
    data: items,
    loading1,
    error1,
  } = useFetch("http://localhost:3005/api/v1/item", {});

  const {
    data: orders,
    loading2,
    error2,
  } = useFetch("http://localhost:3005/api/v1/order", {
    headers: {
      "Content-Type": "multipart/form-data",
      JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcwOTg0MzIsImV4cCI6MTcxNzE4NDgzMn0.w9jGobI-59qnNTCGBRpef1zDVVK76OXu4WsVw4p-FXc`,
    },
  });

  const boxs = [
    {
      title: "All Items",
      count: 2,
      icon: itemIcon,
      color: "#e7fef6",
    },
    {
      title: "All Orders",
      count: 5,
      icon: orderIcon,
      color: "#FDE2E1",
    },
    { title: "Our Users", count: 5000, icon: userIcon, color: "#FEDFAC" },
  ];

  useEffect(() => {
    if (items) {
      const hama = items.data.reverse().slice(0, 2);
      setNewArrival(hama);
    }
    if (orders) {
      // console.log(orders);
      const hama = orders.data.order.reverse().slice(0, 2);
      setNewOrders(hama);
    }
  }, [items, orders]);

  if (loading1 || loading2) {
    return <p className="flex justify-center items-center w-[50%]">loading</p>;
  }

  if (error1 || error2) {
    return <p className="flex justify-center items-center w-[50%]">error</p>;
  }

  return (
    <>
      <p className="text-2xl font-bold px-8">Over View</p>

      <div className="px-20 ">
        <div className="flex flex-wrap justify-center gap-5 py-6">
          {boxs.map((box) => (
            <div
              key={box.title}
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
