import { useEffect, useState } from "react";
import axios from "axios";

import Eventspage from "./pages/HostDashboard";
import { Route, Routes } from "react-router-dom";
import login from "./pages/Login";
import Login from "./pages/Login";
import type HostsPage from "./pages/AttendeeDashboard";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HostDashboard from "./pages/HostDashboard";
import HostSignup from "./pages/HostSignup";
import SignUp from "./pages/SignUp";

const App = () => {
  return (

  <Routes>
<Route   path='/login' element={<Login></Login>}></Route>
<Route path='/signUp' element={<SignUp></SignUp>}></Route>
<Route path='/host-signUp' element={<HostSignup></HostSignup>} ></Route>


<Route path='/all-events' element= {
 < ProtectedRoutes role="ATTENDEE">
  <AttendeeDashboard/>
</ProtectedRoutes>

} />

<Route path='/Dashboard' element= {
 < ProtectedRoutes role="HOST">
  <HostDashboard/>
</ProtectedRoutes>

} />



  </Routes>
  
  );
};

export default App;
