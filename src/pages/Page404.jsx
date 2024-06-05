import React from "react";
import notFound from "../assets/images/404.svg";

export default function Page404() {
  return (
    <div>
      <img src={notFound} className=" m-auto  mt-11 w-[60%]" />
    </div>
  );
}
