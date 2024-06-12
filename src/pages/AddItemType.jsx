import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import usePatch from "../hooks/usePatch";
import * as Yup from "yup";
import FormCom from "../components/FormCom";

const ValidationSchema = Yup.object({
  itemType: Yup.string().required("Required"),
});

const inputs = [{ name: "itemType", title: "Item Type", type: "text" }];

export default function AddItemType({ mode, initialValues = {} }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state && location.state.fromEdit) {
    initialValues = location.state.fromEdit.row;
  }

  const { postResource, loading: postLoading } = usePost(
    "http://localhost:3005/api/v1/admin/itemType"
  );

  const { patchResource, loading: patchLoading } = usePatch(
    "http://localhost:3005/api/v1/admin/itemType"
  );

  const submit = async (values) => {
    const formData = new FormData();
    formData.append("itemType", values.itemType);

    let res;
    if (mode === "edit") {
      res = await patchResource(values.id, formData);
    } else {
      res = await postResource(formData);
    }
    // navigate("/ItemTypes");
  };

  return (
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <FormCom
        submit={submit}
        ValidationSchema={ValidationSchema}
        initialValues={initialValues}
        inputs={inputs}
        loading={postLoading || patchLoading}
        mode={mode}
        page="Item Type"
      />
    </div>
  );
}
