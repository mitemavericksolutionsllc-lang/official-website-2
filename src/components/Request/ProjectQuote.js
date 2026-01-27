import React, { useState, useEffect, useRef } from "react";
import "./ProjectQuote.css";
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en/request.json";
import ar from "../../locales/ar/request.json";

import emailjs from "@emailjs/browser";

const ProjectQuote = () => {
  const { language } = useLanguage();
  const t = language === "ar" ? ar : en;
  const [activeField, setActiveField] = useState(null);
  const [formData, setFormData] = useState({
    sector: "",
    platform: "",
    visualIdentity: "",
    deliveryTime: "",
    techType: "",
    customTech: "",
    budget: "",
    contact: "",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setOpenDropdown(null); // Automatically closes/rotates arrow back down after selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the section and a dropdown is open, close it
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setActiveField(null); // Also reset the active border
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openDropdown]); // Add openDropdown as a dependency

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate all required fields are filled
    const requiredFields = [
      "sector",
      "platform",
      "visualIdentity",
      "deliveryTime",
      "techType",
      "budget",
      "contact",
    ];
    const isFormValid = requiredFields.every(
      (field) => formData[field].trim() !== "",
    );

    if (isFormValid) {
      setShowModal(true);
    }
  };

  // 1. Add this import at the top

  // Add this inside the ProjectQuote component, near your other useEffects
useEffect(() => {
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
}, []);

