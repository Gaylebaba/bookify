
import Loginn from "./pages/authe/Loginn";
import Regis from "./pages/authe/Regis";
import Home from "./pages/home/Home";
import Owner from "./pages/owner/Owner";
import Admin from "./pages/admin";

import { BrowserRouter,Route,Routes} from "react-router-dom";

function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/login" element={<Loginn />} />
      <Route path="/regis" element={<Regis />} />
      
        <Route path="/home" element={<Home />} />
        <Route path="/owner" element={<Owner/>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;