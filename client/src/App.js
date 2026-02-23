import Loginn from "./pages/authe/Loginn";
import Regis from "./pages/authe/Regis";
import Home from "./pages/home/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserHome from "./pages/user/UserHome";
import Venuedetail from "./pages/user/Venuedetail";
import Selecttiming from "./pages/user/Selecttiming";
import Payment from "./pages/user/Payment";

import Ownerhome from "./pages/owner/Ownerhome";
import Addvenue from "./pages/owner/Addvenue";
import Ownervenue from "./pages/owner/Ownervenue";
import Editvenue from "./pages/owner/Editvenue";
import Setslot from "./pages/owner/Setslot";

import Adminvenue from "./pages/admin/Adminvenue";
import Adminhome from "./pages/admin/Adminhome";
import Adminuser from "./pages/admin/Adminuser";
import Admincomm from "./pages/admin/Admincomm";
import Adminbookmanage from "./pages/admin/Adminbookmanage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginn />} />
        <Route path="/regis" element={<Regis />} />
        <Route path="/venues" element={<Venuedetail />} />

        {/* USER */}
        <Route path="/home" element={<UserHome />} />
        <Route path="/selecttime/:id" element={<Selecttiming />} />
        <Route path="/payments/:id" element={<Payment />} />

        {/* OWNER */}
        <Route path="/owner" element={<Ownerhome />} />
        <Route path="/owner/addv" element={<Addvenue />} />
        <Route path="/owner/venues" element={<Ownervenue />} />
        <Route path="/owner/edit/:id" element={<Editvenue />} />
        <Route path="/owner/slots/:id" element={<Setslot />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Adminhome />} />
        <Route path="/admin/users" element={<Adminuser />} />
        <Route path="/admin/venues" element={<Adminvenue />} />
        <Route path="/admin/commission" element={<Admincomm />} />
        <Route path="/admin/bookmanage" element={<Adminbookmanage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;