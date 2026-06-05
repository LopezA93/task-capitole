import { Outlet } from "react-router-dom";
import { AdminDataProvider } from "../../context/AdminDataContext.jsx";

const AdminDataLayout = () => (
  <AdminDataProvider>
    <Outlet />
  </AdminDataProvider>
);

export default AdminDataLayout;
