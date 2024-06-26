import Table from "../components/Table";
import itemIcon from "../assets/images/icons/itemsIcon.svg";
import userIcon from "../assets/images/icons/ordersIcon.svg";
import orderIcon from "../assets/images/icons/usersIcon.svg";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Page404 from "./Page404";
import eventIcon from "../assets/images/icons/events.svg";

export default function Dashboard() {
  const [newArrival, setNewArrival] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [newEvents, setNewEvents] = useState([]);
  const [boxs, setBoxs] = useState([
    {
      title: "All Items",
      count: 0,
      icon: itemIcon,
      color: "#e7fef6",
    },
    { title: "Our events", count: 0, icon: eventIcon, color: "#daf4ff" },
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
    { header: "Type", accessor: "itemType" },
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

  const thead3 = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "name" },
    { header: "Location", accessor: "location" },
    { header: "Date", accessor: "date" },
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

  const {
    data: events,
    loading: loading4,
    error: error4,
  } = useFetch("http://localhost:3005/api/v1/event");

  useEffect(() => {
    const updatedBoxs = [...boxs];
    if (items) {
      updatedBoxs[0].count = items.data?.results.length;
      const lastTwoItems = items.data?.results.slice(-2);
      const extractedItemData = lastTwoItems.map((item) => ({
        title: item?.title,
        price: item?.price,
        countInStock: item?.countInStock,
        images: item?.images,
        category: item?.category?.title,
        itemType: item?.itemType?.itemType,
      }));
      setNewArrival(extractedItemData);
    }

    if (orders) {
      updatedBoxs[2].count = orders.data?.results.length;
      const lastTwoOrders = orders.data?.results.slice(-2);
      const extractedOrderData = lastTwoOrders.map((order) => ({
        id: order?._id,
        firstName: order?.firstName,
        email: order?.email,
        address: order?.address,
        phoneNumber: order?.phoneNumber,
        totalPrice: order?.totalPrice,
        status: order?.status,
      }));
      setNewOrders(extractedOrderData);
    }

    if (users) {
      updatedBoxs[3].count = users.data?.results.length;
    }

    if (events) {
      updatedBoxs[1].count = events.data?.results.length;
      const lastTwoEvents = events.data?.results.slice(-2);
      const extractedEventData = lastTwoEvents.map((event) => ({
        name: event?.name,
        description: event?.description,
        images: event?.images,
        id: event?._id,
        date: event?.date,
        location: event?.location,
        numOfTickets: event?.numOfTickets,
      }));
      setNewEvents(extractedEventData);
    }

    setBoxs(updatedBoxs);
  }, [items, orders, users, events]);

  if (error1 || error2) {
    return <Page404 />;
  }

  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <p className="text-2xl font-bold">Over View</p>

      <div>
        <div className="flex flex-wrap  gap-5 py-6">
          {boxs.map((box) => (
            <div
              key={box.title}
              style={{ backgroundColor: box.color }}
              className={`flex  justify-between p-3 w-[290px] border border-none rounded-md`}
            >
              <div className="flex gap-3 mb-3">
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
          <p className="text-xl font-semibold mb-8">Newest Events</p>

          <Table columns={thead3} data={newEvents} loading={loading3} />
        </div>
        <hr className="w-3/4 mx-auto border" />

        <div className="py-9">
          <p className="text-xl  font-semibold mb-8">Recent Orders</p>
          <Table columns={thead2} data={newOrders} loading={loading2} />
        </div>
      </div>
    </div>
  );
}
