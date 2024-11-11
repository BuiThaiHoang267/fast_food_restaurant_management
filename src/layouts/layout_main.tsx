import Navbar from "../components/navbar.tsx";

const LayoutMain : React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <div className="h-full w-full flex flex-col">
        <Navbar></Navbar>
        <main className="flex-grow overflow-y-auto">
            {children}
        </main>
    </div>
  );
}

export default LayoutMain;