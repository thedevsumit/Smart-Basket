const Footer = ({sidebar,setSidebar,handleAboutClick,handleTermsClick,handleContactClick}) => {
  return (
    <>
      <footer className="py-3 my-4"  onClick={() => {
            if (sidebar === 1) {
              setSidebar(0);
            }
          }}>
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-body-secondary" onClick={handleAboutClick}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-body-secondary" onClick={handleTermsClick}>
              Terms
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-body-secondary" onClick={handleContactClick}>
              Contact
            </a>
          </li>
        </ul>
        <p className="text-center text-body-secondary">
          © 2025 SmartBasket, Team
        </p>
      </footer>
    </>
  );
};
export default Footer;
