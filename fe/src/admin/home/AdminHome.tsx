import { Route, Routes } from "react-router-dom";
import DashBoard from "../page/DashBoard";
import { useState } from "react";
import Sidebar from "../components/SlideBar";
import Topbar from "../components/Topbar";
import Watch from "../page/Watch";
import SaveWatch from "../page/SaveWatch";
import Order from "../page/Order";

export default function AdminHome() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div onClick={()=>{
        if(isSidebarOpen){
            setIsSidebarOpen(false);
        }
    }}>
        <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Topbar toggleSidebar={toggleSidebar} />
        <Routes>
            <Route path="/" element={<DashBoard/>}/>
            <Route path="/watch" element={<Watch/>} />
            <Route path="/item" element={<></>} />
            <Route path="/watch-save" element={<SaveWatch/>} />
            <Route path="/watch-save/:item" element={<SaveWatch/>} />
            <Route path="/watch-orders" element={<Order />} />
      </Routes>
      </div>
    </div>
    </div>
  )
}
