
import Loginn from "./pages/authe/Loginn";
import Regis from "./pages/authe/Regis";
import Home from "./pages/home/Home";

import Admin from "./pages/admin";

import { BrowserRouter,Route,Routes} from "react-router-dom";
import UserHome from "./pages/user/UserHome";
import Venuedetail from "./pages/user/Venuedetail";
import Selecttiming from "./pages/user/Selecttiming";
import Payment from "./pages/user/Payment";
import Ownerhome from "./pages/owner/Ownerhome";
import Addvenue from "./pages/owner/Addvenue";
import Ownervenue from "./pages/owner/Ownervenue";

function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/login" element={<Loginn />} />
      <Route path="/regis" element={<Regis />} />
        <Route path="/venues" element={<Venuedetail/>}/>
        <Route path="/home" element={<UserHome/>} />
        <Route path="/selecttime/:id" element={<Selecttiming/>}/>
        <Route path="/payments" element={<Payment/>}/>
        <Route path="/owner" element={<Ownerhome/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/owner/addv" element={<Addvenue/>}/>
        <Route path="/owner/venues" element={<Ownervenue/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;