import Table from "../../components/Table";
import itemIcon from "../../assets/images/icons/itemsIcon.svg";
import userIcon from "../../assets/images/icons/ordersIcon.svg";
import orderIcon from "../../assets/images/icons/usersIcon.svg";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function Dashboard() {
  const [newArrival, setNewArrival] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [boxs, setBoxs] = useState([
    {
      title: "All Items",
      count: 0,
      icon: itemIcon,
      color: "#e7fef6",
    },
    {
      title: "All Orders",
      count: 0,
      icon: orderIcon,
      color: "#FDE2E1",
    },
    { title: "Our Users", count: 0, icon: userIcon, color: "#FEDFAC" },
  ]);

  const thead1 = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "title" },
    { header: "Price", accessor: "price" },
    { header: "No.Stock", accessor: "countInStock" },
    { header: "Category", accessor: "category" },
  ];

  const thead2 = [
    { header: "First Name", accessor: "firstName" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phoneNumber" },
    { header: "Address", accessor: "address" },
    { header: "Total Price", accessor: "totalPrice" },
    { header: "Status", accessor: "status" },
  ];

  const {
    data: items,
    loading: loading1,
    error: error1,
  } = useFetch("http://localhost:3005/api/v1/item");

  const {
    data: orders,
    loading: loading2,
    error: error2,
  } = useFetch("http://localhost:3005/api/v1/admin/order");
  const {
    data: users,
    loading: loading3,
    error: error3,
  } = useFetch("http://localhost:3005/api/v1/admin/user");

  useEffect(() => {
    const updatedBoxs = [...boxs];
    if (items) {
      updatedBoxs[0].count = items.data.length;
      const lastTwo = items.data.reverse().slice(0, 2);
      const extractedData = lastTwo.map((item) => ({
        title: item.title,
        price: item.price,
        countInStock: item.countInStock,
        images: item.images,
        category: item.category.title,
      }));
      setNewArrival(extractedData);
    }

    if (orders) {
      updatedBoxs[1].count = orders.data.length;
      const lastTwo = orders.data.reverse().slice(0, 2);
      const extractedData = lastTwo.map((order) => ({
        id: order._id,
        firstName: order.firstName,
        email: order.email,
        address: order.address,
        phoneNumber: order.phoneNumber,
        totalPrice: order.totalPrice,
        status: order.status,
      }));
      setNewOrders(extractedData);
    }

    if (users) {
      updatedBoxs[2].count = users.data.length;
    }

    setBoxs(updatedBoxs);
  }, [items, orders]);

  if (error1 || error2) {
    return (
      <p className="flex justify-center items-center w-[50%]">Ooops Error!</p>
    );
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

          <Table columns={thead1} data={newArrival} loading={loading1} />
        </div>
        <hr className="w-3/4 mx-auto border" />

        <div className="py-9">
          <p className="text-xl  font-semibold mb-8">Recent Orders</p>
          <Table columns={thead2} data={newOrders} loading={loading2} />
        </div>
      </div>
    </>
  );
}
