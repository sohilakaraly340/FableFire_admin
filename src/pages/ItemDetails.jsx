import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
export default function ItemDetails() {
  const [itemDetails, setItemDetails] = useState({});
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:3005/api/v1/item/${id}`
  );

  useEffect(() => {
    if (data) {
      console.log(data.item);
      setItemDetails(data.item);
    }
  }, [data]);

  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <div className="flex gap-11">
        <img src={itemDetails.images} />
        <div>
          <p>{itemDetails.title}</p>
          <p>By{itemDetails.authorId?.name}</p>
          <p>{itemDetails.price}</p>
          <p>{itemDetails.description}</p>
          <p>{itemDetails.itemType?.itemType}</p>
          <p>{itemDetails.category?.title}</p>
          <p>{itemDetails.publicationDate}</p>
        </div>
      </div>
    </div>
  );
}
