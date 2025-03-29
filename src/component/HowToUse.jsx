import { CgOptions } from "react-icons/cg";
const HowToUse = () => {
  return (
    <>
      <div className="htu-main">
        <h1 className="htu-heading">How to use SmartBasket</h1>
        <div className="htu-maindiv">
          <div className="htu-li firsthtuli">
            <h2>Open SmartBasket</h2>
            <p>
              Vist the SmartBasket web app on your device. Make sure your camera
              permissions are enabled for scanning.
            </p>
            {/* <img src="smartbasketurl.png" alt="" /> */}
            <p className="htu-para">
              To enable permission for camera click on <CgOptions /> then click
              on <b>site settings</b> and then enable camera settings.
            </p>
          </div>
          <div className="htu-li">
            <h2>SignIn or SignUp</h2>
            <p>SignIn to SmartBasket if you already have account on it.</p>
            <img src="login.png" alt="" className="htu-img" />
            <hr />
            <p>If <b>Not</b> then create an account on SmartBasket</p>
            {/* <img src="signup.png" alt="" className="htu-img"/> */}
          </div>
          <div className="htu-li">
            <h2>Scan a Product</h2>
            <p>
              <ul>
                <li>Click the <b>START BUYING</b> button then "Open Camera & Scan Barcode" button.</li>
                <li>Point your camera at the barcode of the product.</li>
                <li>
                  The scanner will automatically detect the product and retrieve
                  its details from the database.
                </li>
              </ul>
            </p>
          </div>
          <div className="htu-li">
            <h2>View Product Details</h2>
            <p>
              <ul>
                <li>
                  Increase or decrease the quantity of items using the "+" or
                  "-" buttons.
                </li>
                <li>Remove an item by clicking the "X" button.</li>
                <li>
                  Your total amount and discounts will update automatically.
                </li>
                {/* <img src="place.png" alt="" /> */}
              </ul>
            </p>
          </div>
          <div className="htu-li">
            <h2>Checkout & Place Order</h2>
            <p>
              <ul>
                <li>Review your cart in the "Price Details" section.</li>
                <li>
                  Click the "PLACE ORDER" button to proceed with checkout.
                </li>
                <li>
                  Follow the payment instructions to complete your purchase.
                </li>
                {/* <img src="placeorder.png" alt="" className="htu-img" /> */}
              </ul>
            </p>
          </div>
          <div className="htu-li">
            <h2>For better Experience</h2>
            <p>
              <ul>
                <li>
                  ✅ Ensure your device camera is clean and has good lighting.
                </li>
                <li>
                  ✅ If a product is not recognized, try scanning again or
                  entering details manually.
                </li>
                <li>
                  ✅ Use the cart feature to track total spending and discounts.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default HowToUse;
