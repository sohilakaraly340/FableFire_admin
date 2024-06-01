import axios from "axios";
import React, { createContext } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const AllContext = {};

  return <Context.Provider value={AllContext}>{children}</Context.Provider>;
};
