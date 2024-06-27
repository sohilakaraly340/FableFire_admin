import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function EventDetails() {
  const [eventDetails, setEventDetails] = useState({});
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:3005/api/v1/event/${id}`
  );

  useEffect(() => {
    if (data) setEventDetails(data.data);
  }, [data]);

  return (
    <div className="ml-[50%]">
      <h2>Event Details</h2>
      <p>ID: {eventDetails._id}</p>
      <p>Name: {eventDetails.name}</p>
      <p>Description: {eventDetails.description}</p>
      <p>Date: {eventDetails.date}</p>
      <p>Location: {eventDetails.location}</p>
      {/* Render other details as needed */}
    </div>
  );
}