const handleConfirmSubmit = async () => {
  setLoading(true);

  // Reference your .env variables
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Debugging check: If these logs show 'undefined', your .env file is not being read.
  console.log("Service ID:", serviceId); 
  console.log("Template ID:", templateId);

  try {
    // Send the form data to EmailJS
    await emailjs.send(
      serviceId,
      templateId,
      {
        sector: formData.sector === "Other" ? formData.customSector : formData.sector,
        platform: formData.platform,
        visualIdentity: formData.visualIdentity,
        deliveryTime: formData.deliveryTime,
        techType: formData.techType === "Specified" ? formData.customTech : formData.techType,
        budget: formData.budget,
        contact: formData.contact,
        // Optional: you can add a display name for the email body
        from_name: formData.contact, 
      },
      publicKey // Passing it here as a backup to the init() call
    );

    setIsSubmitted(true);
    setShowModal(false);
  } catch (error) {
    console.error("FAILED...", error);
    alert(
      language === "ar"
        ? "فشل إرسال الطلب. يرجى المحاولة مرة أخرى."
        : "Failed to send request. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

if (isSubmitted) {
    return (
      <div className="submission-success-overlay">
        <div className="submission-success-card">
          <div className="success-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2>{language === "ar" ? "شكراً لك!" : "Thank You!"}</h2>
          <p>
            {language === "ar"
              ? "لقد تم استلام طلبك بنجاح. سيتواصل معك فريقنا قريباً."
              : "Your request has been received successfully. Our team will contact you shortly."}
          </p>
          <button onClick={() => setIsSubmitted(false)} className="success-back-btn">
            {language === "ar" ? "إرسال طلب جديد" : "Submit New Request"}
          </button>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    setShowModal(false);
  };

  const getDisplayValue = (field, value) => {
    if (!value) return "-";

    // Handle Custom Inputs for Sector and Tech
    if (field === "sector" && value === "Other")
      return formData.customSector || t.placeholders.sector;
    if (field === "techType" && value === "Specified")
      return formData.customTech || t.placeholders.tech;

    // Map state values to the translated strings in your JSON
    const translations = {
      "E-commerce": t.options.E_commerce,
      "Real Estate": t.options.RealEstate,
      Education: t.options.Education,
      Service: t.options.Service,
      Economic: t.options.Economic,
      Financial: t.options.Financial,
      Industrial: t.options.Industrial,
      Medical: t.options.Medical,
      Legal: t.options.Legal,
      Other: t.options.Other,
      "Web Application": t.options.WebApplication,
      "Desktop Application": t.options.DesktopApplication,
      "Mobile App": t.options.MobileApplication,
      All: t.options.All,
      Yes: t.options.identityYes,
      No: t.options.identityNo,
      "1 Month": t.options.One1Month,
      "2-3 Months": t.options.MultiMonthes,
      Flexible: t.options.Flexible,
      Unspecified: t.options.unspecified,
      Specified: t.options.specified,
    };

    return translations[value] || value;
  };

  return (
    <section
      className={`quote-section ${language === "ar" ? "rtl" : ""}`}
      id="YourRequest"
      ref={sectionRef}
    >
      <div className="quote-container">
        <header className="quote-header">
          <h1 className="orbit-main-title">
            {t.title} <span>{t.titleSpan}</span>
          </h1>
          <p>{t.subtitle}</p>
        </header>

        <form className="quote-form" onSubmit={handleFormSubmit}>
          <div className="form-grid">
            {/* Field 1: Sector */}
            <div className="input-group">
              <label htmlFor="sector">{t.labels.sector}</label>
              <div
                className={`select-wrapper 
    ${activeField === "sector" || formData.sector !== "" ? "field-active" : ""} 
    ${openDropdown === "sector" ? "is-open" : ""} `}
                onClick={() => handleDropdownToggle("sector")}
              >
                {/* Existing Bottom-Left Corners */}
                <div className="bottom-left-horizontal"></div>
                <div className="bottom-left-vertical"></div>
                {/* NEW: Top-Right Corners */}
                <div className="top-right-horizontal"></div>
                <div className="top-right-vertical"></div>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  onFocus={() => setActiveField("sector")}
                  onBlur={() => {
                    setActiveField(null);
                    setOpenDropdown(null);
                  }}
                  required
                >
                  <option value="" disabled hidden>
                    {t.placeholders.select}
                  </option>
                  <option value="E-commerce">{t.options.E_commerce}</option>
                  <option value="Real Estate">{t.options.RealEstate}</option>
                  <option value="Education">{t.options.Education}</option>
                  <option value="Service">{t.options.Service}</option>
                  <option value="Economic">{t.options.Economic}</option>
                  <option value="Financial">{t.options.Financial}</option>
                  <option value="Industrial">{t.options.Industrial}</option>
                  <option value="Medical">{t.options.Medical}</option>
                  <option value="Legal">{t.options.Legal}</option>
                  <option value="Other">{t.options.Other}</option>
                </select>
              </div>
              {formData.sector === "Other" && (
                <input
                  type="text"
                  id="customSector"
                  name="customSector"
                  className="custom-tech-field"
                  placeholder={t.placeholders.sector}
                  value={formData.customSector}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            {/* Field 2: Platform */}
            <div className="input-group">
              <label htmlFor="platform">{t.labels.platform}</label>
              <div
                className={`select-wrapper 
    ${
      activeField === "platform" || formData.platform !== ""
        ? "field-active"
        : ""
    } 
    ${openDropdown === "platform" ? "is-open" : ""} `}
                onClick={() => handleDropdownToggle("platform")}
              >
                {/* Existing Bottom-Left Corners */}
                <div className="bottom-left-horizontal"></div>
                <div className="bottom-left-vertical"></div>
                {/* NEW: Top-Right Corners */}
                <div className="top-right-horizontal"></div>
                <div className="top-right-vertical"></div>

                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  WebApplication
                  onFocus={() => setActiveField("platform")}
                  onBlur={() => {
                    setActiveField(null);
                    setOpenDropdown(null);
                  }}
                  required
                >
                  <option value="" disabled hidden>
                    {t.placeholders.select}
                  </option>
                  <option value="Web Application">
                    {t.options.WebApplication}
                  </option>
                  <option value="Desktop Application">
                    {t.options.DesktopApplication}
                  </option>
                  <option value="Mobile App">
                    {t.options.MobileApplication}
                  </option>
                  <option value="All">{t.options.All}</option>
                </select>
              </div>
            </div>

            {/* Field 3: Visual Identity */}
            <div className="input-group">
              <label htmlFor="visualIdentity">{t.labels.identity}</label>
              <div
                className={`select-wrapper 
    ${
      activeField === "visualIdentity" || formData.visualIdentity !== ""
        ? "field-active"
        : ""
    } 
    ${openDropdown === "visualIdentity" ? "is-open" : ""} `}
                onClick={() => handleDropdownToggle("visualIdentity")}
              >
                {/* Existing Bottom-Left Corners */}
                <div className="bottom-left-horizontal"></div>
                <div className="bottom-left-vertical"></div>
                {/* NEW: Top-Right Corners */}
                <div className="top-right-horizontal"></div>
                <div className="top-right-vertical"></div>
                <select
                  id="visualIdentity"
                  name="visualIdentity"
                  value={formData.visualIdentity}
                  onChange={handleChange}
                  onFocus={() => setActiveField("visualIdentity")}
                  onBlur={() => {
                    setActiveField(null);
                    setOpenDropdown(null);
                  }}
                  required
                >
                  <option value="" disabled hidden>
                    {t.placeholders.select}
                  </option>
                  <option value="Yes">{t.options.identityYes}</option>
                  <option value="No">{t.options.identityNo}</option>
                </select>
              </div>
            </div>

            {/* Field 4: Delivery */}
            <div className="input-group">
              <label htmlFor="deliveryTime">{t.labels.delivery}</label>
              <div
                className={`select-wrapper 
    ${
      activeField === "deliveryTime" || formData.deliveryTime !== ""
        ? "field-active"
        : ""
    } 
    ${openDropdown === "deliveryTime" ? "is-open" : ""} `}
                onClick={() => handleDropdownToggle("deliveryTime")}
              >
                {/* Existing Bottom-Left Corners */}
                <div className="bottom-left-horizontal"></div>
                <div className="bottom-left-vertical"></div>
                {/* NEW: Top-Right Corners */}
                <div className="top-right-horizontal"></div>
                <div className="top-right-vertical"></div>
                <select
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  onFocus={() => setActiveField("deliveryTime")}
                  onBlur={() => {
                    setActiveField(null);
                    setOpenDropdown(null);
                  }}
                  required
                >
                  <option value="" disabled hidden>
                    {t.placeholders.select}
                  </option>
                  <option value="1 Month">{t.options.One1Month}</option>
                  <option value="2-3 Months">{t.options.MultiMonthes}</option>
                  <option value="Flexible">{t.options.Flexible}</option>
                </select>
              </div>
            </div>

            {/* Field 5: Tech */}
            <div className="input-group">
              <label htmlFor="techType">{t.labels.tech}</label>
              <div
                className={`select-wrapper 
    ${
      activeField === "techType" || formData.techType !== ""
        ? "field-active"
        : ""
    } 
    ${openDropdown === "techType" ? "is-open" : ""} `}
                onClick={() => handleDropdownToggle("techType")}
              >
                {/* Existing Bottom-Left Corners */}
                <div className="bottom-left-horizontal"></div>
                <div className="bottom-left-vertical"></div>
                {/* NEW: Top-Right Corners */}
                <div className="top-right-horizontal"></div>
                <div className="top-right-vertical"></div>
                <select
                  id="techType"
                  name="techType"
                  value={formData.techType}
                  onChange={handleChange}
                  onFocus={() => setActiveField("techType")}
                  onBlur={() => {
                    setActiveField(null);
                    setOpenDropdown(null);
                  }}
                  required
                >
                  <option value="" disabled hidden>
                    {t.placeholders.select}
                  </option>
                  <option value="Unspecified">{t.options.unspecified}</option>
                  <option value="Specified">{t.options.specified}</option>
                </select>
              </div>
              {formData.techType === "Specified" && (
                <input
                  type="text"
                  id="customTech"
                  name="customTech"
                  className="custom-tech-field"
                  placeholder={t.placeholders.tech}
                  value={formData.customTech}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            {/* Field 6: Budget */}
            <div className="input-group">
              <label htmlFor="budget">{t.labels.budget}</label>
              <div
                className={`select-wrapper 
    ${activeField === "budget" || formData.budget !== "" ? "field-active" : ""} 
    ${openDropdown === "budget" ? "is-open" : ""} `}
                onClick={() => handleDropdownToggle("budget")}
              >
                {/* Existing Bottom-Left Corners */}
                <div className="bottom-left-horizontal"></div>
                <div className="bottom-left-vertical"></div>
                {/* NEW: Top-Right Corners */}
                <div className="top-right-horizontal"></div>
                <div className="top-right-vertical"></div>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  onFocus={() => setActiveField("budget")}
                  onBlur={() => {
                    setActiveField(null);
                    setOpenDropdown(null);
                  }}
                  required
                >
                  <option value="" disabled hidden>
                    {t.placeholders.select}
                  </option>
                  <option value="$1k-$2,500k">$1,000 - $2,500</option>
                  <option value="$2,500k-$4k">$2,500 - $4k</option>
                  <option value="$4k-$6k">$4k - $6k</option>
                  <option value="$6k-$9k">$6k - $9k</option>
                  <option value="$9k +">$9k +</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <div className="input-group">
              <label htmlFor="contact">{t.labels.contact}</label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="contact-field"
                placeholder={t.placeholders.contact}
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              {t.button}
            </button>
          </div>
        </form>

        {isSubmitted && <div className="success-toast">✓ {t.success}</div>}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div
            className="confirmation-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>
                {t.title} <span>{t.titleSpan}</span>
              </h2>
            </div>

            <div className="modal-body">
              <div className="details-grid">
                {/* Sector */}
                <div className="detail-item">
                  <span className="detail-label">{t.labels.sector}:</span>
                  <span className="detail-value">
                    {getDisplayValue("sector", formData.sector)}
                  </span>
                </div>

                {/* Platform */}
                <div className="detail-item">
                  <span className="detail-label">{t.labels.platform}:</span>
                  <span className="detail-value">
                    {getDisplayValue("platform", formData.platform)}
                  </span>
                </div>

                {/* Visual Identity */}
                <div className="detail-item">
                  <span className="detail-label">{t.labels.identity}:</span>
                  <span className="detail-value">
                    {getDisplayValue("visualIdentity", formData.visualIdentity)}
                  </span>
                </div>

                {/* Delivery Time */}
                <div className="detail-item">
                  <span className="detail-label">{t.labels.delivery}:</span>
                  <span className="detail-value">
                    {getDisplayValue("deliveryTime", formData.deliveryTime)}
                  </span>
                </div>

                {/* Tech Type */}
                <div className="detail-item">
                  <span className="detail-label">{t.labels.tech}:</span>
                  <span className="detail-value">
                    {getDisplayValue("techType", formData.techType)}
                  </span>
                </div>

                {/* Budget */}
                <div className="detail-item">
                  <span className="detail-label">{t.labels.budget}:</span>
                  <span className="detail-value">{formData.budget}</span>
                </div>

                {/* Contact Info */}
                <div className="detail-item">
                  <span className="detail-label">{t.labels.contact}:</span>
                  <span className="detail-value">{formData.contact}</span>
                </div>
              </div>

              <p
                style={{
                  color: "#888",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {language === "ar"
                  ? "يرجى مراجعة تفاصيل طلبك قبل الإرسال"
                  : "Please review your request details before submitting"}
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-btn cancel-btn"
                onClick={handleCancel}
                disabled={loading}
              >
                {language === "ar" ? "تعديل" : "Edit"}
              </button>
              <button
                type="button"
                className="modal-btn confirm-btn"
                onClick={handleConfirmSubmit}
                disabled={loading}
              >
                {loading
                  ? language === "ar"
                    ? "جاري الإرسال..."
                    : "Submitting..."
                  : language === "ar"
                    ? "تأكيد وإرسال"
                    : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectQuote;
