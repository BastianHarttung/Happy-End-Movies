import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";

function Menu({setOpenUserSettings}) {
    return (
        <>
            <Header openModalUserSettings={(modal) => setOpenUserSettings(modal)}/>

            <Outlet/>

            <Footer/>
        </>
    );
}

export default Menu;