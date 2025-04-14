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
  const { currentvalue } = useSelector((store) => store.quantity);
  const HandleIncrement = () => {
    dispatch(quantityAction.increment());
  };
  const HandleDecrement = () => {
    dispatch(quantityAction.decrement());
  };
  const {newItem} = useSelector((store)=>store.items);
  // const temp = [
  //   {
  //     img: "https://m.media-amazon.com/images/I/61Gyg-yEcoL._SL1100_.jpg",
  //     title: "Ferrero Rocher Moments",
  //     price: "₹20",
  //     discount: "10%",
  //     newPrice: "₹18",
  //     description: "Ferrero Rocher Moments, 16 Pcs Chocolate,92.8 Grams",
  //   },
  // ];

  const temp = [newItem];
 
  return (
    <>
      <div className="main-parent">
        <div className="container mt-4 mainpage">
          <div className="main-parent-card">
            {newItem.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-white positioning-div ">
                    <RxCross2
                      className="icon-card"
                      style={{ color: "black" }}
                      size={18}
                      onClick={() => handleSubmit(item.title)}
                    />
                    <span className="visually-hidden">unread messages</span>
                  </span>

                  <img src={item.img} alt="" className="img-card" />
                  <div className="card-body">
                    <h5 className="card-title card-heading">{item.title}</h5>
                    <p className="card-description">{item.description}</p>
                    <div className="quantitydiv">
                      
                      Qty: {currentvalue}
                      <IoMdAdd
                        className="addquantity"
                        onClick={HandleIncrement}
                      />{" "}
                      <RiSubtractLine
                        className="decreasequan"
                        onClick={HandleDecrement}
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
            <span className="price-item-value">₹4003</span>
          </div>
          <div className="price-item">
            <span className="price-item-tag">Discount on MRP</span>
            <span className="price-item-value priceDetail-base-discount">
              -₹402
            </span>
          </div>
          <div className="price-item">
            <span className="price-item-tag">Convenience Fee</span>
            <span className="price-item-value">₹99</span>
          </div>

          <div className="price-footer">
            <span className="price-item-tag">Total Amount</span>
            <span className="price-item-value">₹3001 </span>
          </div>
          <button className="btn-place-order mt-4">
            <div className="css-xjhrni">PLACE ORDER</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
