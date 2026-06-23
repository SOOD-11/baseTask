import { useEffect, useState } from "react";
import axios from "axios";
import Itemspage from "./api/Itemspage";
import Eventspage from "./api/eventsPage";



const App = () => {


  return (
    <div style={{ padding: "20px" }}>
     

<Eventspage></Eventspage>
    </div>
  );
};

export default App;
