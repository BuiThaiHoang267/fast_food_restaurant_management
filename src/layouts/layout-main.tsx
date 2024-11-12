import Navbar from "../components/navbar.tsx";

const LayoutMain : React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <div className="bg-blue-50 h-screen w-screen flex flex-col">
        <Navbar></Navbar>
        <main className="flex-grow overflow-y-auto w-full h-full">
            {children}
        </main>
    </div>
  );
}

export default LayoutMain;