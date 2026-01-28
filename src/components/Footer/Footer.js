import React, { useState } from "react"; // Added useState
import "./Footer.css";
import logo from "../../assets/images/Asset 7@4x.png";
import instaIcon from "../../assets/images/footer/instagram.png";
import linkedinIcon from "../../assets/images/footer/linkedin.png";
import whatsappIcon from "../../assets/images/footer/whatsapp.png";
import facebookIcon from "../../assets/images/footer/facebook.png";
import TelegramIcon from "../../assets/images/footer/Telegram.png";

import SyrianFlag from "../../assets/images/footer/syrian_flag.png";

const MiteFooter = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeContact, setActiveContact] = useState({
    name: "",
    number: "",
    flag: "",
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'WhatsApp' or 'Telegram' or null

  const contactDetails = {
    whatsapp: {
      name: "WhatsApp",
      number: "+963 988 077 039",
      flag: SyrianFlag,
    },
    telegram: {
      name: "Telegram",
      number: "+963 988 077 039",
      flag: SyrianFlag,
    },
  };

  const openPopup = (e, type) => {
    e.preventDefault();
    setActiveContact(contactDetails[type]);
    setShowPopup(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeContact.number);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <footer className="mm-footer" dir="ltr">
      <div className="mm-container">
        <div className="mm-top-section">
          <div className="mm-logo-container">
            <img src={logo} alt="Mite Maverick" className="mm-logo-img" />
          </div>

          <div className="mm-social-wrapper">
            <a
              href="https://www.instagram.com/mitemaverick.sy?igsh=dDZ3cm12OHVscTJ3"
              className="mm-social-icon"
            >
              <img
                src={instaIcon}
                alt="Instagram"
                className="Instagram-image"
              />
            </a>
            {/* <a href="#" className="mm-social-icon"><img src={linkedinIcon} alt="LinkedIn" /></a> */}

            {/* Trigger Popup for WhatsApp */}
            <a
              href="#"
              className="mm-social-icon"
              onClick={(e) => openPopup(e, "whatsapp")}
            >
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="WhatsApp-image"
              />
            </a>

            <a
              href="https://www.facebook.com/share/17EGMcm3xy/"
              className="mm-social-icon"
            >
              <img
                src={facebookIcon}
                alt="Facebook"
                className="Facebook-image"
              />
            </a>

            {/* Trigger Popup for Telegram */}
            <a
              href="#"
              className="mm-social-icon"
              onClick={(e) => openPopup(e, "telegram")}
            >
              <img
                src={TelegramIcon}
                alt="Telegram"
                className="Telegram-image"
              />
            </a>
          </div>
        </div>

        <hr className="mm-divider" />

        <div className="mm-bottom-bar">
          <p className="mm-copyright">2025 Mite Maverick</p>
        </div>
      </div>

      {/* --- Simple Modal Window --- */}
      {showPopup && (
        <div className="mm-modal-overlay" onClick={() => setShowPopup(false)}>
          <div
            className="mm-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Contact via {activeContact.name}</h3>
            <div className="mm-contact-row">
              <div className="zenith-flag-container">
                <img
                  src={activeContact.flag}
                  alt="Country Flag"
                  className="zenith-modal-flag-img"
                />
              </div>
              <span className="mm-number">{activeContact.number}</span>
              <button
                className="mm-copy-btn"
                onClick={() => copyToClipboard(contactDetails.number)}
              >
                {" "}
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              className="mm-close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default MiteFooter;
