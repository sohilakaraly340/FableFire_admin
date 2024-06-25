import React from "react";
import * as Yup from "yup";
import FormCom from "../components/FormCom";
import { useLocation, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import usePatch from "../hooks/usePatch";

const ValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  images: Yup.array().min(1, "At least one image is required"),
  date: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  numOfTickets: Yup.number().required("Required"),
});

const inputs = [
  { name: "images", title: "Images", type: "file", multiple: true },
  { name: "name", title: "Event Name", type: "text" },
  { name: "description", title: "Description", type: "textarea" },
  { name: "date", title: "Date", type: "datetime-local" },
  { name: "numOfTickets", title: "No.tickets", type: "number" },
  { name: "location", title: "Location", type: "text" },
];

export default function AddEvent({ mode, initialValues = {} }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state && location.state.fromEdit) {
    initialValues = location.state.fromEdit.row;
  }

  const { postResource, loading: postLoading } = usePost(
    "http://localhost:3005/api/v1/admin/event"
  );

  const { patchResource, loading: patchLoading } = usePatch(
    "http://localhost:3005/api/v1/admin/event"
  );

  const submit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "images" && values[key].length > 0) {
        values[key].forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, values[key]);
      }
    }

    let res;
    if (mode === "edit") {
      res = await patchResource(values.id, formData);
    } else {
      res = await postResource(formData);
    }
    navigate("/Events");
  };

  return (
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%] ">
      <FormCom
        submit={submit}
        ValidationSchema={ValidationSchema}
        initialValues={initialValues}
        inputs={inputs}
        loading={postLoading || patchLoading}
        mode={mode}
        page="Event"
      />
    </div>
  );
}
