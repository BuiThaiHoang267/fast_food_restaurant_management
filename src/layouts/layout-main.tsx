import Navbar from "../components/navbar.tsx";
import {Outlet} from "react-router-dom";

const LayoutMain = () => {
  return (
    <div className="bg-blue-50 h-screen w-screen flex flex-col">
        <Navbar></Navbar>
        <main className="flex-grow overflow-y-auto w-full h-full">
            <Outlet />
        </main>
    </div>
  );
}

export default LayoutMain;