import React from "react";
import Header from "../components/Menu/Header";
import Footer from "../components/Menu/Footer";
import { Outlet } from "react-router-dom";

function Menu() {
   return (
      <>
         <Header />

         <Outlet />

         {/*<Footer />*/}
      </>
   );
}

export default Menu;