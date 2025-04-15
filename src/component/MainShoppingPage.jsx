// import { useState, useEffect, useRef } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import { Button } from "./ui/button";
// import styles from "./MainShoppingPage.module.css";
// import { useDispatch } from "react-redux";
// import { itemAction } from "../store/counter";
// import { db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { motion } from "framer-motion";

// export default function MainShoppingPage() {
//   const [scannedData, setScannedData] = useState(null);
//   const [scanner, setScanner] = useState(null);
//   const dispatch = useDispatch();
//   const scanningRef = useRef(false);

//   const handleAddItem = (val) => {
//     dispatch(itemAction.adding(val));
//   };

//   useEffect(() => {
//     return () => {
//       if (scanner) {
//         scanner.clear().catch((error) => console.error("Error clearing scanner:", error));
//       }
//     };
//   }, [scanner]);

//   useEffect(() => {
//     if (scannedData && !scanningRef.current) {
//       scanningRef.current = true;
//       fetchItemFromFirebase(scannedData);
//       handleAddItem(scannedData);
//     }
//   }, [scannedData]);

//   const fetchItemFromFirebase = async (barcode) => {
//     try {
//       const itemRef = doc(db, "Mallitems", barcode);
//       const itemSnap = await getDoc(itemRef);

//       if (itemSnap.exists()) {
//         let data = itemSnap.data();
//         data.quantity = 1;
//         dispatch(itemAction.itemadd(data));
//       }
//     } catch (error) {
//       console.error("Error fetching item:", error);
//     } finally {
//       scanningRef.current = false;
//     }
//   };

//   const startScanner = () => {
//     if (scanner) return;

//     const qrScanner = new Html5QrcodeScanner("reader", {
//       fps: 10,
//       qrbox: { width: 250, height: 150 },
//     });

//     qrScanner.render(
//       (decodedText) => {
//         if (!scanningRef.current) {
//           setScannedData(decodedText);
//           qrScanner.clear().then(() => setScanner(null));
//         }
//       },
//       (errorMessage) => {
//         if (!scanningRef.current) {
//           scanningRef.current = true;
//           setTimeout(() => {
//             scanningRef.current = false;
//           }, 5000);
//         }
//       }
//     );

//     setScanner(qrScanner);
//   };

//   return (
//     <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-20 ${styles["main-container-shop"]}`}>

//       <motion.h1
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="text-4xl md:text-5xl font-bold mb-2 text-gray-800 "
//       >
//       <span  className={styles.textcolor}>  Welcome to SmartBasket</span>
//       </motion.h1>
//       <p className="text-gray-600 text-lg mb-6">
//         Scan your item barcode below to add it to your cart.
//       </p>

//       <motion.div
//         className="relative mb-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         {!scanner && (
//           <div className="w-64 h-40 border-4 border-dashed border-green-400 rounded-lg flex items-center justify-center relative">
//             <div className="absolute w-6 h-6 rounded-full bg-green-400 animate-ping"></div>
//             <span className="text-gray-400">Scanner will appear here</span>
//           </div>
//         )}
//         <div id="reader" className={`mt-4 ${styles["main-scanner"]}`} />
//       </motion.div>

//       <Button
//         onClick={startScanner}
//         className={`${styles["btn-place-order"]} mt-2 px-6 py-2 text-lg`}
//         disabled={scanner !== null}
//       >
//         {scanner ? "Scanning..." : "Open Camera & Scan"}
//       </Button>

//       {scannedData && (
//         <motion.div
//           className="mt-6 bg-white px-6 py-4 rounded-lg shadow-md"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//         >
//           <p className="text-xl font-semibold text-green-700">Item Scanned:</p>
//           <p className="text-gray-800 mt-1">{scannedData}</p>
//         </motion.div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "./ui/button";
import styles from "./MainShoppingPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "../store/itmehandler";
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
      console.log("Fetching item with barcode:", barcode);
      const itemRef = doc(db, "MallItems", barcode);
      const itemSnap = await getDoc(itemRef);
      console.log("Item snapshot:", itemSnap.exists(), itemSnap.data());
      if (itemSnap.exists()) {
        setItemDetails(itemSnap.data());
        dispatch(itemAction.itemadd(itemSnap.data()));
        console.log("Item details:", itemSnap.data());
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
