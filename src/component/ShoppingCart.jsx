// import { SignIn } from "../store/SignUp-store";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemAction } from "../store/counter";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const handleSubmit = (val) => {
    alert("Item Removed from Cart");
    dispatch(itemAction.removing(val))
  }
  const { currentValue } = useSelector((store) => store.items);
  
  return (
    <div>
      <h2 className="text-center">Shopping Cart</h2>
      <div className="container mt-4">
        <div className="row">
          {currentValue.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item}</h5>
                  <p className="card-text">Item Description</p>
                  <button className="btn btn-primary" >Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ShoppingCart;
