import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./PurchaseHistory.css";

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const email = localStorage.getItem("currLoggedInUser");
      if (!email) return;

      const q = query(collection(db, "PurchaseHistory"), where("email", "==", email));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Your Purchase History</h2>
      {history.length === 0 ? (
        <p>No past orders yet.</p>
      ) : (
        history.map((order, index) => (
          <div key={index} className="order-card">
            <p><strong>Order Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.title} × {item.quantity} — {item.newPrice}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseHistory;
