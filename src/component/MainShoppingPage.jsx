import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "./ui/button";
import styles from "./MainShoppingPage.module.css";
import { useDispatch } from "react-redux";
import { itemAction } from "../store/counter";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function MainShoppingPage() {
  const [scannedData, setScannedData] = useState(null);
  const [scanner, setScanner] = useState(null);
  const dispatch = useDispatch();
  const scanningRef = useRef(false);

  const handleAddItem = (val) => {
    dispatch(itemAction.adding(val));
  };

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear().catch((error) => console.error("Error clearing scanner:", error));
      }
    };
  }, [scanner]);

  useEffect(() => {
    if (scannedData && !scanningRef.current) {
      scanningRef.current = true;
      fetchItemFromFirebase(scannedData);
      handleAddItem(scannedData);
    }
  }, [scannedData]);

  const fetchItemFromFirebase = async (barcode) => {
    try {
      const itemRef = doc(db, "Mallitems", barcode);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        let data = itemSnap.data();
        data.quantity = 1;
        dispatch(itemAction.itemadd(data));
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      scanningRef.current = false;
    }
  };

  const startScanner = () => {
    if (scanner) return;

    const qrScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 150 },
    });

    qrScanner.render(
      (decodedText) => {
        if (!scanningRef.current) {
          setScannedData(decodedText);
          qrScanner.clear().then(() => setScanner(null));
        }
      },
      (errorMessage) => {
        if (!scanningRef.current) {
          scanningRef.current = true;
          setTimeout(() => {
            scanningRef.current = false;
          }, 5000);
        }
      }
    );

    setScanner(qrScanner);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 text-center">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-bold mb-2 text-gray-800"
      >
        Welcome to <span className="text-green-600">SmartBasket</span>
      </motion.h1>
      <p className="text-gray-600 text-lg mb-6">
        Scan your item barcode below to add it to your cart.
      </p>

      <motion.div
        className="relative mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {!scanner && (
          <div className="w-64 h-40 border-4 border-dashed border-green-400 rounded-lg flex items-center justify-center relative">
            <div className="absolute w-6 h-6 rounded-full bg-green-400 animate-ping"></div>
            <span className="text-gray-400">Scanner will appear here</span>
          </div>
        )}
        <div id="reader" className={`mt-4 ${styles["main-scanner"]}`} />
      </motion.div>

      <Button
        onClick={startScanner}
        className={`${styles["btn-place-order"]} mt-2 px-6 py-2 text-lg`}
        disabled={scanner !== null}
      >
        {scanner ? "Scanning..." : "Open Camera & Scan"}
      </Button>

      {scannedData && (
        <motion.div
          className="mt-6 bg-white px-6 py-4 rounded-lg shadow-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <p className="text-xl font-semibold text-green-700">Item Scanned:</p>
          <p className="text-gray-800 mt-1">{scannedData}</p>
        </motion.div>
      )}
    </div>
  );
}
