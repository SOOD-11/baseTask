import { useEffect, useState } from "react";
import axios from "axios";

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

      {/* SEARCH */}
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <button onClick={searchByName}>Search</button>
      </div>

      {/* DATE FILTER */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
        />
        <button onClick={filterByDate}>Filter</button>
      </div>

      {/* RESET */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={fetchAllItems}>Reset</button>
      </div>

      {/* ITEMS LIST */}
      <div style={{ marginTop: "20px" }}>
        {items.length === 0 ? (
          <p>No items found</p>
        ) : (
          items.map((item: Item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h4>{item.name}</h4>
              <p>ID: {item.id}</p>
              <p>
                Created: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;