import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormCom from "../components/FormCom";
import axios from "axios";
import { toast } from "react-toastify";

const ValidationSchema = Yup.object({
  itemType: Yup.string().required("Required"),
});

const inputs = [{ name: "itemType", title: "Item Type", type: "text" }];

export default function AddItemType({ mode, initialValues = {} }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (location.state && location.state.fromEdit) {
    initialValues = location.state.fromEdit.row;
  }

  const submit = async (values) => {
    if (mode === "edit") {
      try {
        setLoading(true);
        await axios.patch(
          `http://localhost:3005/api/v1/admin/itemType/${values.id}`,
          values,
          {
            headers: {
              JWT: token,
            },
          }
        );
        toast.success("updated successfully!");
        navigate("/ItemTypes");
      } catch (error) {
        toast.error(`Error : ${error.response.data.message}`);
      }
    } else {
      try {
        setLoading(true);
        await axios.post(
          "http://localhost:3005/api/v1/admin/itemType",
          values,
          {
            headers: {
              JWT: token,
            },
          }
        );
        toast.success("created successfully!");
        navigate("/ItemTypes");
      } catch (error) {
        toast.error(`Error : ${error.response.data.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%]">
      <FormCom
        submit={submit}
        ValidationSchema={ValidationSchema}
        initialValues={initialValues}
        inputs={inputs}
        loading={loading}
        mode={mode}
        page="Item Type"
      />
    </div>
  );
}
