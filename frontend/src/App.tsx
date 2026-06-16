import { useEffect, useState } from "react";
import axios from "axios";
import Itemspage from "./api/Itemspage";



const App = () => {


  return (
    <div style={{ padding: "20px" }}>
      <h2>Items Dashboard</h2>

<Itemspage></Itemspage>
    </div>
  );
};

export default App;
