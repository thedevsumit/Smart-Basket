import { CgOptions } from "react-icons/cg";

const HowToUse = () => {
  return (
    <div className="htu-main">
      <h1 className="htu-heading">How to use SmartBasket</h1>
      <div className="htu-maindiv">

        <div className="htu-li firsthtuli">
          <h2>Open SmartBasket</h2>
          <p>
            Visit the SmartBasket web app on your device. Make sure your camera
            permissions are enabled for scanning.
          </p>
          <p className="htu-para">
            To enable permission for camera click on <CgOptions /> then click
            on <b>site settings</b> and then enable camera settings.
          </p>
        </div>

        <div className="htu-li">
          <h2>SignIn or SignUp</h2>
          <p>SignIn to SmartBasket if you already have account on it.</p>
          <hr />
          <p>If <b>NOT</b>, then create an account on SmartBasket</p>
        </div>

        <div className="htu-li">
          <h2>Scan a Product</h2>
          <ul>
            <li>Click the <b>START BUYING</b> button then "Open Camera & Scan Barcode" button.</li>
            <li>Point your camera at the barcode of the product.</li>
            <li>The scanner will automatically detect the product and retrieve its details from the database.</li>
          </ul>
        </div>

        <div className="htu-li">
          <h2>View Product Details</h2>
          <ul>
            <li>Increase or decrease the quantity of items using the <b>"+"</b> or <b>"-"</b> buttons.</li>
            <li>Remove an item by clicking the <b>"X"</b> button.</li>
            <li>Your total amount and discounts will update automatically.</li>
          </ul>
        </div>

        <div className="htu-li">
          <h2>Checkout & Place Order</h2>
          <ul>
            <li>Review your cart in the <b>"Price Details"</b> section.</li>
            <li>Click the <b>"PLACE ORDER"</b> button to proceed with checkout.</li>
            <li>Follow the payment instructions to complete your purchase.</li>
          </ul>
        </div>

        <div className="htu-li">
          <h2>For better Experience</h2>
          <ul>
            <li>Ensure your <b>device camera is clean</b> and has good lighting.</li>
            <li>If a product is not recognized, <b>try scanning again</b> or entering details manually.</li>
            <li>Use the cart feature to track total spending and discounts.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default HowToUse;
