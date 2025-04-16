import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import Spinner from "./Spinner";
const Terms = ({ sidebar, setSidebar }) => {
  const [message, setMessage] = useState("");
  const [spinner, setSpinner] = useState(0);

  const handleEmail = () => {
    const userEmail = localStorage.getItem("currLoggedInUser");

    if (!userEmail) {
      Swal.fire("Not Logged In", "Please log in to contact support.", "error");
      return;
    }

    if (message.trim().length === 0) {
      Swal.fire(
        "Empty Message",
        "Please type your message before sending.",
        "warning"
      );
      return;
    }

    const templateParams = {
      user_email: userEmail,
      message: message,
    };
    setSpinner(1);
    emailjs
      .send(
        "service_2bir0fc",
        "template_fzhwgjl",
        templateParams,
        "SvdB5ZoOGJGZYa3Qb"
      )
      .then(() => {
        setSpinner(0);
        Swal.fire("Message Sent", "Thanks for contacting us! 🎉", "success");
        setMessage("");
      })
      .catch((error) => {
        setSpinner(0);
        Swal.fire(
          "Error",
          "Couldn't send your message. Please try again later.",
          "error"
        );
      });
  };

  return (
    <div onClick={() => sidebar === 1 && setSidebar(0)}>
      <div>
        <ul className="listabu">
          <h1 className="headerof">Terms and Conditions</h1>
          <li>
            <strong>Acceptance of Terms:</strong> By using SmartBasket, you
            agree to our terms, policies, and practices. Continued usage implies
            consent and agreement.
          </li>
          <li>
            <strong>Account Responsibility:</strong> You are responsible for
            maintaining the confidentiality of your credentials and all
            activities under your account.
          </li>
          <li>
            <strong>Usage Guidelines:</strong> You may not use SmartBasket for
            unlawful activities or abuse the system in ways that disrupt service
            for other users.
          </li>
          <li>
            <strong>Data Privacy:</strong> We store your data securely and only
            use it to enhance your experience. Refer to our Privacy Policy for
            more details.
          </li>
          <li>
            <strong>Service Availability:</strong> We do our best to keep
            SmartBasket running, but we’re not liable for downtime due to
            maintenance or technical issues.
          </li>
          <li>
            <strong>Intellectual Property:</strong> All content, branding,
            features, and designs are protected by copyright and trademark laws.
          </li>
          <li>
            <strong>Modifications:</strong> We reserve the right to update or
            modify these terms at any time. Continued use means acceptance of
            the latest version.
          </li>
          <li>
            <strong>Termination:</strong> We may suspend or terminate access to
            SmartBasket for violations or malicious behavior.
          </li>
        </ul>
      </div>

      <div className="newletterLogin">
        <div className="mainNewsSync">
          <div className="imgNews">
            <img src="CenterImg1.jpg" alt="" id="imgNewsSync" />
          </div>
          <div className="newsLogin">
            <h1 id="headingNews">Need help with Terms?</h1>
            <p id="paraNews">Send us your question or message below:</p>
            <div className="loginMainDiv">
              {spinner === 1 && <Spinner />}
              <textarea
                id="inputNews"
                placeholder="Type your message."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
              <button id="newsButton" onClick={handleEmail}>
                Send
              </button>
            </div>
            <p id="headinFooter">
              By using SmartBasket, you agree to our
              <a href="#" id="anchorNews">
                {" "}
                Terms of Service{" "}
              </a>
              and
              <a href="#" id="anchorNews">
                {" "}
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
        <p className="footerabu">
          Built with ❤️ by passionate developers who believe in a smarter retail
          future.
        </p>
      </div>
    </div>
  );
};

export default Terms;
