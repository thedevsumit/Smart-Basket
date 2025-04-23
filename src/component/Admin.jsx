import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // update path if needed
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import Swal from "sweetalert2";

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);
  const [mallItems, setMallItems] = useState({
    id: "",
    title: "",
    description: "",
    img: "",
    price: "",
    newPrice: "",
    discount: "",
  });

  const allowedAdmins = ["84kumarsumit@gmail.com"]; // 👈 Add your admin emails here
  const currUser = localStorage.getItem("currLoggedInUser");

  const isAdmin = allowedAdmins.includes(currUser);

  const fetchMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "ContactMessages"));
    const messagesArr = [];
    querySnapshot.forEach((doc) => {
      messagesArr.push({ id: doc.id, ...doc.data() });
    });
    setMessages(messagesArr);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!mallItems.id) {
      Swal.fire("Error", "Please provide a custom ID for the item.", "error");
      return;
    }

    try {
      const itemRef = doc(db, "mallItems", mallItems.id);
      await setDoc(itemRef, {
        title: mallItems.title,
        description: mallItems.description,
        img: mallItems.img,
        price: mallItems.price,
        newPrice: mallItems.newPrice,
        discount: mallItems.discount,
      });

      Swal.fire("Success", "Item added successfully!", "success");
      setMallItems({
        id: "",
        title: "",
        description: "",
        img: "",
        price: "",
        newPrice: "",
        discount: "",
      });
    } catch (err) {
      Swal.fire("Error", "Could not add item to database.", "error");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (!isAdmin) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h2>🚫 Access Denied</h2>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📩 Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.email}</strong>: {msg.message}
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>➕ Add New Mall Item</h2>
      <form onSubmit={handleAddItem} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Custom ID"
          value={mallItems.id}
          onChange={(e) => setMallItems({ ...mallItems, id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={mallItems.title}
          onChange={(e) => setMallItems({ ...mallItems, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={mallItems.description}
          onChange={(e) => setMallItems({ ...mallItems, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={mallItems.img}
          onChange={(e) => setMallItems({ ...mallItems, img: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Original Price"
          value={mallItems.price}
          onChange={(e) => setMallItems({ ...mallItems, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="New Price"
          value={mallItems.newPrice}
          onChange={(e) => setMallItems({ ...mallItems, newPrice: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Discount (e.g. 15%)"
          value={mallItems.discount}
          onChange={(e) => setMallItems({ ...mallItems, discount: e.target.value })}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AdminPanel;
