import { useState, useEffect, useContext } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "./ui/button";

import styles from "./MainShoppingPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "../store/counter";
export default function MainShoppingPage() {
  const [scannedData, setScannedData] = useState(null);
  const { currentValue } = useSelector((store) => store.items);

  const [scanner, setScanner] = useState(null);
  const dispatch = useDispatch();
    
    const HandleAddItem = (val) => {
      dispatch(itemAction.adding(val));
    };
    
  useEffect(() => {
    return () => {
      if (scanner) {
        scanner
          .clear()
          .catch((error) => alert("Error clearing scanner:", error));
      }
    };
  }, [scanner]);

  useEffect(() => {
    if (scannedData && scannedData.trim() !== "") {
      
      HandleAddItem(scannedData);
    }
  }, [scannedData]);
  const startScanner = () => {
    if (scanner) return;

    const qrScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 150 },
    });

    qrScanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        qrScanner.clear();
        setScanner(null);
      },
      () => {}
    );

    setScanner(qrScanner);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 ${styles["main-container"]}`}
      >
        
        <Button
          onClick={startScanner}
          className={`${styles["scan-item"]} mb-4`}
          disabled={scanner !== null}
        >
          {scanner ? "Scanning..." : "Open Camera & Scan Barcode"}
        </Button>
        <div
          id="reader"
          className={`w-full max-w-md ${styles["main-scanner"]}`}
        />
        {scannedData && (
          <div className="mt-4 p-3 bg-white shadow rounded-lg">
            <p className="text-lg font-medium">Scanned Data:</p>
            <p className="text-green-600 font-bold">{scannedData}</p>
          </div>
        )}
      {/* <DataProvider itemList = {itemList}></DataProvider> */}
      </div>
    </>
  );
}
