import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../Navbar/Navbar.jsx";

const Layout = () => (
  <>
    <Navbar />
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Outlet />
    </Container>
  </>
);

export default Layout;
