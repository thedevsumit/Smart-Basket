import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "./ui/button";
import styles from "./MainShoppingPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "../store/counter";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export default function MainShoppingPage() {
  const [scannedData, setScannedData] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const scanningRef = useRef(false); // Prevent multiple scans
  const dispatch = useDispatch();

  

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
      scanningRef.current = true; // Prevent multiple triggers
      fetchItemFromFirebase(scannedData);
      handleAddItem(scannedData);
    }
  }, [scannedData]);

  const fetchItemFromFirebase = async (barcode) => {
    try {
      
      const itemRef = doc(db, "MallItems", barcode);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        setItemDetails(itemSnap.data());
        dispatch(itemAction.itemadd(itemSnap.data()));
      } else {
        
        setItemDetails(null);
      }
    } catch (error) {
     
    } finally {
      scanningRef.current = false; // Allow future scans
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
          qrScanner.clear().then(() => setScanner(null)); // Stop scanning after first scan
        }
      },
      (errorMessage) => {
        if (errorMessage.includes("NotFoundException")) {
         
          if (!scanningRef.current) {
          
            scanningRef.current = true;
            setTimeout(() => {
              scanningRef.current = false;
            }, 5000); // Allow error message again after 5 seconds
          }
        } else {
        
        }
      }
    );

    setScanner(qrScanner);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 ${styles["main-container"]}`}>
      <Button onClick={startScanner} className={`${styles["scan-item"]} mb-4`} disabled={scanner !== null}>
        {scanner ? "Scanning..." : "Open Camera & Scan Barcode"}
      </Button>

      <div id="reader" className={`w-full max-w-md ${styles["main-scanner"]}`} />

      {scannedData && (
        <div className="mt-4 p-3 bg-white shadow rounded-lg">
          <p className="text-lg font-medium">Scanned Data:</p>
          <p className="text-green-600 font-bold">{scannedData}</p>
        </div>
      )}
    </div>
  );
}
