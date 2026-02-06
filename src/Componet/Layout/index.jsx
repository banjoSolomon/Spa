import Footer from "../Footer/index.footer";
import Navbar from "../Navbar/index.navbar";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import LiveChat from "../LiveChat/LiveChat";
import FloatingActions from "../FloatingActions/FloatingActions";
import PromoBanner from "../PromoBanner/PromoBanner";
import {Outlet} from "react-router-dom";

const Layout = ()=>{
    return(
        <>
            <PromoBanner/>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <ScrollToTop/>
            <LiveChat/>
            <FloatingActions/>
        </>
    )
}

export default Layout