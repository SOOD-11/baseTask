import { useEffect, useState } from "react";
import axios from "axios";
import Itemspage from "./api/Itemspage";

// 1. Define Item type (match your DB model)
type Item = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
};

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");



  // 2. Get all items
  const fetchAllItems = async (): Promise<void> => {
    try {
      const res = await axios.get<Item[]>(`${import.meta.env.VITE_BASE_URL}`);
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 3. Search by name
  const searchByName = async (): Promise<void> => {
    try {
      const res = await axios.get<Item[]>(`${import.meta.env.VITE_BASE_URL}/search`, {
        params: { name },
      });
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 4. Filter by date
  const filterByDate = async (): Promise<void> => {
    try {
      const res = await axios.get<Item[]>(`${import.meta.env.VITE_BASE_URL}/by-date`, {
        params: { date },
      });
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // initial load
  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Items Dashboard</h2>

<Itemspage></Itemspage>
    </div>
  );
};

export default App;