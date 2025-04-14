// import { SignIn } from "../store/SignUp-store";
import { use, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemAction } from "../store/counter";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { quantityAction } from "../store/quantitycounter";
const ShoppingCart = () => {
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

  const totalMRP = temp.reduce((sum, item) => {
    return sum + parseInt(item.price.replace("₹", "")) * item.quantity;
  }, 0);

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
      <div className="main-parent">
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
          <button className="btn-place-order mt-4">
            <div className="css-xjhrni" onClick={()=>{
              alert("Working on it soon")
            }}>PLACE ORDER</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
