import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Menu/Header";

function Menu() {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}

export default Menu;