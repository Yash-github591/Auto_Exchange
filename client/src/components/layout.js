import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}

export default Layout;
