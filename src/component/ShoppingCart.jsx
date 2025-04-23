// import { SignIn } from "../store/SignUp-store";
import { use, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemAction } from "../store/counter";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { quantityAction } from "../store/quantitycounter";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";
const ShoppingCart = ({ sidebar, setSidebar }) => {
  const dispatch = useDispatch();
  const handleSubmit = (val) => {
    alert("Item Removed from Cart");
    dispatch(itemAction.removing(val));
  };
  const { currentValue } = useSelector((store) => store.items);

  const HandleIncrement = (item) => {
    dispatch(itemAction.incrementQuantity(item.title));
  };

  const HandleDecrement = (item) => {
    dispatch(itemAction.decrementQuantity(item.title));
  };

  const { newItem } = useSelector((store) => store.items);
  const temp = newItem;
const showAlert = (icon, title, message) => {
      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: "OK",
        background: "#f8f9fa",
        color: "#000",
        timer: 3000,
      });
    };
  const totalMRP = temp.reduce((sum, item) => {
    return sum + parseInt(item.price.replace("₹", "")) * item.quantity;
  }, 0);
  const handlePlaceOrder = async () => {
    if(temp.length === 0){
      showAlert("error","Error","Add items to cart first")
      return;
    }
    const email = localStorage.getItem("currLoggedInUser");
    if (!email) {
      alert("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      email,
      items: temp,
    
      totalAmount,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "PurchaseHistory"), orderData);
      showAlert("success","Success","Order placed Successfully!")
      dispatch(itemAction.clearCart());
    } catch (error) {
      showAlert("error","Error","Order cannot be placed!")
      
    }
  };

  const totalDiscount = temp.reduce((sum, item) => {
    const original = parseInt(item.price.replace("₹", ""));
    const discounted = parseInt(item.newPrice.replace("₹", ""));
    return sum + (original - discounted) * item.quantity;
  }, 0);
  const handleSubmitRemove = (title) => {
    dispatch(itemAction.removingFromCart(title));
  };

  const convenienceFee = 99;
  const totalAmount = totalMRP - totalDiscount + convenienceFee;

  return (
    <>
      <div
        className="main-parent"
        onClick={() => {
          if (sidebar === 1) {
            setSidebar(0);
          }
        }}
      >
        {temp.length !== 0 && (
          <div className="container mt-4 mainpage">
            <div className="main-parent-card">
              {temp.map((item, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-white positioning-div ">
                      <RxCross2
                        className="icon-card"
                        style={{ color: "black" }}
                        size={18}
                        onClick={() => handleSubmitRemove(item.title)}
                      />

                      <span className="visually-hidden">unread messages</span>
                    </span>

                    <img src={item.img} alt="" className="img-card" />
                    <div className="card-body">
                      <h5 className="card-title card-heading">{item.title}</h5>
                      <p className="card-description">{item.description}</p>
                      <div className="quantitydiv">
                        Qty: {item.quantity}
                        <IoMdAdd
                          className="addquantity"
                          onClick={() => HandleIncrement(item)}
                        />
                        <RiSubtractLine
                          className="decreasequan"
                          onClick={() => HandleDecrement(item)}
                        />
                      </div>
                      <div className="price-card">
                        <p className="newprice">{item.newPrice}</p>
                        <p className="oldprice">{item.price}</p>
                        <p className="discount">{item.discount}OFF</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {temp.length === 0 && (
          <div className="main-parent-card">
            <h4 className="header-cart">NO ITEMS IN CART YET</h4>
          </div>
        )}

        <div className="bag-details-container">
          <div className="price-header">PRICE DETAILS ( Items) </div>
          <div className="price-item">
            <span className="price-item-tag">Total MRP</span>
            <span className="price-item-value">₹{totalMRP}</span>
          </div>
          <div className="price-item">
            <span className="price-item-tag">Discount on MRP</span>
            <span className="price-item-value priceDetail-base-discount">
              -₹{totalDiscount}
            </span>
          </div>
          <div className="price-item">
            <span className="price-item-tag">Convenience Fee</span>
            <span className="price-item-value">₹{convenienceFee}</span>
          </div>

          <div className="price-footer">
            <span className="price-item-tag">Total Amount</span>
            <span className="price-item-value">₹{totalAmount}</span>
          </div>
          <button className="btn-place-order mt-4" onClick={handlePlaceOrder}>
            <div className="css-xjhrni">PLACE ORDER</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
