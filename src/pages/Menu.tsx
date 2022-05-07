import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Menu() {
   return (
      <>
         <Header />

         <Outlet />

         <Footer />
      </>
   );
}

export default Menu;